import React, {useState} from 'react'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const PasswordField = ({name, label, value, onChange, required}) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined" required={required}>
            <InputLabel htmlFor={name}>Password</InputLabel>
            <OutlinedInput
                id={name}
                name={name}
                label={label}
                value={value}
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            className="password-show-icon"
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"

                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}