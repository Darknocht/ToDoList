import React, {useState} from 'react';
import {TextField, Button, MenuItem, Paper, Dialog, DialogTitle, DialogContent, Box, Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {createTask} from "../api.ts";
import type {Task} from "../Task.ts";

interface Props {
    onTaskCreated: () => void;
}

export default function TaskForm({onTaskCreated}: Props){
    //Initialisation of each State of a task with error
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<Task["status"]>("todo");
    const [error, setError] = useState<string[]>(["",""]);

    //Initialisation of a pop-up TaskForm
    const [open, setOpen] = useState<boolean>(false);

    /**
     * Checking if title and description don't meet the criteria
     * @return {string[]} an Array of description errors (empty if there are no error)
     */
    const checking = (): string[] => {
        let errors: string[] = ["", ""];
        if(!title || title.length > 100){
            errors[0] = "Erforderlicher Titel mit max 100 Zeichen";
        }
        if(description.length > 500 || /<script>/i.test(description)){
            errors[1] = "Beschreibung mit max 500 Zeichen und kein JS-Code"
        }
        return errors;
    }

    /**
     * Create the task when the creating Button is clicked and close the window
     * @param e event when the creating Button is clicked
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = checking();
        //An error has been found
        if(err[0].length > 0 || err[1].length > 0){
            setError(err);
            return;
        }
        //Initialisation of the task
        await createTask({title, description, status});
        setTitle("");
        setDescription("");
        setStatus("todo");
        setError(["",""]);
        onTaskCreated();

        //We close the window, the task has been created
        setOpen(false);
    };

    //Representation of a TaskForm to create a new task
    return (
        <Paper sx={{p:2, mb:2, borderRadius: 2}}>
            <Typography variant="h3" color="black" sx={{mb: 2}}>To-Do List</Typography>
            <Button
                variant="contained"
                color="success"
                onClick={() => setOpen(true)}
                startIcon={<AddCircleOutlineIcon/>}
            >
                eine Aufgabe erstellen
            </Button>
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <DialogTitle>
                    Eine Aufgabe erstellen
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setOpen(false)}
                        startIcon={<CloseIcon/>}
                        sx={{float: "right"}}>
                        Schließen
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth={true}
                            label="Titel"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={Boolean(!!error && error[0].length > 0)}
                            helperText={error[0]}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth={true}
                            label="Beschreibung"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline={true}
                            rows={3}
                            sx={{mt:2}}
                            error={Boolean(!!error && error[1].length > 0)}
                            helperText={error[1]}
                        />
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <TextField
                                size="small"
                                select={true}
                                multiline={true}
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Task["status"])}
                                sx={{
                                    mt: 2,
                                    ml: 2
                                }}
                            >
                                <MenuItem value="todo">Zu tun</MenuItem>
                                <MenuItem value="in-progress">Laufend</MenuItem>
                                <MenuItem value="done">Fertig</MenuItem>
                            </TextField>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                startIcon={<AddCircleOutlineIcon/>}
                                sx={{
                                    mt: 2,
                                    ml: 2
                                }}
                            >
                                erstellen
                            </Button>
                        </Box>

                    </form>
                </DialogContent>
            </Dialog>

        </Paper>
    );
}