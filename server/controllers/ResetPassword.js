const { passwordChangeLink } = require("../mail/templates/passwordChangeLink");
const { passwordUpdated } = require("../mail/templates/passwordUpdated");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// RESET PASSWORD TOKEN
exports.resetPasswordToken = async(req,res) => {
    try{
        // GET EMAIL FROM REQ BODY
        const email = req.body.email;

        // CHECK IF USER EXISTS
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(403).json({
                success : false,
                message : "YOUR EMAIL IS NOT REGISTERED"
            })
        }

        // GENERATE TOKEN
        const token = crypto.randomBytes(20).toString("hex");

        // UPDATE USER BY ADDING TOKEN AND EXPIRY
        const updatedDetails = await User.findOneAndUpdate(
            {email : email},
            {
                token : token,
                resetPasswordExpires : Date.now() + 15 * 60 * 1000,
            },
            {new : true});

        // console.log("DETAILS", updatedDetails);
        // CREATE URL
        const url = `http://localhost:3000/update-password/${token}`

        // SEND MAIL
        await mailSender(email, "Password Reset Link", passwordChangeLink(email,`${updatedDetails.firstName} ${updatedDetails.lastName}`,url));

        return res.status(200).json({
            success : true,
            message : "Email Sent Successfully, Please Check your Mail"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something Went Wrong in Sending reset password mail",
            err : err.message
        })
    }

}

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try{
        // DATA FETCH
        const { password , confirmPassword, token } = req.body;

        if(!token){
            return res.status(401).json({
                success : false,
                message : "TOKEN NOT FOUND"
            });
        }

        if(!password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            });
        }

        // VALIDATION
        if(password !== confirmPassword) {
            return res.status(400).json({
                success : false,
                message : "PASSWORD NOT MATCHING"
            });
        }

        // GET USERDETAILS FROM DB USING TOKEN
        const userDetails = await User.findOne({token : token});

        // IF NO ENTRY FOUND
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : "TOKEN INVALID"
            })
        }

        // TOKEN TIME CHECK
        if( userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success : false,
                message : "TOKEN IS EXPIRED, PLEASE REGENERATE TOKEN"
            })
        }

        // CHECK IF OLD PASSWORD = NEW PASSWORD
        // console.log(userDetails);
        // console.log(password);
        const isPasswordMatch = await bcrypt.compare(password, userDetails.password)
        if(isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "OLD AND NEW PASSWORD IS SAME"
            })
        }

        // PASSWORD HASHING
        const hashedPassword = await bcrypt.hash(password, 10);

        // PASSWORD UPDATE IN DB
        await User.findOneAndUpdate(
            {token : token},
            {password : hashedPassword},
            {new : true}
        );

        // SEND MAIL
        await mailSender(userDetails.email, "Password Updated", passwordUpdated(userDetails.email,`${userDetails.firstName} ${userDetails.lastName}`));

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "Password Changed Sucessfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Password changing Failed",
            err : err.message
        })
    }
}