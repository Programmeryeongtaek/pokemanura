import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMetricsData } from '../../../hooks/useMetricsData';
import { MetricsChart } from '../../../components/Metrics/MetricsChart';

const MetricsScreen = () => {
  const { metricsData, error } = useMetricsData();

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <MetricsChart
        title="CPU Usage (%)"
        data={metricsData.cpu}
        color="rgba(0, 122, 255, 1)"
      />
      <MetricsChart
        title="Memory Usage (%)"
        data={metricsData.memory}
        color="rgba(75, 192, 192, 1)"
      />
      <MetricsChart
        title="Active Pods"
        data={metricsData.pods}
        color="rgba(255, 159, 64, 1)"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MetricsScreen;
