import { TaskHeaderCreateModel } from "./task-header-create.model";

export interface TaskHeaderUpdateModel extends TaskHeaderCreateModel {
    taskHeaderId: number
}