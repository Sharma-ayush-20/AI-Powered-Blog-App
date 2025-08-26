import React from 'react'
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog }) {

    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/blog/${_id}`)}
            className="w-full rounded overflow-hidden shadow-md hover:scale-103 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 ease-in-out cursor-pointer"
        >
            <img
                src={image}
                alt="blogImage"
                className="aspect-video w-full object-cover"
            />

            <span className="ml-5 mt-4 px-3 py-1 inline-block bg-gradient-to-r from-emerald-200 to-emerald-400 rounded-2xl text-xs font-medium shadow-sm">
                {category}
            </span>

            <div className="p-5">
                <h5 className="mb-2 font-semibold text-gray-900 line-clamp-2">{title}</h5>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
            </div>
        </div>

    )
}

export default BlogCard