import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

function Sidebar() {
  return (
    <div className='flex flex-col items-center border-r-1 border-gray-300 min-h-full pt-6'>

        <NavLink end={true} to='/admin' className={({isActive}) => `hover:scale-110 transition-all duration-300 flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
            ${isActive && 'bg-emerald-200 border-r-8 border-emerald-700 rounded'}`}>
            <img src={assets.home_icon} alt="" className='w-5 min-w-4'/>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/addBlog' className={({isActive}) => `hover:scale-110 transition-all duration-300 flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
            ${isActive && 'bg-emerald-200 border-r-8 border-emerald-700 rounded'}`}>
            <img src={assets.add_icon} alt="" className='w-5 min-w-4'/>
            <p className='hidden md:inline-block'>Add blogs</p>
        </NavLink>

        <NavLink to='/admin/listBlog' className={({isActive}) => `hover:scale-110 transition-all duration-300 flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
            ${isActive && 'bg-emerald-200 border-r-8 border-emerald-700 rounded'}`}>
            <img src={assets.list_icon} alt="" className='w-5 min-w-4'/>
            <p className='hidden md:inline-block'>List blogs</p>
        </NavLink>

        <NavLink to='/admin/comments' className={({isActive}) => `hover:scale-110 transition-all duration-300 flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
            ${isActive && 'bg-emerald-200 border-r-8 border-emerald-700 rounded'}`}>
            <img src={assets.comment_icon} alt="" className='w-5 min-w-4'/>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
  )
}

export default Sidebar