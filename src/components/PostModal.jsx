import React, {useState, useEffect, useContext} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import {SnackbarContext} from "../context/SnackBar";
import "../asserts/css/login.css"
import "../asserts/css/modal.css"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "darkslategray",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    height: '80vh'
};

export const PostModal = ({open, handleClose, editingPost}) => {

    const {token, logout} = useContext(AuthContext);
    const {showSnackbar} = useContext(SnackbarContext);

    const [formData, setFormData] = useState({
        date: '',
        mood: '',
        dailyHighlight: '',
        dailyLesson: '',
        content: ''
    });

    useEffect(() => {
        if (editingPost) {
            setFormData({
                date: editingPost.date,
                mood: editingPost.mood,
                dailyHighlight: editingPost.dailyHighlight,
                dailyLesson: editingPost.dailyLesson,
                content: editingPost.content
            });
        } else {
            setFormData({
                date: '',
                mood: '',
                dailyHighlight: '',
                dailyLesson: '',
                content: ''
            });
        }
    }, [editingPost]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const url = editingPost
            ? `http://localhost:8080/v1/gratitude-journal/gratitude/${editingPost.id}`
            : "http://localhost:8080/v1/gratitude-journal/gratitude/save";

        const method = editingPost ? axios.put : axios.post;

        method(url, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(() => {
                window.location.reload();

            })
            .catch((err) => {

                if (err.response.status === 401) {
                    showSnackbar("Your session has expired. Please log in again.", "warning");
                    logout();
                }

                if (err.response?.status === 400) {
                    const errors = err.response.data.errors;
                    const firstError = Object.values(errors)[0][0];
                    showSnackbar(firstError, "error");

                } else if (err.response?.status === 409) {
                    showSnackbar(err.response.data.message, "error");

                } else {
                    showSnackbar("Unexpected error occurred.", "error");
                }

                setFormData({
                    date: '',
                    mood: '',
                    dailyHighlight: '',
                    dailyLesson: '',
                    content: ''
                });

            });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={style}
                className="form"
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography variant="h4">
                    {editingPost ? "Edit Post" : "Create Post"}
                </Typography>

                <TextField
                    fullWidth
                    disabled={editingPost}
                    id="date"
                    name="date"
                    value={formData.date}
                    type="date"
                    required
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

                <TextField
                    fullWidth
                    id="mood"
                    label="Mood"
                    name="mood"
                    value={formData.mood}
                    type="number"
                    required
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

                <TextField
                    fullWidth
                    id="dailyHighlight"
                    label="Daily highlight"
                    name="dailyHighlight"
                    value={formData.dailyHighlight}
                    required
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

                <TextField
                    fullWidth
                    id="dailyLesson"
                    label="Daily lesson"
                    name="dailyLesson"
                    value={formData.dailyLesson}
                    required
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

                <TextField
                    fullWidth
                    id="content"
                    label="Content"
                    name="content"
                    value={formData.content}
                    required
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

                <Button type="submit" variant="contained" size="large">
                    {editingPost ? "Save Changes" : "Create"}
                </Button>

            </Box>
        </Modal>
    );
};
