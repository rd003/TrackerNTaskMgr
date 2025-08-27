export interface TaskCreateModel {
  taskId: string,
  taskHeaderId: string;
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
  subTaskId: string | null,
  subTaskTitle: string;
  subTaskUri: string | null;
}