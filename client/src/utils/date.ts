/**
 * Formats a date string as a human-readable date.
 * @param dateStr The date string to format
 * @returns Formatted date string or '-' if invalid
 */
export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Checks if a task is overdue (deadline before today and not completed).
 * @param task The task object with deadline and isCompleted
 * @returns True if overdue, false otherwise
 */
export function isOverdue(task: {
  deadline?: string | null;
  isCompleted: boolean;
}): boolean {
  if (!task.deadline || task.isCompleted) return false;
  const now = new Date();
  const deadline = new Date(task.deadline);
  return deadline.getTime() < now.setHours(0, 0, 0, 0);
}
