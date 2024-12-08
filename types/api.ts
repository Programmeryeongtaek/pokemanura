// 로그인 요청 타입
export interface LoginRequest {
  client_id: string;
  client_secret: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

// 인증 토큰 타입
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

// 메트릭스 데이터 타입
export interface MetricsData {
  cpu_usage: number;
  memory_usage: number;
  temperature: number;
  active_services: number;
}

// 메트릭스 응답 타입
export interface MetricsResponse {
  success: boolean;
  cpu_usage: number;
  memory_usage: number;
  temperature: number;
  active_services: number;
}

// API 에러 타입
export interface ApiError {
  message: string;
  status: number;
}

// 인그레스 상태 타입
export interface IngressStatus {
  name: string;
  host: string;
  namespace: string;
  status: boolean;
}

// 배포 상태 타입
export interface DeploymentStatus {
  name: string;
  namespace: string;
  ready: string;
  ready_replicas: number;
  total_replicas: number;
}

// 배포 스케일 파라미터 타입
export interface ScaleDeploymentParams {
  namespace: string;
  deployment: string;
  replicas: number;
}

// 배포 스케일 응답 타입
export interface ScaleDeploymentResponse {
  success: boolean;
}