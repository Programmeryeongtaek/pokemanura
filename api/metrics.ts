import { MetricsResponse } from '../types/api';
import { api } from './config';

export const fetchMetricsData = async (): Promise<MetricsResponse> => {
  try {
    const response = await api.get<MetricsResponse>('/metrics');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    throw error;
  }
};