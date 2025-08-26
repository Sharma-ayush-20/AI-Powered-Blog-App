import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish, } from '../controllers/blogController.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

const blogRouter = express.Router();

blogRouter.route("/add").post(upload.single('image'),auth, addBlog)
blogRouter.route("/all").get(getAllBlogs)
blogRouter.route("/:blogId").get(getBlogById)
blogRouter.route("/delete").post(auth, deleteBlogById)
blogRouter.route("/toggle-publish").post(auth, togglePublish)

//comments
blogRouter.route("/add-comment").post(addComment)
blogRouter.route("/comments").post(getBlogComments)

//content generation with ai
blogRouter.route("/generate-content").post(auth, generateContent)

export default blogRouter;