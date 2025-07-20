import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { validateTaskDescription } from "../../utils/validation";

interface TaskInputProps {
  onAdd: (description: string, deadline: string) => Promise<boolean>;
  loading: boolean;
  search: string;
  setSearch: (val: string) => void;
}

/**
 * TaskInput component for adding new tasks.
 * Handles input, validation, and submission logic.
 * @component
 */
const TaskInput: React.FC<TaskInputProps> = ({
  onAdd,
  loading,
  search,
  setSearch,
}) => {
  // Local state for deadline input
  const [deadline, setDeadline] = useState("");

  /**
   * Handles form submission for adding a task.
   * Validates input and calls onAdd prop.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateTaskDescription(search)) {
      await onAdd(search, deadline); // will trigger error in hook
      return;
    }
    const success = await onAdd(search, deadline);
    if (success) {
      setSearch("");
      setDeadline("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 2 }}
      data-testid="task-input-form"
    >
      <TextField
        type="text"
        placeholder="Add your task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
        variant="outlined"
        size="small"
        sx={{ bgcolor: "grey.100", color: "black", flex: 2 }}
        InputProps={{
          style: { color: "black" },
          endAdornment: search ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                edge="end"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
      <TextField
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        disabled={loading}
        variant="outlined"
        size="small"
        sx={{ bgcolor: "grey.100", color: "black", flex: 1 }}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: { color: "black" } }}
        aria-label="Deadline"
      />
      <Button
        type="submit"
        disabled={loading}
        variant="contained"
        sx={{
          bgcolor: "success.main",
          color: "white",
          minWidth: 40,
          fontWeight: "bold",
        }}
        aria-label="Add Task"
      >
        +
      </Button>
    </Box>
  );
};

export default TaskInput;
