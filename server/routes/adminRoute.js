import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middlewares/auth.js"

const adminRouter = express.Router();

adminRouter.route("/login").post(adminLogin)
adminRouter.route("/comments").get(auth, getAllComments)
adminRouter.route("/blogs").get(auth, getAllBlogsAdmin)
adminRouter.route("/delete-comment").post(auth, deleteCommentById)
adminRouter.route("/approve-comment").post(auth, approveCommentById)
adminRouter.route("/dashboard").get(auth, getDashboard)

export default adminRouter;