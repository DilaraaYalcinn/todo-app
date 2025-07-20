/**
 * Validates that a task description is at least 10 characters long (after trimming).
 * @param description The task description to validate
 * @returns True if valid, false otherwise
 */
export function validateTaskDescription(description: string): boolean {
  return description.trim().length >= 10;
}
