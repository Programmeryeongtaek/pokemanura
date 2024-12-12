import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { useDeployments } from '../../../hooks/useDeployments';
import { useState } from 'react';
import { ServiceDeployment } from '../../../types/management';
import { LineChart } from 'react-native-chart-kit';
import { DeploymentCard } from '../../../components/Management/DeploymentCard';

const ManagementScreen = () => {
  const { isLoggedIn } = useAuth();
  const { deploymentData, loading, error } = useDeployments();
  const [selectedDeployment, setSelectedDeployment] =
    useState<ServiceDeployment | null>(null);

  const handleScale = (deployment: ServiceDeployment) => {
    if (!isLoggedIn) {
      Alert.alert('알림', '로그인이 필요한 기능입니다.');
      return;
    }
    setSelectedDeployment(deployment);
    // Scale 기능 구현
    Alert.alert(
      'Scale Deployment',
      `${deployment.name}의 replica 수를 조정하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            // Scale API 호출
          },
        },
      ]
    );
  };

  if (loading && !deploymentData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.refreshIndicator}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.refreshText}>새로고침 중...</Text>
        </View>
      )}

      {!isLoggedIn && (
        <View style={styles.demoChart}>
          <Text style={styles.chartTitle}>Deployment Metrics</Text>
          <LineChart
            data={{
              labels: ['1m', '2m', '3m', '4m', '5m', '6m'],
              datasets: [
                {
                  data: [
                    Math.random() * 5,
                    Math.random() * 5,
                    Math.random() * 5,
                    Math.random() * 5,
                    Math.random() * 5,
                    Math.random() * 5,
                  ],
                },
              ],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {deploymentData?.data.running_count || 0}
          </Text>
          <Text style={styles.summaryLabel}>Running</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {deploymentData?.data.pending_count || 0}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {deploymentData?.data.failed_count || 0}
          </Text>
          <Text style={styles.summaryLabel}>Failed</Text>
        </View>
      </View>

      {deploymentData?.data.deployments.map((deployment, index) => (
        <DeploymentCard
          key={`${deployment.namespace}-${deployment.name}`}
          deployment={deployment}
          onScale={handleScale}
          disabled={!isLoggedIn}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
  },
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginBottom: 16,
  },
  refreshText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  demoChart: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ManagementScreen;
