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
        console.log(user_id, user);

        setUsers((prev) =>
            prev.map((u) => (u.id === user_id ? user : u))
        );

        try {
            await axios
                .put(`http://localhost:8080/v1/gratitude-journal/users/${user_id}`, user, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            showSnackbar("User updated!", "success");

            return true;

        } catch (err) {
            if (err.response && err.response.status === 401) {
                showSnackbar("Your session has expired. Please log in again.", "warning");
                logout();
            }

            showSnackbar("Update failed!", "error");

            return false;
        }
    };

    const handleRemoveUser = async (user_id) => {

        setUsers(users.filter((value) => value.id !== user_id));

        try {
            await axios
                .delete(`http://localhost:8080/v1/gratitude-journal/users/${user_id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

            showSnackbar("User deleted!", "success");

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
        <UserContext.Provider value={{users, handleSetUsers, handleChangeUser, handleRemoveUser}}>
            {children}
        </UserContext.Provider>
    )
}
