import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useMetrics } from '../../../hooks/useMetrics';
import { MetricCard } from '../../../components/home/MetricCard';
import { CPUChart } from '../../../components/home/CPUChart';
import { ServiceItem } from '../../../components/home/ServiceItem';

const HomeScreen: FC = () => {
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

  const handleScaleService = (serviceId: number) => {
    console.log(`Scaling service with id: ${serviceId}`);
  };

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.sectionTitle}>서비스 상태</Text>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            name={service.name}
            status={service.status}
            pods={service.pods}
            onScale={() => handleScaleService(service.id)}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
