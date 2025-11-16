import React, {useContext, useEffect} from 'react'
import axios from "axios";
import {UsersTable} from "../components/UsersTable";
import {AuthContext} from "../context/auth/Auth";
import {UserContext} from "../context/user/User";
import {SnackbarContext} from "../context/SnackBar";

export const UserController = () => {

    const {token, userRole, logout} = useContext(AuthContext);
    const {handleSetUsers} = useContext(UserContext);
    const {showSnackbar} = useContext(SnackbarContext);


    useEffect(() => {
        if (!userRole || !token) return;
        if (userRole !== "ROLE_ADMIN") return;

        axios.get('http://localhost:8080/v1/gratitude-journal/users', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => handleSetUsers(res.data))
            .catch((err) => {
                if (err.response.status === 401) {
                    showSnackbar("Your session has expired. Please log in again.", "warning");
                    logout();
                }
            });
    }, [userRole, token]);

    return (

        <div style={{textAlign: "center", width: "90%", margin: "2rem auto "}}>
            <UsersTable/>
        </div>
    )
}
