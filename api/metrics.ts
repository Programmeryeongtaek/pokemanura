import { MetricsTimeSeriesData } from '../types/metrics';
import { api } from './config';

export const fetchMetricsData = async (): Promise<MetricsTimeSeriesData> => {
  try {
    const response = await api.get('/metrics');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch metrics data:', error);
    throw error;
  }
};