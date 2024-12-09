import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

interface Metrics {
  cpu: number;
  memory: number;
  temperature: number;
  activeServices: number;
}

export const useMetrics = () => {
  const { isLoggedIn} = useAuth();
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 60,
    temperature: 38,
    activeServices: 8
  })

  useEffect(() => {
    if (isLoggedIn) {
      // TODO: 실제 API 호출 구현
      console.log('로그인 상태: API 호출 예정')
    } else {
      console.log('비로그인 상태: 테스트 데이터 사용')
    }
  }, [isLoggedIn])
  
  return metrics;
}