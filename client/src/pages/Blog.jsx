import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data, comments_data, assets } from '../assets/assets.js';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

function Blog() {

  const { blogs, axios } = useAppContext()

  const { id } = useParams();
  const [data, setData] = useState(null);

  const [comments, setComments] = useState([])

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/blog/${id}`)
      if (response.data.success) {
        setData(response.data.blog)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await axios.post(`/api/blog/comments`, { blogId: id })
      if (response.data.success) {
        setComments(response.data.comments)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/blog/add-comment`, { blog: id, name, content })
      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setContent("")
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ?
    (
      <div>

        {/* navbar */}
        <Navbar />


        <div className="flex flex-col items-center mt-10 text-center space-y-3">
          {/* Date */}
          <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-green-500 text-white px-4 py-1 rounded-full shadow-md">
            Published on {moment(data.createdAt).format("MMMM Do, YYYY")}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight max-w-3xl">
            {data.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-lg text-gray-600 max-w-2xl italic">
            {data.subTitle}
          </h2>

          {/* Author */}
          <p className="text-gray-800 font-semibold bg-emerald-100 px-4 py-1">Michael Brown</p>
        </div>

        <div className='my-10 mx-5 max-w-5xl md:mx-auto mt-6'>
          <img src={data.image} alt="" className='rounded-xl mb-5' />

          {/* Description */}
          <div
            className="rich-text mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* comment section  */}
          <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='text-lg font-semibold mb-6'>
              Comments ({comments.length})
            </p>

            <div className='space-y-6'>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className='bg-white shadow-md rounded-xl p-4 border border-gray-200'
                  >
                    {/* User Info */}
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center space-x-3'>
                        <img
                          src={assets.user_icon}
                          alt={comment.name}
                          className='w-8 h-8 rounded-full border border-gray-300'
                        />
                        <p className='font-medium text-gray-800'>{comment.name}</p>
                      </div>
                      <span className='text-sm text-gray-500'>
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>

                    {/* Comment Text */}
                    <p className='text-gray-700 leading-relaxed'>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 italic'>
                  No comments yet. Be the first one!
                </p>
              )}
            </div>

          </div>

          {/* add comment box */}
          <div className='mx-auto max-w-3xl'>
            <p className='font-semibold mb-4 text-xl'>Add your comment</p>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              {/* Name input */}
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                // name="name"
                placeholder='Name'
                required
                className='w-full outline-none border border-gray-400 rounded-lg px-4 py-2 focus:border-emerald-500'
              />

              {/* Comment textarea */}
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                // name="comment"
                rows={5}
                placeholder='Add your comment...'
                required
                className='w-full outline-none border border-gray-400 rounded-lg px-4 py-2 focus:border-emerald-500'
              ></textarea>

              {/* Submit button */}
              <button
                type="submit"
                className='bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg transition'
              >
                Add Comment
              </button>
            </form>
          </div>

          {/* share buttons  */}
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="text-lg font-semibold ">
              Share this article on social media
            </p>

            <div className="flex gap-4 mt-4">
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                width={45}
                className="cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out rounded-full shadow-md hover:shadow-lg"
              />
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                width={45}
                className="cursor-pointer hover:scale-110 hover:-rotate-6 transition-all duration-300 ease-in-out rounded-full shadow-md hover:shadow-lg"
              />
              <img
                src={assets.googleplus_icon}
                alt="Google Plus"
                width={45}
                className="cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out rounded-full shadow-md hover:shadow-lg"
              />
            </div>
          </div>

        </div>

        <Footer />

      </div>
    )
    : (
      <div>
        <Loader />
      </div>
    )
}

export default Blog