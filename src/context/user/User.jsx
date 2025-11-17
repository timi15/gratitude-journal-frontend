import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../auth/Auth";
import {SnackbarContext} from "../SnackBar";

export const UserContext = createContext();

export const User = ({children}) => {

    const {token, logout} = useContext(AuthContext);
    const {showSnackbar} = useContext(SnackbarContext);

    const [users, setUsers] = useState([]);

    const handleSetUsers = (users) => {
        setUsers(users);
    };

    const handleChangeUser = async (user_id, user) => {

        setUsers(users.filter((value) => value.user_id !== user_id ? value : user));

        try {
            const res = await axios
                .put(`http://localhost:8080/v1/gratitude-journal/users/${user_id}`, user, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            showSnackbar("Update was successful!", "success");

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

    const handleRemoveUser = async (user_id) => {
        setUsers(users.filter((value) => value.user_id !== user_id));

        try {
            const res = await axios
                .delete(`http://localhost:8080/v1/gratitude-journal/users/${user_id}`, {
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
        <UserContext.Provider value={{users, handleSetUsers, handleChangeUser, handleRemoveUser}}>
            {children}
        </UserContext.Provider>
    )
}
