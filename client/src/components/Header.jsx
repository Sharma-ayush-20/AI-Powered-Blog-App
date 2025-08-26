import React from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

function Header() {

    const {input, setInput} = useAppContext()

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div>

            {/* first section  */}
            <div className="flex justify-center mt-8 sm:mt-8">
                <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-black/20 backdrop-blur-md bg-emerald-100/60 shadow-md">
                    <p className="font-medium text-gray-800">New: AI feature integrated</p>
                    <img src={assets.star_icon} alt="" className="w-5 h-5" />
                </div>
            </div>
            {/* second section  */}
            <div className='flex justify-center mt-5'>
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    Your own <span className="hover:scale-110 transition-all duration-300 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                        blogging
                    </span>{" "} <br />platform.
                </h1>
            </div>
            {/* third section */}
            <div className="flex justify-center px-4 font-medium text-emerald-200">
                <p className="my-1 sm:my-2 max-w-2xl text-center text-gray-600 leading-relaxed text-sm sm:text-lg bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                    This is your space to think out loud, to share what matters, and to write without <br className="hidden lg:block" /> filters.
                    Whether it’s one word or a thousand, your story starts right here.
                </p>
            </div>

            {/* fourth section  */}
            <div className="flex justify-center px-4">
                <form onSubmit={onSubmitHandler} className="flex sm:w-full max-w-xl relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Search for blogs"
                        required
                        className="flex-1 pl-4 pr-20 py-2 border border-gray-300 rounded-lg outline-none 
      focus:ring-1 focus:ring-emerald-600 text-sm sm:text-base"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-700 px-4 py-1.5 
      rounded-md hover:bg-emerald-800 transition cursor-pointer text-white text-sm sm:text-base"
                    >
                        Search
                    </button>
                </form>
            </div>




        </div>
    )
}

export default Header