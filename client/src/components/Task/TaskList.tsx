import React, { useState, useMemo } from "react";
import type { Task } from "../../types/Task";
import TaskItem from "./TaskItem";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TaskPagination from "./TaskPagination";
import { formatDate } from "../../utils/date";
import type { SortKey, SortOrder } from "../../utils/sort";
import { sortTasks } from "../../utils/sort";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
}

/**
 * TaskList component displays a sortable, paginated table of tasks.
 * It delegates row rendering to TaskItem.
 * @component
 */
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>("deadline");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedTasks = useMemo(
    () => sortTasks(tasks, sortKey, sortOrder),
    [tasks, sortKey, sortOrder]
  );

  if (tasks.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ my: 4 }}>
        No tasks found.
      </Typography>
    );
  }

  return (
    <TaskPagination items={sortedTasks} rowsPerPage={6}>
      {(paginatedItems) => (
        <>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 0, bgcolor: "transparent" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("description")}
                  >
                    Task
                    <IconButton
                      size="small"
                      sx={{ ml: 0.5, verticalAlign: "middle" }}
                    >
                      {sortKey === "description" ? (
                        sortOrder === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : null}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("deadline")}
                  >
                    Due Date
                    <IconButton
                      size="small"
                      sx={{ ml: 0.5, verticalAlign: "middle" }}
                    >
                      {sortKey === "deadline" ? (
                        sortOrder === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : null}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", fontWeight: "bold" }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    formattedDeadline={formatDate(task.deadline)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </TaskPagination>
  );
};

export default TaskList;
