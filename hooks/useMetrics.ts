import { useEffect, useState } from 'react'

export const useMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 60,
    temperature: 38,
    activeServices: 8
  })

  useEffect(() => {
    // API 호출 로직 추가
  }, [])
  
  return metrics;
}