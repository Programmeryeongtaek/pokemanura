import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.metricsGrid}>
        {/* 메트릭스 카드가 들어갈 자리 */}
      </View>
      <View style={styles.chartSection}>{/* 차트가 들어갈 자리 */}</View>
      <View style={styles.servicesSection}>
        {/* 서비스 상태가 들어갈 자리 */}
      </View>
    </ScrollView>
  );
}

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
});
