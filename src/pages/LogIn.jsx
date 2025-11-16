import React, {useContext, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {PasswordField} from "../components/PasswordField";
import {AuthContext} from "../context/auth/Auth";
import {SnackbarContext} from "../context/SnackBar";
import "../asserts/css/login.css"


export const LogIn = () => {

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const {showSnackbar} = useContext(SnackbarContext);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            "http://localhost:8080/v1/gratitude-journal/auth/login",
            formData,
            {
                headers: {"Content-Type": "application/json"}
            }
        )
            .then((res) => {

                login(res.data);
                showSnackbar("Login successful!", "success");
                navigate("/home");

            })
            .catch((err) => {

                if (err.response) {
                    if (err.response.status === 409) {
                        showSnackbar(err.response.data.message, "error");

                    } else if (err.response.status === 400) {
                        const errors = err.response.data.errors;
                        const firstError = Object.values(errors)[0][0];
                        showSnackbar(firstError, "error");
                    } else if(err.response.status === 500) {
                        showSnackbar(err.response.data.message, "error");
                    }
                } else {
                    showSnackbar("Unexpected error occurred.", "error");
                }
            });
    }


    return (
        <div className='box'>

            <Box
                className="form"
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off">

                <Typography variant="h3">
                    Login
                </Typography>


                <TextField
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    type="text"
                    variant="outlined"
                    required
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />


                <PasswordField
                    name="password"
                    label="Password"
                    required={true}
                    value={formData.password}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <Button
                    size="large"
                    variant="contained"
                    type="submit">
                    Login
                </Button>

                <Link to="/sign-up"
                      variant="body1">
                    Don't have an account? Sign Up!
                </Link>

            </Box>

        </div>
    )
}
