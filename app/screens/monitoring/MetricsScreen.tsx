import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMetricsData } from '../../../hooks/useMetricsData';
import { MetricsChart } from '../../../components/Metrics/MetricsChart';

const MetricsScreen = () => {
  const { metrics, loading, error } = useMetricsData();

  if (loading && !metrics) {
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

  // 현재 시간을 기준으로 타임스탬프 생성
  const timestamp = new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.refreshIndicator}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.refreshText}>새로고침 중...</Text>
        </View>
      )}
      {metrics && (
        <>
          <MetricsChart
            title="CPU Usage (%)"
            data={[{ timestamp, value: metrics.cpu_usage }]}
            color="rgba(0, 122, 255, 1)"
          />
          <MetricsChart
            title="Memory Usage (%)"
            data={[{ timestamp, value: metrics.memory_usage }]}
            color="rgba(75, 192, 192, 1)"
          />
          <MetricsChart
            title="Active Services"
            data={[{ timestamp, value: metrics.active_services }]}
            color="rgba(255, 159, 64, 1)"
          />
        </>
      )}
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
});

export default MetricsScreen;
