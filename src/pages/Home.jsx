import React, {useContext, useEffect, useState} from 'react'
import {Button} from "@mui/material";
import axios from "axios";
import {PostModal} from "../components/PostModal";
import {PostsTable} from "../components/PostsTable";
import {SnackbarContext} from "../context/SnackBar";
import {PostContext} from "../context/post/Post";
import {AuthContext} from "../context/auth/Auth";


export const Home = () => {

    const {token, logout} = useContext(AuthContext);
    const {handleSetPosts} = useContext(PostContext);
    const {showSnackbar} = useContext(SnackbarContext);

    const [open, setOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const handleEdit = (post) => {
        setEditingPost(post);
        setOpen(true);
    };

    const handleCreate = () => {
        setEditingPost(null);
        setOpen(true);
    };

    useEffect(() => {

        axios.get('http://localhost:8080/v1/gratitude-journal/gratitude/all', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            handleSetPosts(res.data);
        })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    showSnackbar("Your session has expired. Please log in again.", "warning");
                    logout();
                }
            });

    }, []);


    return (
        <div style={{textAlign: "center", width: "90%", margin: "2rem auto "}}>

            <Button style={{marginBottom: "4rem", width: '15rem'}} onClick={handleCreate}>Create Post</Button>

            <PostModal
                open={open}
                handleClose={() => setOpen(false)}
                editingPost={editingPost}
            />

            <PostsTable onEdit={handleEdit}/>
        </div>

    )
}
