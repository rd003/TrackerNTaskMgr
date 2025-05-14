export interface TaskCreateModel {
  taskId: number,
  taskHeaderId: number;
  taskTitle: string;
  taskUri: string | null;
  taskPriorityId: number;
  taskStatusId: number;
  deadline: Date | null;
  scheduledAt: Date | null;
  displayAtBoard: boolean;
  subTasks: SubTaskCreateModel[];
  tags: string;
}

export interface SubTaskCreateModel {
  subTaskId: number,
  subTaskTitle: string;
  subTaskUri: string | null;
}