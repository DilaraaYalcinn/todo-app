import { useState, useEffect } from "react";
import type { Task } from "../types/Task";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "An unknown error occurred.";
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (description: string, deadline: string) => {
    if (description.trim().length < 10) {
      setError("Description must be at least 10 characters.");
      return false;
    }
    setError(null);
    setSuccess(null);
    try {
      const body: Record<string, unknown> = { description };
      if (deadline) body.deadline = deadline;
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const created = await res.json();
      setTasks((prev) => [...prev, created]);
      setSuccess("Todo item Created Successfully.");
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      return false;
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);
    setSuccess(null);
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setSuccess("Todo item Deleted Successfully.");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  const toggleTaskCompletion = async (id: number, isCompleted: boolean) => {
    setError(null);
    setSuccess(null);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted }),
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isCompleted } : t))
      );
      setSuccess(
        isCompleted
          ? "Todo item marked as done."
          : "Todo item marked as not done."
      );
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  return {
    tasks,
    loading,
    error,
    success,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setError,
    setSuccess,
  };
}
