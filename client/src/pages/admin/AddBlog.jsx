import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked'

function AddBlog() {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false) //adding effect
  const [loading, setLoading] = useState(false) //loading effect in generate content with ai

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
      try {
        if(!title) return toast.error('Please enter your title')
        
        setLoading(true)

        const response = await axios.post(`/api/blog/generate-content`, {prompt: title})

        if(response.data.success){
          quillRef.current.root.innerHTML = parse(response.data.content)
        }
        else{
          toast.error(response.data.message)
        }

      } catch (error) {
          toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);

      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const response = await axios.post(`/api/blog/add`, formData);

      if(response.data.success){
        toast.success(response.data.message);
        setImage(false)
        setTitle("")
        setSubTitle("")
        quillRef.current.root.innerHTML = ""
        setCategory('')
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsAdding(false)
    }
  }

  useEffect(() => {
      //Initialise Quill only once
      if(!quillRef.current && editorRef.current){
          quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
      }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-emerald-200/10 text-gray-600 h-full overflow-scroll'>

      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow sm:m-10 rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <input type="file" id='image' hidden onChange={(e) => setImage(e.target.files[0])} />
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='cursor-pointer mt-2 h-16' />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full p-2 max-w-lg mt-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title}/>

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full p-2 max-w-lg mt-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={subTitle}/>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            {/* editor  */}
            <div ref={editorRef}>
            </div>
            {
              loading && (
                <div className='absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center bg-black/10 mt-2'>
                  <div className='w-8 h-8 rounded-full border-2 animate-spin border-t-white'>

                  </div>
                </div>
              )
            }

            <button disabled={loading} type='button' onClick={generateContent}
            className='absolute bottom-1 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog category</p>        
        <select onChange={(e) => setCategory(e.target.value)} name="category" className='px-4 py-2 mt-2 border] text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select category</option>
          {
            blogCategories.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })
          }
        </select>

        <div className='flex items-center gap-2 mt-4'>
          <p className=''>Publish Now</p> 
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e) => setIsPublished(e.target.checked)}/>
        </div>

        <button disabled={isAdding} className='mt-4 bg-emerald-700 text-white px-6 py-2 hover:scale-110 transition-all duration-200 hover:bg-emerald-400 cursor-pointer text-sm' type='submit'>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>

    </form>
  )
}

export default AddBlog