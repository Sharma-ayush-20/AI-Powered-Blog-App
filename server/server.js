import express from "express";
import 'dotenv/config';
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import blogRouter from "./routes/blogRoute.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)

//Home Routes
app.get("/", (req, res) => {
    res.send("<h1>API Working</h1>")
})

const PORT = process.env.PORT || 3000;

await connectDB()
    .then(() => {
        console.log(`Database Connected SuccessFully!!`);
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error in Connection of database ", error.message);
    })


export default app;
