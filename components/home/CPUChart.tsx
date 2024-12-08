import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface CPUChartProps {
  data: {
    labels: string[];
    datasets: { data: number[] }[];
  };
}

const screenWidth = Dimensions.get('window').width;

export const CPUChart: React.FC<CPUChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPU Usage</Text>
      <View style={styles.chartWrapper}>
        <LineChart
          data={data}
          width={screenWidth - 64}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          }}
          style={styles.chart}
          bezier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 16,
  },
  chartWrapper: {
    alignItems: 'flex-start',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
