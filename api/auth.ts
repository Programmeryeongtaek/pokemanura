import { AuthTokens, LoginRequest } from '../types/auth';
import { api } from './config';

export const loginApi = async (credentials: LoginRequest): Promise<AuthTokens> => {
  try {
    // 실제 요청과 응답을 확인하기 위한 로그
    console.log('Login Request:', credentials);
    
    const response = await api.post<AuthTokens>('/login', {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret
    });
    
    console.log('Raw Response:', JSON.stringify(response, null, 2));

    // Mock 응답과 일치하는지 확인
    const mockResponse = {
      access_token: "example_token",
      refresh_token: "refresh_token",
      token_type: "Bearer"
    };

    // 실제 응답 대신 Mock 데이터 반환 (테스트용)
    return mockResponse;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};