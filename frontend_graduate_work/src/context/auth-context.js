import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [tokenOperatingTime, setTokenOperatingTime] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const tokenTime = localStorage.getItem("jwtTime");
        const userType = localStorage.getItem("userType")

        if (token && tokenTime) {
            setToken(token);
            setTokenOperatingTime(new Date().getTime() + tokenTime);
            setUserType(userType);
        }

    }, []);

    const login = (newToken, tokenTime, userType) => {
        setTokenOperatingTime(new Date().getTime() + tokenTime);
        setToken(newToken);
        setUserType(userType);

        localStorage.setItem("jwtToken", newToken);
        localStorage.setItem("jwtTime", tokenTime);
        localStorage.setItem("userType", userType);
    };

    const logout = () => {
        setToken(null);
        setTokenOperatingTime(null);
        setUserType(null);

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTime");
        localStorage.removeItem("userType");
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
        <AuthContext.Provider value={{token, userType, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};