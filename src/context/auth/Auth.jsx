import React, {createContext, useState, useEffect} from "react";
import {decodeToken, isExpired} from "react-jwt";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const Auth = ({children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);

    const extractRole = (decoded) => {
        if (!decoded) return null;

        for (const key of Object.keys(decoded)) {
            if (key.startsWith("ROLE_")) {
                return decoded[key].authority;
            }
        }
        return null;
    };

    const login = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);

        const decoded = decodeToken(jwtToken);
        const role = extractRole(decoded);

        setUsername(decoded.sub);
        setUserRole(role);
        setIsAuthenticated(true);

    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserRole(null);
        setIsAuthenticated(false);
        navigate("/login")
    };

    useEffect(() => {
        if (token) {

            if (isExpired(token)) {
                logout();
                return;
            }

            const decoded = decodeToken(token);
            const role = extractRole(decoded);

            setUsername(decoded.sub);
            setUserRole(role);
            setIsAuthenticated(true);
        }
    }, [token]);


    return (
        <AuthContext.Provider value={{token, username, isAuthenticated, userRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
