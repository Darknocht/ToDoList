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

    const colorTask = (status: string) => {
        if(status === "todo"){
            return 'error.light';
        }
        else if(status === "in-progress"){
            return 'warning.light';
        }
        else{
            return 'success.light';
        }
    };

    //Representation of a task in a web-application
    return (
        <List sx={{
            width: '100%',
            maxWidth: 360,
            mt: 0,
            mb: 0,
            ml: 'auto',
            mr: 'auto'}}>
            {tasks.map((task) => (
                <ListItem alignItems="flex-start">

                    <ListItemText
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10}}
                              secondary={
                                  <React.Fragment>
                                      <Box sx={{
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                      }}>
                                          <Box sx={{
                                              width: 20,
                                              height: 20,
                                              borderRadius: 1,
                                              display: "inline-block",
                                              ml: 1,
                                              mr: 1,
                                              mt: 1,
                                              flexShrink: 0,
                                              bgcolor: colorTask(task.status)
                                          }}/>
                                          <Typography
                                              component="span"
                                              variant="h5"
                                              sx={{ color: 'text.primary',
                                                  mr: 4.75,
                                                  display: 'inline',
                                                  wordBreak: "break-word",
                                                  maxWidth: "100%",
                                                  textAlign: 'left'}}
                                          >
                                              {task.title}
                                          </Typography>
                                      </Box>
                                      <Typography
                                          variant="body1"
                                          sx={{
                                              color: 'text.primary',
                                              ml:4.75,
                                              mr: 4.75,
                                              wordBreak: "break-word",
                                              maxWidth: "100%"}}
                                      >
                                          {task.description}
                                      </Typography>
                                      <TextField
                                          size="small"
                                          select={true}
                                          label="Status"
                                          value={task.status}
                                          onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
                                          sx={{
                                              mt:2,
                                              ml:2,
                                              mb:1}}
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
                                          sx={{
                                              mt:2,
                                              float:"right",
                                              mr:2}}>
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