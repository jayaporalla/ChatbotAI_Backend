const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const isAuth = [
    async (req, res, next) => {
        try {
            const token = req.headers.token;

            if(!token){
                res.status(403).json({
                    message: "Please login"
                })
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode._id);

            next();
        } catch (error) {
            res.status(500).json({
                message: "Login first"
            })
        }
    }
]

module.exports = isAuth;