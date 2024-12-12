import { useEffect, useState } from 'react';
import { useAuth } from './useAuth'
import { ServiceStatus, StatusResponse } from '../types/status';
import { fetchStatusData } from '../api/status';

export const useStatus = () => {
  const { isLoggedIn } = useAuth();
  const [statusData, setStatusData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateDummyServices = (): ServiceStatus[] => {
    return Array.from({ length: 5 }, (_, index) => ({
      name: `service-${index + 1}`,
      namespace: 'default',
      status: ['healthy', 'warning', 'error'][Math.floor(Math.random() * 3)] as 'healthy' | 'warning' | 'error',
      uptime: '23h 45m',
      replicas: {
        current: Math.floor(Math.random() * 5) + 1,
        desired: 5
      },
      cpu_usage: Math.random() * 100,
      memory_usage: Math.random() * 100
    }))
  }

  const generateDummyData = (): StatusResponse => {
    const services = generateDummyServices();
    return {
      success: true,
      data: {
        services,
        total_services: services.length,
        healthy_count: services.filter(s => s.status === 'healthy').length,
        warning_count: services.filter(s => s.status === 'warning').length,
        error_count: services.filter(s => s.status === 'error').length
      }
    };
  };

  useEffect(() => {
    const getData =  async () => {
      try {
        setLoading(true);
        if (isLoggedIn) {
          const data = await fetchStatusData();
          setStatusData(data);
        } else {
          const dummyData = generateDummyData();
          setStatusData(dummyData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    }

    getData();
    const interval = setInterval(getData, isLoggedIn ? 5000 : 2000);
    return () => clearInterval(interval);
  }, [isLoggedIn])

  return { statusData, loading, error };
}