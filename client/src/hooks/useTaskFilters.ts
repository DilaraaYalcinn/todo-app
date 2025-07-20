import { useState, useMemo } from "react";
import type { Task } from "../types/Task";

export function useTaskFilters(tasks: Task[]) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "notdone">("all");

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "notdone") filtered = filtered.filter((t) => !t.isCompleted);
    if (search.trim().length >= 3) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, filter, search]);

  return {
    filteredTasks,
    search,
    setSearch,
    filter,
    setFilter,
  };
}
