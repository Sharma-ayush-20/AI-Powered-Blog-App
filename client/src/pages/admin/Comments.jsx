import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets.js';
import CommentTableItem from '../../components/admin/CommentTableItem.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

function Comments() {
  const [comments, setComments] = useState([]); //all comments
  const [filter, setFilter] = useState('Not Approved'); //filter approved and not approved comments

  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/admin/comments`)
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


  useEffect(() => {
    fetchComments();
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-emerald-200/10'>

      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={() => setFilter('Approved')} className={`hover:scale-110 transition-all duration-200 shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === 'Approved' ? 'text-black bg-emerald-300 border-gray-100' : 'text-gray-700'}`}>Approved</button>
          <button onClick={() => setFilter('Not Approved')} className={`hover:scale-110 transition-all duration-200 shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === 'Not Approved' ? 'text-black bg-emerald-300 border-gray-100' : 'text-gray-700'}`}>Not Approved</button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>

        <table className='w-full text-sm text-gray-500'>

          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog title & comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              comments
                .filter((comment) => {
                  if (filter === "Approved") {
                    return comment.isApproved === true
                  }
                  return comment.isApproved === false
                })
                .map((comment, index) => (
                  <CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} index={index + 1} />
                ))
            }
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Comments