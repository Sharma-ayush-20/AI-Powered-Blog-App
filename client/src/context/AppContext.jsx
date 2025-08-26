import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext(null)

export const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null); //token
    const [blogs, setBlogs] = useState([]); //all blog data
    const [input, setInput] = useState(""); //all input value for search bar

    //fetch all blogs data from the database
    const fetchBlogs = async () => {
        try {

            const response = await axios.get('/api/blog/all');

            if (response.data.success) {
                setBlogs(response.data.blogs)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}` //default token are present in header
        }
    }, [])

    const value = {
        axios,
        navigate,
        token, setToken,
        blogs, setBlogs,
        input, setInput,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

//custom hooks
export const useAppContext = () => useContext(AppContext)
