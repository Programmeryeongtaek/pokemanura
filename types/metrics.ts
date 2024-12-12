export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

export interface MetricsTimeSeriesData {
  cpu: TimeSeriesDataPoint[];
  memory: TimeSeriesDataPoint[];
  pods: TimeSeriesDataPoint[];
}