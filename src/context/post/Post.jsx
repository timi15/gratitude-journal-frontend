import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../auth/Auth";
import {SnackbarContext} from "../SnackBar";

export const PostContext = createContext();

export const Post = ({children}) => {

    const {token, logout} = useContext(AuthContext);
    const {showSnackbar} = useContext(SnackbarContext);

    const [posts, setPosts] = useState([]);

    const handleSetPosts = (posts) => {
        setPosts(posts);
    };

    const handleAddPost = (newPost) => {
        setPosts(prev => {
            const updated = [...prev, newPost];
            return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
        });
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(prev => {
            const updated = prev.map(p => p.id === updatedPost.id ? updatedPost : p);
            return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
        });
    };

    const handleRemovePost = async (post_id) => {

        setPosts(posts.filter((value) => value.id !== post_id));

        try {
            await axios
                .delete(`http://localhost:8080/v1/gratitude-journal/gratitude/${post_id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

            showSnackbar("Post deleted!", "success")

            return true;

        } catch (err) {
            if (err.response && err.response.status === 401) {
                showSnackbar("Your session has expired. Please log in again.", "warning");
                logout();
            }

            showSnackbar("Delete failed!", "error");


            return false;
        }
    };


    return (
        <PostContext.Provider value={{posts, handleSetPosts, handleAddPost, handleUpdatePost, handleRemovePost}}>
            {children}
        </PostContext.Provider>
    )
}
