import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ServiceDeployment } from '../../types/management';

interface DeploymentCardProps {
  deployment: ServiceDeployment;
  onScale?: (deployment: ServiceDeployment) => void;
  disabled?: boolean;
}

export const DeploymentCard: React.FC<DeploymentCardProps> = ({
  deployment,
  onScale,
  disabled,
}) => {
  const statusColors = {
    running: '#4CAF50',
    pending: '#FFC107',
    failed: '#FF5252',
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{deployment.name}</Text>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: statusColors[deployment.status] },
          ]}
        />
      </View>

      <Text style={styles.namespace}>Namespace: {deployment.namespace}</Text>
      <Text style={styles.version}>Version: {deployment.version}</Text>

      <View style={styles.replicasContainer}>
        <Text>
          Replicas: {deployment.replicas.current}/{deployment.replicas.desired}
        </Text>
        <Text>(Available: {deployment.replicas.available})</Text>
      </View>

      <View style={styles.resourcesContainer}>
        <Text>CPU: {deployment.resources.cpu}</Text>
        <Text>Memory: {deployment.resources.memory}</Text>
      </View>

      <TouchableOpacity
        style={[styles.scaleButton, disabled && styles.disabledButton]}
        onPress={() => !disabled && onScale?.(deployment)}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          Scale
        </Text>
      </TouchableOpacity>
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
  name: {
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
    marginBottom: 4,
  },
  version: {
    color: '#666',
    marginBottom: 8,
  },
  replicasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resourcesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scaleButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledText: {
    color: '#666',
  },
});
