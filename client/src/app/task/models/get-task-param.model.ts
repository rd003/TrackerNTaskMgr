import { SortDirection } from "../../shared/sort-direction";

export interface GetTaskParam {
    taskHeaderId: number | null,
    taskPriorityId: number | null,
    tagId: number | null,
    sortBy: string | null,
    sortDirection: SortDirection
}