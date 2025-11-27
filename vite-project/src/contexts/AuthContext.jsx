import { Children, createContext, useContext } from "react";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate } from "react-router-dom";

export const AuthContext =  createContext({});

const client = axios.create( {
    baseUrl:"localhost:3000/api/v1/users"
})


export const AuthProvider = ({Children}) => {

    const authContext = useContext(AuthContext);

    const [ userData, setUserData] =  useState(authContext);

    const handleRegister = async (name,username, password ) => {
        try {
            let request  = await client.post("/register", {
                name:name,
                username:username,
                password:password
            })
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }

        }
        catch (err) { 
            throw err;

        }
    }
    const router = useNavigate();

    const data = {
        userData,setUserData,handleRegister
    }
     return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
     )
}