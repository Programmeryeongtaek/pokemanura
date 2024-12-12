import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMetricsData } from '../../../hooks/useMetricsData';
import { MetricsChart } from '../../../components/Metrics/MetricsChart';
import { useEffect, useState } from 'react';
import { TimeSeriesDataPoint } from '../../../types/metrics';

const MAX_HISTORY_POINTS = 10; // 최대 데이터 포인트 수

const MetricsScreen = () => {
  const { metrics, loading, error } = useMetricsData();
  // 히스토리 데이터 상태 추가
  const [history, setHistory] = useState({
    cpu: [] as TimeSeriesDataPoint[],
    memory: [] as TimeSeriesDataPoint[],
    services: [] as TimeSeriesDataPoint[],
  });

  // metrics가 업데이트될 때마다 히스토리 데이터 추가
  useEffect(() => {
    if (metrics) {
      const timestamp = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      setHistory((prev) => ({
        cpu: [...prev.cpu, { timestamp, value: metrics.cpu_usage }].slice(
          -MAX_HISTORY_POINTS
        ),
        memory: [
          ...prev.memory,
          { timestamp, value: metrics.memory_usage },
        ].slice(-MAX_HISTORY_POINTS),
        services: [
          ...prev.services,
          { timestamp, value: metrics.active_services },
        ].slice(-MAX_HISTORY_POINTS),
      }));
    }
  }, [metrics]);

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
            data={history.cpu}
            color="rgba(0, 122, 255, 1)"
          />
          <MetricsChart
            title="Memory Usage (%)"
            data={history.memory}
            color="rgba(75, 192, 192, 1)"
          />
          <MetricsChart
            title="Active Services"
            data={history.services}
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
