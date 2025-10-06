import {useEffect, useState} from 'react'
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import './App.css'

function App() {
    const [reload, setReload] = useState<boolean>(false);

    //Change the title of Web-Application
    useEffect(() => {
        document.title = "To-Do List";
    }, []);

  return (
    <>
        <TaskForm onTaskCreated={() => setReload(!reload)} />
        <TaskList reload={reload} />
    </>
  )
}

export default App
