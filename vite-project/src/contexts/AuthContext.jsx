import { Children, useState, createContext, useContext } from "react";
import axios from "axios";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:3000/api/v1/users"
})


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }

        }
        catch (err) {
            throw err;

        }
    }
    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/Login", {
                username: username,
                password: password


            })
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        }
        catch (err) {
            throw err;

        }
    }
    

    const data = {
        userData, setUserData, handleRegister
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}