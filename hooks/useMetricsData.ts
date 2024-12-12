import { useEffect, useState } from 'react'
import { MetricsTimeSeriesData, TimeSeriesDataPoint } from '../types/metrics'

export const useMetricsData = () => {
  const [metricsData, setMetricsData] = useState<MetricsTimeSeriesData>({
    cpu: [],
    memory: [],
    pods: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateDummyData = (): TimeSeriesDataPoint[] => 
      Array.from({length: 10}, (_, i) => ({
        timestamp: `${21}:${i.toString().padStart(2, '0')}`,
        value: Math.random() * 40
      }));

    const fetchData = async () => {
      try {
        setLoading(true);
        // 여기에 실제 API 호출 로직을 넣을 수 있다.
        const dummyData = {
          cpu: generateDummyData(),
          memory: generateDummyData().map(d => ({ ...d, value: 75 + Math.random() * 5 })),
          pods: generateDummyData().map(d => ({ ...d, value: 20 + Math.random() * 5 }))
        };
        setMetricsData(dummyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { metricsData, loading, error };
};