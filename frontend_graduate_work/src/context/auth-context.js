import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [tokenOperatingTime, setTokenOperatingTime] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const tokenTime = localStorage.getItem("jwtTime");

        if (token && tokenTime) {
            setToken(token);
            setTokenOperatingTime(new Date().getTime() + tokenTime);
        }

    }, []);

    const login = (newToken, tokenTime) => {
        setTokenOperatingTime(new Date().getTime() + tokenTime);
        setToken(newToken);

        localStorage.setItem("jwtToken", newToken);
        localStorage.setItem("jwtTime", tokenTime);
    };

    const logout = () => {
        setToken(null);
        setTokenOperatingTime(null);

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTime");
    };

    useEffect(() => {
        const checkTokenValidity = () => {
            if (tokenOperatingTime && new Date().getTime() > tokenOperatingTime) {
                logout();
                alert("The session time has expired =(. Please log in again.");
            }
        }

        const tokenValidityInterval = setInterval(checkTokenValidity, 1000);

        return () => clearInterval(tokenValidityInterval);
    }, [tokenOperatingTime]);

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};