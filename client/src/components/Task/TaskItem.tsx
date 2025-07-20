import React from "react";
import type { Task } from "../../types/Task";
import { IconButton, TableRow, TableCell } from "@mui/material";
import DoneIcon from "../../assets/DoneIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import UndoIcon from "../../assets/UndoIcon";
import { isOverdue } from "../../utils/date";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
  formattedDeadline?: string;
}

/**
 * TaskItem component renders a single task row in the task table.
 * Handles overdue highlighting, completion, and deletion actions.
 * @component
 */
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  formattedDeadline,
}) => {
  // Determine if the task is overdue
  const overdue = isOverdue(task);
  return (
    <TableRow>
      <TableCell
        sx={{
          color: overdue ? "error.main" : "black",
          fontWeight: 400,
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        {task.description}
      </TableCell>
      <TableCell
        sx={{
          color: overdue ? "error.main" : "black",
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        {task.deadline ? formattedDeadline : "-"}
      </TableCell>
      <TableCell align="right">
        <IconButton
          onClick={() => onToggleComplete(task.id, !task.isCompleted)}
          title={task.isCompleted ? "Mark as not done" : "Mark as done"}
          sx={{ color: task.isCompleted ? "warning.main" : "success.main" }}
        >
          {task.isCompleted ? <UndoIcon /> : <DoneIcon />}
        </IconButton>
        <IconButton
          onClick={() => onDelete(task.id)}
          title="Delete"
          sx={{ color: "success.main" }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
