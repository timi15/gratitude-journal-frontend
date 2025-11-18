import React, {createContext, useState, useCallback} from "react";
import {Snackbar, Alert} from "@mui/material";

export const SnackbarContext = createContext();

export const SnackBar = ({children}) => {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info"
    });

    const showSnackbar = useCallback((message, severity = "info") => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    }, []);

    const handleClose = () => {
        setSnackbar(prev => ({...prev, open: false}));
    };

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
            >

                <Alert onClose={handleClose} severity={snackbar.severity} sx={{width: "200%"}}  variant="filled" icon={false}>
                    {snackbar.message}
                </Alert>

            </Snackbar>
        </SnackbarContext.Provider>
    );
};
