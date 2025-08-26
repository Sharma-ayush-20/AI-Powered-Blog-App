import jwt from "jsonwebtoken"
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your credentials"
            })
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//API for admin dashboard data
export const getAllBlogsAdmin = async (req, res) => {
    try {

        const blogs = await blogModel.find({}).sort({createdAt: -1});

        if (!blogs) {
            return res.status(400).json({
                success: false,
                message: 'No Blog found'
            })
        }

        return res.status(200).json({
            success: true,
            blogs,
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get all comments with blog data
export const getAllComments = async (req, res) => {
    try {

        const comments = await commentModel.find({}).populate("blog").sort({createdAt: -1})

        if(!comments){
            return res.status(400).json({
                success: false,
                message: 'No Comment found'
            })
        }

        return res.status(200).json({
            success: true,
            comments,
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//All analytics of dashboard data
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await blogModel.find({}).sort({createdAt: -1}).limit(5)

        const blogs = await blogModel.countDocuments();

        const comments = await commentModel.countDocuments();

        const drafts = await blogModel.countDocuments({isPublished: false});

        const dashboardData = {
            blogs, comments, drafts, recentBlogs,
        }

        return res.status(200).json({
            success: true,
            dashboardData
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//comment delete 
export const deleteCommentById = async (req, res) => {
    try {
        
        const {id} = req.body;

        await commentModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Comment deleted SuccessFully",
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//comment approved
export const approveCommentById = async (req, res) => {
    try {
        
        const {id} = req.body;

        await commentModel.findByIdAndUpdate(id, {isApproved: true});

        return res.status(200).json({
            success: true,
            message: "Comment approved SuccessFully",
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}