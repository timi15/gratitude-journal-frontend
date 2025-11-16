import React, {useContext, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {PasswordField} from "../components/PasswordField";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {SnackbarContext} from "../context/SnackBar";
import "../asserts/css/login.css"

export const SignUp = () => {

    const navigate = useNavigate();

    const {showSnackbar} = useContext(SnackbarContext);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            "http://localhost:8080/v1/gratitude-journal/auth/registration",
            formData,
            {
                headers: {"Content-Type": "application/json"}
            }
        )
            .then((res) => {
                setFormData({name: '', username: '', email: '', password: ''});
                navigate("/login");
                console.log("Registration successful:", res);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 409) {
                        showSnackbar(err.response.data.message, "error");
                    } else if (err.response.status === 400) {
                        const errors = err.response.data.errors;
                        const firstError = Object.values(errors)[0][0];
                        showSnackbar(firstError, "error");
                    } else {
                        showSnackbar(err.response.data, "error");
                    }
                } else {
                    console.log("Backend is not reachable.");
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
                    Sign Up
                </Typography>

                <TextField
                    id="name"
                    label="Name"
                    name="name"
                    value={formData.name}
                    type="text"
                    variant="outlined"
                    required
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

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

                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="email"
                    variant="outlined"
                    required
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <PasswordField
                    name="password"
                    label="Password"
                    value={formData.password}
                    required={true}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <Button
                    size="large"
                    variant="contained"
                    type="submit">
                    Sign Up
                </Button>

                <Link to="/login"
                      variant="body1">
                    Already have an account? Login!
                </Link>

            </Box>

        </div>
    )
}
