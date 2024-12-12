import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ManagementResponse, ServiceDeployment } from '../types/management';
import { fetchDeployments } from '../api/management';

export const useDeployments = () => {
  const { isLoggedIn } = useAuth();
  const [deploymentData, setDeploymentData] = useState<ManagementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateDummyData = (): ManagementResponse => {
    const deployments: ServiceDeployment[] = [
      {
        name: 'frontend-service',
        namespace: 'default',
        status: 'running',
        replicas: {
          current: 3,
          desired: 3,
          available: 3
        },
        resources: {
          cpu: '100m',
          memory: '256Mi'
        },
        lastUpdated: new Date().toISOString(),
        version: 'v1.0.0'
      },
      {
        name: 'backend-service',
        namespace: 'default',
        status: 'pending',
        replicas: {
          current: 2,
          desired: 3,
          available: 2
        },
        resources: {
          cpu: '200m',
          memory: '512Mi'
        },
        lastUpdated: new Date().toISOString(),
        version: 'v1.1.0'
      }
    ];

    return {
      success: true,
      data: {
        deployments,
        total_deployments: deployments.length,
        running_count: deployments.filter(d => d.status === 'running').length,
        pending_count: deployments.filter(d => d.status === 'pending').length,
        failed_count: deployments.filter(d => d.status === 'failed').length
      }
    };
  };

  useEffect(() => {
    const getDeployments = async () => {
      try {
        setLoading(true);
        if (isLoggedIn) {
          const data = await fetchDeployments();
          setDeploymentData(data);
        } else {
          const dummyData = generateDummyData();
          setDeploymentData(dummyData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    getDeployments();
    const interval = setInterval(getDeployments, isLoggedIn ? 5000 : 2000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return { deploymentData, loading, error };
};