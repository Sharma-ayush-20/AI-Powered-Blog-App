import React, { useEffect, useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

function BlogList() {

    const [menu, setMenu] = useState("All")
    const {blogs, input} = useAppContext()

    //filtered blog data using search bar
    const filteredBlogs = () => {
        if(input === ""){
            return blogs
        }else{
            return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()))
        }
    }

    return (
        <div>
            {/* blog list  */}
            <div className='flex justify-center mt-5 items-center gap-4 sm:gap-10 relative'>
                {
                    blogCategories.map((item) => (
                        <div key={item} className='relative'>
                            <button
                                onClick={() => setMenu(item)}
                                className={`cursor-pointer text-black ${menu === item && 'px-4 pt-0.5'}`}>
                                {item}
                                {
                                    menu === item && <motion.div layoutId='underline'
                                    transition={{type: 'spring', stiffness: 500, damping: 30}}
                                    className='absolute inset-0 left-0 right-0 top-0 h-7 -z-1 bg-emerald-200 rounded-full'>
                                    </motion.div>
                                }
                            </button>
                        </div>
                    ))
                }
            </div>

            {/* blog cards  */}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-18 mx-8 sm:mx-16 xl:mx-40 mt-10'>
                {
                    filteredBlogs()
                    .filter((blog) => menu === 'All' ? true : blog.category.toLowerCase() === menu.toLowerCase())
                    .map((blog) => <BlogCard key={blog._id} blog={blog}/>)
                }
            </div>

        </div>
    )
}

export default BlogList