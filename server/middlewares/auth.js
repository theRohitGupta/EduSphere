const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try{
        // EXTRACT TOKEN
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // if TOKEN MISSING
        if(!token){
            return res.status(401).json({
                success : false,
                message : "TOKEN IS MISSING"
            })
        }

        // VERIFY TOKEN
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        }catch(err){
            // VERIFICATION ISSUE
            return res.status(401).json({
                success : false,
                message : "TOKEN IS INVALID",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "SOMETHING WENT WRONG WHILE VALIDATING THWE TOKEN"
        })
    }
}
 

// isStudent
exports.isStudent = async(req, res, next) => {
    try{    
        if(req.user.accountType !== "student"){
            return res.status(401).json({
                success : false,
                message : "SORRY THIS IS A Student ONLY ROUTE"
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "USER STUDENT ROLE CANT BE VERIFIED.....VERIFICATION FAILED"
        })
    }
}

// isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "instructor"){
            return res.status(401).json({
                success : false,
                message : 'SORRY THIS IS A INSTRUCTOR ONLY ROUTE'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "USER INSTRUCTOR ROLE CANT BE VERIFIED.....VERIFICATION FAILED",
            err : err.message
        })
    }
}


// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "admin"){
            return res.status(401).json({
                success : false,
                message : "SORRY THIS IS AN ADMIN ONLY ROUTE"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "USER ADMIN ROLE CANT BE VERIFIED.....VERIFICATION FAILED",
            err : err.message
        })
    }
}