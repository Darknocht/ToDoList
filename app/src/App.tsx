import { useState } from 'react'
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import './App.css'
import {Typography} from "@mui/material";

function App() {
    const [reload, setReload] = useState<boolean>(false);

  return (
    <>
        <Typography variant="h4">To-Do List</Typography>
        <TaskForm onTaskCreated={() => setReload(!reload)} />
        <TaskList reload={reload} />
    </>
  )
}

export default App
