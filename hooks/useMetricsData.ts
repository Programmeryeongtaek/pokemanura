import { useEffect, useState } from 'react'
import { fetchMetricsData } from '../api/metrics';
import { useAuth } from '../contexts/AuthContext';
import { MetricsResponse } from '../types/api';

export const useMetricsData = () => {
  const { isLoggedIn } = useAuth();
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 임시 데이터 생성 함수
  const generateDummyData = () => {
    const cpu = 30 + Math.random() * 40;
    const memory = 50 + Math.random() * 40;
    const services = Math.floor(8 + Math.random() * 7);
    const temp = 35 + Math.random() * 10;

    return {
      success: true,
      cpu_usage: Number(cpu.toFixed(1)),
      memory_usage: Number(memory.toFixed(1)),
      temperature: Number(temp.toFixed(1)),
      active_services: services
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (isLoggedIn) {
          // 로그인 상태: 실제 API 호출
          const data = await fetchMetricsData();
          setMetrics(data);
        } else {
          // 비로그인 상태: 임시 데이터 생성
          const dummyData = generateDummyData();
          setMetrics(dummyData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
        // 에러 발생 시에도 임시 데이터 표시
        const dummyData = generateDummyData();
        setMetrics(dummyData);
      } finally {
        setLoading(false);
      }
    };

    getData();
    const interval = setInterval(getData, isLoggedIn ? 5000 : 2000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return { metrics, loading, error };
};