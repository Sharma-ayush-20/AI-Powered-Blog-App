import fs from 'fs';
import imagekit from '../config/imageKit.js';
import blogModel from '../models/blogModel.js';
import commentModel from '../models/commentModel.js';
import main from '../config/gemini.js';

//add a blog
export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all fields are present
        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        //Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer, //path of file
            fileName: imageFile.originalname, //original name of the file
            folder: "/blogs"
        })

        //optimization through imageKit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },  //Auto Compression
                { format: 'webp' },  //convert to modern format
                { width: '1280' }   // Width resizing
            ]
        })

        const image = optimizedImageUrl;

        await blogModel.create({ title, subTitle, description, category, image, isPublished })

        return res.status(200).json({
            success: true,
            message: 'Blog added successFully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//all blog data having published is true
export const getAllBlogs = async (req, res) => {
    try {

        const blogs = await blogModel.find({ isPublished: true })

        if (!blogs) {
            return res.status(400).json({
                success: false,
                message: 'No blog found'
            })
        }

        return res.status(200).json({
            success: true,
            blogs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//individual blog data
export const getBlogById = async (req, res) => {
    try {

        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({
                success: false,
                message: 'No blog found'
            })
        }

        const blog = await blogModel.findById(blogId)

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: 'No blog found'
            })
        }

        return res.status(200).json({
            success: true,
            blog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//delete a particular blog
export const deleteBlogById = async (req, res) => {
    try {

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No blog found'
            })
        }

        await blogModel.findByIdAndDelete(id)

        //delete all comments associated with the blog

        await commentModel.deleteMany({ blog: id })

        return res.status(200).json({
            success: true,
            message: "Blog deleted SuccessFully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const togglePublish = async (req, res) => {
    try {

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No blog found'
            })
        }

        const blog = await blogModel.findById(id)

        blog.isPublished = !blog.isPublished;

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog Status Updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// add comments 
export const addComment = async (req, res) => {
    try {

        const { blog, name, content } = req.body;

        if (!blog || !name || !content) {
            return res.status(400).json({
                success: false,
                message: "Missing details"
            })
        }

        await commentModel.create({ blog, name, content });

        return res.status(200).json({
            success: true,
            message: "Comment added for review"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//particular comment data
export const getBlogComments = async (req, res) => {
    try {

        const { blogId } = req.body

        if (!blogId) {
            return res.status(400).json({
                success: false,
                message: "ID not found"
            })
        }

        const comments = await commentModel.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            comments
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const generateContent = async (req, res) => {
    try {

        const {prompt} = req.body;

        if(!prompt){
            return res.json({
                success: false,
                message: "No Prompt Found"
            })
        }

        const content = await main(prompt + ' Generate a blog content for this topic in simple text format')

        return res.json({
            success: true,
            content,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
