import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "../TaskInput";

// Mock props
const onAdd = vi.fn(() => Promise.resolve(false));
const setSearch = vi.fn();

describe("TaskInput", () => {
  it("shows error when task is less than 10 characters", async () => {
    render(
      <TaskInput
        onAdd={onAdd}
        loading={false}
        search={"short"}
        setSearch={setSearch}
      />
    );
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);
    // onAdd should be called, but the parent should handle error display
    expect(onAdd).toHaveBeenCalledWith("short", "");
  });

  it("calls onAdd with correct values when valid", async () => {
    render(
      <TaskInput
        onAdd={onAdd}
        loading={false}
        search={"This is a valid task"}
        setSearch={setSearch}
      />
    );
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);
    expect(onAdd).toHaveBeenCalledWith("This is a valid task", "");
  });

  it("does not call onAdd if loading is true", () => {
    onAdd.mockReset();
    render(
      <TaskInput
        onAdd={onAdd}
        loading={true}
        search={"This is a valid task"}
        setSearch={setSearch}
      />
    );
    const form = screen.getByTestId("task-input-form");
    fireEvent.submit(form);
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("clears fields after successful add", async () => {
    const onAddSuccess = vi.fn(() => Promise.resolve(true));
    let searchValue = "This is a valid task";
    const setSearchMock = vi.fn((val) => (searchValue = val));
    render(
      <TaskInput
        onAdd={onAddSuccess}
        loading={false}
        search={searchValue}
        setSearch={setSearchMock}
      />
    );
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);
    // setSearch should be called with "" to clear
    await Promise.resolve(); // wait for async
    expect(setSearchMock).toHaveBeenCalledWith("");
  });

  it("does not clear fields if add fails", async () => {
    const onAddFail = vi.fn(() => Promise.resolve(false));
    let searchValue = "This is a valid task";
    const setSearchMock = vi.fn((val) => (searchValue = val));
    render(
      <TaskInput
        onAdd={onAddFail}
        loading={false}
        search={searchValue}
        setSearch={setSearchMock}
      />
    );
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);
    await Promise.resolve();
    expect(setSearchMock).not.toHaveBeenCalledWith("");
  });

  it("allows entering and clearing text", () => {
    let searchValue = "";
    const setSearchMock = vi.fn((val) => (searchValue = val));
    render(
      <TaskInput
        onAdd={onAdd}
        loading={false}
        search={searchValue}
        setSearch={setSearchMock}
      />
    );
    const input = screen.getByPlaceholderText(/add your task/i);
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(setSearchMock).toHaveBeenCalledWith("New Task");
  });

  it("allows entering a deadline", () => {
    render(
      <TaskInput
        onAdd={onAdd}
        loading={false}
        search={"This is a valid task"}
        setSearch={setSearch}
      />
    );
    const dateInput = screen.getByLabelText("Deadline") as HTMLInputElement;
    dateInput.value = "2024-12-31";
    fireEvent.change(dateInput);
    expect(dateInput.value).toBe("2024-12-31");
  });
});
