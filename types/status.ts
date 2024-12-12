export interface ServiceStatus {
  name: string;
  namespace: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  replicas: {
    current: number;
    desired: number;
  }
  cpu_usage: number;
  memory_usage: number;
}

export interface StatusResponse {
  success: boolean;
  data: {
    services: ServiceStatus[];
    total_services: number;
    healthy_count: number;
    warning_count: number;
    error_count: number;
  }
}