import {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, Typography, ListItemText} from "@mui/material";
import type {Task} from "../Task.ts";
import {getTasks, deleteTask, updateTaskStatus} from "../api.ts";
import React from "react";

interface Props {
    reload: boolean;
}

export default function TaskList({reload}: Props){
    //We initiate task with useState
    const [tasks, setTasks] = useState<Task[]>([]);

    //React component to update tasks
    useEffect(() => {
        getTasks().then(setTasks);
    }, [reload]);

    //Delete task Button
    const handleDelete = async (id: number) => {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Update status of the task Button
    const handleStatusChange = async (id: number, status: Task["status"]) => {
        const updatedTask = await updateTaskStatus(id, status);
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };

    //Representation of a task in a web-application
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {tasks.map((task) => (
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Brunch this weekend?"
                              secondary={
                                  <React.Fragment>
                                      <Typography
                                          component="span"
                                          variant="body2"
                                          sx={{ color: 'text.primary', display: 'inline' }}
                                      >
                                          {task.title}
                                      </Typography>
                                      <Typography>
                                          {task.description}
                                      </Typography>
                                      <ListItemButton onClick={() => handleDelete(task.id)}>
                                            Löschen
                                      </ListItemButton>
                                      <select
                                          value={task.status}
                                          onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
                                          >
                                          <option value="todo">todo</option>
                                          <option value="in-progress">in-progress</option>
                                          <option value="done">done</option>
                                      </select>
                                  </React.Fragment>
                              }
                    />
                </ListItem>
            ))}
        </List>
    );
}