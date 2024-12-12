export interface MetricsResponse {
  success: boolean;
  cpu_usage: number;
  memory_usage: number;
  temperature: number;
  active_services: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

export interface MetricsTimeSeriesData {
  cpu: TimeSeriesDataPoint[];
  memory: TimeSeriesDataPoint[];
  pods: TimeSeriesDataPoint[];
}