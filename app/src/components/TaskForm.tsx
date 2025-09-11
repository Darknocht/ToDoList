import {useState} from 'react';
import {TextField, Button, MenuItem, Paper} from "@mui/material";
import {createTask} from "../api.ts";
import type {Task} from "../Task.ts";

interface Props {
    onTaskCreated: () => void;
}

export default function TaskForm({onTaskCreated}: Props){
    //Initialisation of each State of a task with error
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task["status"]>("todo");
    const [error, setError] = useState("");

    const checking = (): string => {
        if(!title || title.length > 100){
            return "Erforderlicher Titel (max 100 Zeichen)";
        }
        if(description.length > 500 || /<script>/i.test(description)){
            return "Ungültige Beschreibung"
        }
        //No error
        return "";
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = checking();
        //An error has been found
        if(!err){
            setError(err);
            return;
        }
        //Initialisation of a void task
        await createTask({title, description, status});
        setTitle("");
        setDescription("");
        setStatus("todo");
        setError("");
        onTaskCreated();
    };

    //Representation of a TaskForm to create a new task
    return (
        <Paper sx={{p:2, mb:2}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth={true}
                    label="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
                <TextField
                    fullWidth={true}
                    label="Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline={true}
                    rows={3}
                    sx={{mt:2}}
                />
                <TextField
                    select={true}
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Task["status"])}
                    >
                    <MenuItem value="todo">Zu tun</MenuItem>
                    <MenuItem value="in-progress">Laufend</MenuItem>
                    <MenuItem value="done">Fertig</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="success" onClick={handleSubmit}>
                    erstellen
                </Button>
            </form>
        </Paper>
    );
}