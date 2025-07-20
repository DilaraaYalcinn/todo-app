import type { Task } from "../types/Task";

export type SortKey = "description" | "deadline" | "isCompleted";
export type SortOrder = "asc" | "desc";

/**
 * Sorts an array of tasks by the given key and order.
 * @param tasks Array of tasks to sort
 * @param sortKey The key to sort by (description, deadline, isCompleted)
 * @param sortOrder The order to sort (asc or desc)
 * @returns Sorted array of tasks
 */
export function sortTasks(
  tasks: Task[],
  sortKey: SortKey,
  sortOrder: SortOrder
): Task[] {
  return [...tasks].sort((a, b) => {
    let aValue: string | boolean = a[sortKey] as string | boolean;
    let bValue: string | boolean = b[sortKey] as string | boolean;
    if (sortKey === "deadline") {
      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
    }
    if (sortKey === "description") {
      aValue = (aValue as string).toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
