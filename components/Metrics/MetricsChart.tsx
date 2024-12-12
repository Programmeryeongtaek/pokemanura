import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TimeSeriesDataPoint } from '../../types/metrics';
import { LineChart } from 'react-native-chart-kit';

interface MetricsChartProps {
  title: string;
  data: TimeSeriesDataPoint[];
  color?: string;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({
  title,
  data = [], // 기본값 설정
  color = 'rgba(0, 122, 255, 1)',
}) => {
  const screenWidth = Dimensions.get('window').width - 32;

  // 데이터가 없거나 유효하지 않은 경우 처리
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>데이터가 없습니다</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: data.map((d) => d?.timestamp || ''),
          datasets: [{ data: data.map((d) => d?.value || 0) }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => color.replace('1)', `${opacity})`),
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MetricsChart;
