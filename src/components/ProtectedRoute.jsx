import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/auth/Auth";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};