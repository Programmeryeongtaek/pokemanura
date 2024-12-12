export interface ServiceDeployment {
  name: string;
  namespace: string;
  status: 'running' | 'pending' | 'failed';
  replicas: {
    current: number;
    desired: number;
    available: number;
  };
  resources: {
    cpu: string;    // "100m"
    memory: string; // "256Mi"
  };
  lastUpdated: string;
  version: string;
}

export interface ManagementResponse {
  success: boolean;
  data: {
    deployments: ServiceDeployment[];
    total_deployments: number;
    running_count: number;
    pending_count: number;
    failed_count: number;
  }
}

export interface ScaleDeploymentRequest {
  namespace: string;
  deployment: string;
  replicas: number;
}

export interface ScaleDeploymentResponse {
  success: boolean;
  message: string;
}