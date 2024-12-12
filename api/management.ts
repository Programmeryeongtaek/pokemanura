import { ManagementResponse, ScaleDeploymentRequest, ScaleDeploymentResponse } from '../types/management';
import { api } from './config';

export const fetchDeployments = async (): Promise<ManagementResponse> => {
  try {
    const response = await api.get<ManagementResponse>('/deployments');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch deployments:', error);
    throw error;
  }
}

export const scaleDeployment = async (data: ScaleDeploymentRequest): Promise<ScaleDeploymentResponse> => {
  try {
    const response = await api.post<ScaleDeploymentResponse>('/deployments/scale', data);
    return response.data;
  } catch (error) {
    console.error('Failed to scale deployment:', error);
    throw error;
  }
}