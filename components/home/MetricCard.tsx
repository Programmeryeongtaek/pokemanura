import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string | number;
  label: string;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  color = '#007AFF',
}) => {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={24} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '46%',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
});
