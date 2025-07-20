import { TaskInput, TaskList } from "./components/Task";
import { Notification } from "./components/Notification";
import { useTasks } from "./hooks/useTasks";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { ContainerBox, MainLayout } from "./components/Layout";
import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import NotebookIcon from "./assets/NotebookIcon";

function App() {
  const {
    tasks,
    loading,
    error,
    success,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setError,
    setSuccess,
  } = useTasks();

  const { filteredTasks, search, setSearch, filter, setFilter } =
    useTaskFilters(tasks);

  const handleAddTask = async (description: string, deadline: string) => {
    const result = await addTask(description, deadline);
    if (result) setFilter("all");
    return result;
  };

  return (
    <MainLayout>
      <ContainerBox>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="black"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            ToDo List
            <span role="img" aria-label="notebook">
              <NotebookIcon style={{ verticalAlign: "middle" }} />
            </span>
          </Typography>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, val) => val && setFilter(val)}
            size="small"
            sx={{ ml: 2 }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="notdone">ToDo</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <TaskInput
          onAdd={handleAddTask}
          loading={loading}
          search={search}
          setSearch={setSearch}
        />

        <Notification
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
        <Notification
          message={error}
          type="error"
          onClose={() => setError(null)}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskCompletion}
          onDelete={deleteTask}
        />
      </ContainerBox>
    </MainLayout>
  );
}

export default App;
