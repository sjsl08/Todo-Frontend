import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";



const AuthorizationContext = createContext("");

export const AuthorizationContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState("")


    useEffect(() => {
        isloggedin()
    }, [])


    const isloggedin = async () => {
        try {
            //console.log(sessionStorage.getItem("token"));
            //console.log("islogin");

            const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }

            const res = await axios.post("https://mytodoapp-9xnh.onrender.com/auth/isloggedin", null, { headers })

            const data = await res.data
            //console.log(data);
            setUser(data[0])
            //console.log(data[0]);
            navigate(location.pathname ? location.pathname : "/");
            // setUser(await res.data.user)
            // //console.log(user);

            navigate("/", { replace: true })

        } catch (error) {

            navigate("/login")
            //console.log(error);
        }
    }

    const login = async (userData) => {
        toast.success("logging in")
        if (sessionStorage.getItem("token")) {
            navigate("/")
        }

        try {
            const res = await axios.post("https://mytodoapp-9xnh.onrender.com/auth/login", userData)
            setUser(await res.data.user)

            sessionStorage.setItem("token", await res.data.token)
            //console.log("done");
            navigate("/", { replace: true })

        } catch (error) {
            toast.error(error.response.data.error)
            // //console.log(error.response.data.error);
        }
    }
    const signup = async (userData) => {
        if (sessionStorage.getItem("token")) {
            navigate("/")
        }

        try {
            const res = await axios.post("https://mytodoapp-9xnh.onrender.com/auth/signup", userData)

            // //console.log(res.data);
            navigate("/login", { replace: true })
            toast.success(`Account Created Successfully.`)

        } catch (error) {
            toast.error(error.response.data.errors[0].msg)
            // //console.log(error);
        }
    }




    return (
        <AuthorizationContext.Provider value={{ user, setUser, login, signup }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export default AuthorizationContext;