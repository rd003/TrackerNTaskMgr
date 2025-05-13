import { SubTaskCreateModel } from "./sub-task-create.model";

export interface TaskCreateModel {
  TaskHeaderId: number;
  TaskTitle: string;
  TaskUri: string | null;
  TaskPriorityId: number;
  Deadline: string | null; // Can be changed to Date if parsing is involved
  ScheduledAt: string | null; // Same as above
  DisplayAtBoard: boolean;
  SubTasks: SubTaskCreateModel[];
  Tags: string[];
}