import { AuthTokens, LoginRequest } from '../types/auth';
import { api } from './config';

export const loginApi = async (credentials: LoginRequest): Promise<AuthTokens> => {
  try {
    const response = await api.post<AuthTokens>('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }}