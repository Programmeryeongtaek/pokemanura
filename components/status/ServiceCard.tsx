import { StyleSheet, Text, View } from 'react-native';
import { ServiceStatus } from '../../types/status';

interface ServiceCardProps {
  service: ServiceStatus;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const statusColors = {
    healthy: '#4CAF50',
    warning: '#FFC107',
    error: '#FF5252',
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: statusColors[service.status] },
          ]}
        />
      </View>
      <Text style={styles.namespace}>Namespace: {service.namespace}</Text>
      <Text>Uptime: {service.uptime}</Text>
      <View style={styles.metrics}>
        <Text>CPU: {service.cpu_usage.toFixed(1)}%</Text>
        <Text>Memory: {service.memory_usage.toFixed(1)}%</Text>
      </View>
      <Text>
        Replicas: {service.replicas.current}/{service.replicas.desired}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  namespace: {
    color: '#666',
    marginBottom: 8,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
