import React from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'


function Navbar() {
    const {navigate, token} = useAppContext();
    return (
        <div className="px-6 sm:px-18 py-4 w-full flex flex-wrap items-center justify-between shadow-md bg-emerald-100/40">
            {/* left side */}
            <div>
                <div className="cursor-pointer w-32 sm:w-48">
                    <img 
                        src={assets.logo} 
                        alt="logo" 
                        className="w-full h-auto hover:scale-110 transition-all duration-200" 
                        onClick={() => navigate('/')} 
                    />
                </div>
            </div>

            {/* right side */}
            <ul className="flex gap-5 text-[16px] sm:text-[18px] font-medium mt-4 sm:mt-0 mb-2 sm:mb-0 text-black">
                
                {/* Home */}
                <li 
                    onClick={() => navigate('/')} 
                    className="group cursor-pointer relative px-5 py-2 transition-colors duration-300 ease-in-out"
                >
                    Home
                    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
                </li>

                {/* Login */}
                <li 
                    onClick={() => navigate('/admin')} 
                    className="group cursor-pointer relative flex items-center gap-2 px-5 py-2 transition-colors duration-300 ease-in-out"
                >
                    {token ? 'Dashboard' : 'Login'}
                    <img src={assets.arrow} alt="arrow" className="w-4 h-4 invert" />
                    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
