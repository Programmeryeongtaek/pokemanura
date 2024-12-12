import { useEffect, useState } from 'react'
import { fetchMetricsData } from '../api/metrics';
import { useAuth } from '../contexts/AuthContext';
import { MetricsResponse } from '../types/api';

export const useMetricsData = () => {
  const { isLoggedIn } = useAuth();
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!isLoggedIn) return;

      try {
        setLoading(true);
        const data = await fetchMetricsData();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    getData();
    const interval = setInterval(getData, 5000); // 5초마다 갱신
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return { metrics, loading, error };
};