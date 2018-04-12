export interface LogWithTotal {
  total_count: number;
  items: Log[];
}

export interface Log {
  id: number;
  create_date: string;
  message: string;
  name: string;
  level: number;
}
