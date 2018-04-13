export interface LogWithTotal {
  total_count: number;
  items: Log[];
}

export interface Log {
  id: number;
  create_time: string;
  message: string;
  name: string;
  level: number;
}
