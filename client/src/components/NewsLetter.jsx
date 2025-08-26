import React from 'react'

function NewsLetter() {
    return (
        <div className='flex flex-col items-center sm:w-full px-4'>
            <h1 className='text-3xl font-semibold mb-3 text-center'>
                Never Miss a Blog!
            </h1>
            <p className='text-gray-500 mb-5 text-center'>
                Subscribe to get the latest blog, new tech, and exclusive news
            </p>

            <form className='mb-10 flex w-full max-w-2xl'>
                {/* Input */}
                <input
                    type="email"
                    placeholder='Enter your email'
                    required
                    className='flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:border-emerald-400'
                />

                {/* Button */}
                <button
                    type="submit"
                    className='px-6 md:px-12 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-r-lg transition-all'
                >
                    Subscribe
                </button>
            </form>
        </div>

    )
}

export default NewsLetter