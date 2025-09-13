import {useEffect, useState} from "react";
import {List, ListItem, Typography, ListItemText, Divider, Button, MenuItem, TextField, Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import type {Task} from "../Task.ts";
import {getTasks, deleteTask, updateTaskStatus} from "../api.ts";
import React from "react";

interface Props {
    reload: boolean;
}

export default function TaskList({reload}: Props){
    //We initiate task with useState
    const [tasks, setTasks] = useState<Task[]>([]);

    //Style to separate each tasks
    const style = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
    };

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
        <List sx={{ width: '100%', maxWidth: 360,  style}}>
            {tasks.map((task) => (
                <ListItem alignItems="flex-start">

                    <ListItemText
                        style={{backgroundColor: "powderblue", borderRadius: 10}}
                              secondary={
                                  <React.Fragment>
                                      <Box sx={{ borderRadius: '50%' }}/>
                                      <Typography
                                          component="span"
                                          variant="h5"
                                          sx={{ color: 'text.primary', display: 'inline' }}
                                      >
                                          {task.title}
                                      </Typography>
                                      <Typography
                                          variant="body1"
                                          sx={{color: 'text.primary'}}
                                      >
                                          {task.description}
                                      </Typography>
                                      <TextField
                                          size="small"
                                          select={true}
                                          label="Status"
                                          value={task.status}
                                          onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
                                          sx={{mt:2, ml:2, mb:2}}
                                      >
                                          <MenuItem value="todo">Zu tun</MenuItem>
                                          <MenuItem value="in-progress">Laufend</MenuItem>
                                          <MenuItem value="done">Fertig</MenuItem>
                                      </TextField>
                                      <Button

                                          onClick={() => handleDelete(task.id)}
                                          color="error"
                                          variant="contained"
                                          startIcon={<DeleteIcon />}
                                          sx={{mt:2, float:"right", mr:2}}>
                                          Löschen
                                      </Button>
                                      <Divider component="li" />
                                  </React.Fragment>
                              }
                    />
                </ListItem>
            ))}
        </List>
    );
}