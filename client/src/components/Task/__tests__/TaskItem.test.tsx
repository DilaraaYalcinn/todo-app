import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../TaskItem";
import { describe, it, expect, vi } from "vitest";

describe("TaskItem Component", () => {
  it("renders task description", () => {
    const task = {
      id: 1,
      description: "Test Task",
      deadline: null,
      isCompleted: false,
    };
    render(
      <TaskItem task={task} onToggleComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls onToggleComplete when Done button is clicked", () => {
    const task = {
      id: 1,
      description: "Test Task",
      deadline: null,
      isCompleted: false,
    };
    const onToggleComplete = vi.fn();
    render(
      <TaskItem
        task={task}
        onToggleComplete={onToggleComplete}
        onDelete={vi.fn()}
      />
    );
    // The button may have an icon, so use title or role if needed
    const doneButton = screen.getByTitle(/done/i);
    fireEvent.click(doneButton);
    expect(onToggleComplete).toHaveBeenCalledWith(1, true);
  });
});
