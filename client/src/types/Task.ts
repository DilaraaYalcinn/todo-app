export interface Task {
  id: number;
  description: string;
  deadline: string | null;
  isCompleted: boolean;
}
