import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token Not Found"
            })
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded_token){
            return res.status(400).json({
                success: false,
                message: "Token Not Found"
            })
        }

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export default auth;