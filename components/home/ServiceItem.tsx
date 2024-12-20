import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ServiceItemProps {
  name: string;
  status: 'active' | 'warning';
  pods: number;
  onScale: () => void;
  disabled?: boolean;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  name,
  status,
  pods,
  onScale,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.serviceInfo}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: status === 'active' ? '#4CAF50' : '#FFC107' },
          ]}
        />
      </View>
      <View style={styles.podInfo}>
        <Text style={styles.podCount}>Pods: {pods}</Text>
        <TouchableOpacity
          style={[styles.scaleButton, disabled && styles.scaleButtonDisabled]}
          onPress={onScale}
          disabled={disabled}
        >
          <Text
            style={[
              styles.scaleButtonText,
              disabled && styles.scaleButtonTextDisabled,
            ]}
          >
            Scale
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  podInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  podCount: {
    marginRight: 12,
    color: '#666',
  },
  scaleButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  scaleButtonDisabled: {
    backgroundColor: '#ccc',
  },
  scaleButtonText: {
    color: 'white',
    fontSize: 14,
  },
  scaleButtonTextDisabled: {
    color: '#666',
  },
});
