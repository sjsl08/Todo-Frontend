import { createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext("");


export const ToastContextProvider = ({ children }) => {

    return (
        <ToastContext.Provider value={{toast}}>
            <ToastContainer autoClose={500} position={"top-center"} theme={"dark"} />
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext;