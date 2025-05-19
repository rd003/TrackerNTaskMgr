import { SortDirection } from "./sort-direction";

export interface SortModel {
    sortColumn: string | null,
    sortDirection: SortDirection
}