import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

function Layout() {

    const { axios, navigate, setToken} = useAppContext()

    const logout = async () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }

    return (
        <>
            {/* Navbar  */}
            <div className='flex items-center justify-between px-8 py-4 h-[70px] sm:px-12 border-b border-gray-300'>
                <img src={assets.logo} alt="" className='cursor-pointer w-32 sm:w-40 hover:scale-110 transition-all duration-300 '
                onClick={() => navigate('/')} />
                <button className='font-bold px-6 py-3 sm:px-12 sm:py-3.5 bg-emerald-700 text-white hover:bg-emerald-400 hover:text-black cursor-pointer transition-all duration-300 rounded'
                onClick={logout}>Logout</button>
            </div>

            {/* Main Content*/}
            <div className='flex h-[calc(100vh-70px)]'>
                {/* sidebar */}
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout