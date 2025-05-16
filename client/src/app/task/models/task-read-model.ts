export interface TaskReadModel {
  taskId: number;
  taskHeaderId: number;
  taskTitle: string;
  taskUri?: string | null;
  taskPriorityId: number;
  taskStatusId: number;
  deadline?: string | null;
  scheduledAt?: string | null;
  displayAtBoard: boolean;
  taskHeaderTitle: string;
  subTasks: SubTaskReadModel[];
  taskStatus: TaskStatusReadModel;
  taskPriority: TaskPriorityReadModel;
  tags: string[];
}

export interface SubTaskReadModel {
  subTaskId: number;
  taskId: number;
  subTaskTitle: string;
  subTaskUri: string;
}

export interface TaskStatusReadModel {
  taskStatusName: string;
  taskStatusEmoji?: string | null;
}

export interface TaskPriorityReadModel {
  taskPriorityName: string;
  taskPriorityOrder: number;
  taskPriorityEmoji?: string | null;
}

export interface TasksByTaskHeader {
  taskHeaderTitle: string,
  tasks: TaskReadModel[]
}

