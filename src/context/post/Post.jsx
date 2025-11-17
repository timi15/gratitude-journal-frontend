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

    const handleRemovePost = async (post_id) => {

        setPosts(posts.filter((value) => value.post_id !== post_id));

        try {
            await axios
                .delete(`http://localhost:8080/v1/gratitude-journal/gratitude/${post_id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

            showSnackbar("Delete was successful!", "success");

            setTimeout(() => {
                window.location.reload();
            }, 3000);

            return true;

        } catch (err) {
            if (err.response && err.response.status === 401) {
                showSnackbar("Your session has expired. Please log in again.", "warning");
                logout();
            }

            showSnackbar("Unexpected error occurred.", "error");

            return false;
        }
    };


    return (
        <PostContext.Provider value={{posts, handleSetPosts, handleRemovePost}}>
            {children}
        </PostContext.Provider>
    )
}
