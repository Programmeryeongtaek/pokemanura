import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useMetrics } from '../../../hooks/useMetrics';
import { MetricCard } from '../../../components/home/MetricCard';
import { CPUChart } from '../../../components/home/CPUChart';
import { ServiceItem } from '../../../components/home/ServiceItem';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isLoggedIn, logout } = useAuth();
  const metrics = useMetrics();

  // CPU 차트 데이터
  const chartData = {
    labels: ['1m', '2m', '3m', '4m', '5m', '6m'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  // 서비스 목록
  const services = [
    { id: 1, name: 'Frontend', status: 'active' as const, pods: 3 },
    { id: 2, name: 'Backend', status: 'active' as const, pods: 2 },
    { id: 3, name: 'Database', status: 'warning' as const, pods: 1 },
  ];

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        await logout();
        Alert.alert('알림', '로그아웃되었습니다.');
      } catch (error) {
        Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const handleScaleService = (serviceId: number) => {
    if (!isLoggedIn) {
      Alert.alert('알림', '이 기능은 로그인 후 사용할 수 있습니다.');
      return;
    }
    console.log(`Scaling service with id: ${serviceId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>시스템 모니터링</Text>
        <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
          <Text style={styles.authButtonText}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </Text>
        </TouchableOpacity>
      </View>

      {!isLoggedIn && (
        <View style={styles.testDataBanner}>
          <Text style={styles.testDataText}>
            * 현재 테스트 데이터를 나타내고 있습니다.
          </Text>
        </View>
      )}

      <View style={styles.metricsGrid}>
        <MetricCard
          icon="memory"
          value={`${metrics.cpu}%`}
          label="CPU 사용률"
        />
        <MetricCard
          icon="storage"
          value={`${metrics.memory}%`}
          label="메모리 사용률"
        />
        <MetricCard
          icon="device-thermostat"
          value={`${metrics.temperature}°C`}
          label="온도"
        />
        <MetricCard
          icon="dns"
          value={metrics.activeServices}
          label="활성 서비스"
        />
      </View>

      <View style={styles.chartSection}>
        <CPUChart data={chartData} />
      </View>

      <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>서비스 상태</Text>
          {!isLoggedIn && (
            <Text style={styles.testDataLabel}>테스트 데이터</Text>
          )}
        </View>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            name={service.name}
            status={service.status}
            pods={service.pods}
            onScale={() => handleScaleService(service.id)}
            disabled={!isLoggedIn}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  authButton: {
    padding: 8,
  },
  authButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  testDataBanner: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    marginBottom: 8,
  },
  testDataText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  chartSection: {
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  servicesSection: {
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  testDataLabel: {
    fontSize: 12,
    color: '#856404',
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default HomeScreen;
