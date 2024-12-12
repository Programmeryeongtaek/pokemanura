import { StatusResponse } from '../types/status';
import { api } from './config';

export const fetchStatusData = async (): Promise<StatusResponse> => {
  try {
    const response = await api.get<StatusResponse>('/status');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch status:', error);
    throw error;
  }
}