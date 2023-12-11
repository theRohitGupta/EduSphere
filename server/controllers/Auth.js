const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
const passwordUpdated = require('../mail/templates/passwordUpdated');
const userCreated = require("../mail/templates/userCreated");


// SEND OTP
exports.sendOTP = async (req, res) => {
    try{
        // FETCH EMAIL FROM REQ BODY
        const { email } = req.body;

        // CHECK IF USER ALREADY EXISTS
        const checkUserPresent = await User.findOne({email});

        // IF USER EXISTS, THE RETURN RESPONSE
        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "USER ALREADY REGISTERED"
            })
        }

        // GENERATE OTP
        let checkOtpExists;
        do{
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            });
            // console.log("OTP GENERATED : ", otp);
            checkOtpExists = await OTP.findOne({otp: otp});
            // console.log("result", checkOtpExists);
        }while(checkOtpExists);

        const otpPayload = {email, otp};

        // CREATE DB ENTRY
        const otpBody = await OTP.create(otpPayload);
        // console.log("OTP BODY",otpBody);

        // RETURN RESPONSE
        res.status(200).json({
            success : true,
            message : "OTP SENT SUCCESSFULLY",
            otp
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}


// SIGNUP

exports.signUp = async (req, res) => {
    try{
        // DATA FETCH FROM BODY
        const {
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword, 
            accountType, 
            contactNumber, 
            otp
        } = req.body;

        // VALIDATE
        if(!firstName || !lastName || !email ||!password ||!confirmPassword ||!otp){
            return res.status(403).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // PASSWORDS MATCH
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "PASSWORD AND CONFIRM PASSWORD VALUE DO NOT MATCH",
            })
        }

        // CHECK IF USER EXISTS
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "USER ALREADY EXISTS... PLEASE LOGIN",
            })
        } 

        // FIND MOST RECENT OTP
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // console.log(recentOtp);

        // VALIDATE OTP
        if(recentOtp.length === 0){
            // OTP not found
            return res.status(400).json({
                success : false,
                message : "OTP NOT FOUND"
            })
        }else if(otp !== recentOtp[0].otp){
            // INVALID OTP
            return res.status(400).json({
                success : false,
                message : "INVALID OTP",
            })
        }

        // HASHING PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE THE USER
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // CREATE PROFILE
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            contactNumber : null,
            about : null,
        });

        // CREATE ENTRY OF USER IN DB
        const user = await User.create({
            firstName,
            lastName, 
            email, 
            contactNumber, 
            password : hashedPassword,
            accountType : accountType,
            approved : approved,
            additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        const mailResponse = await mailSender(email, "Verification Email From EduSphere ", userCreated(`${user.firstName} ${user.lastName}`));
        // console.log("EMAIL SENT SUCCESSFULLY: ", mailResponse.response);

        return res.status(200).json({
            success :  true,
            message :  "USER IS REGISTERED SUCCESFULLY",
            user
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "USER CANT BE REGISTERED. PLEASE TRY AGAIN",
            err : err.message
        })
    }

}



// LOGIN
exports.login = async (req, res) => {
    try{
        // GET DATA FROM REQ BODY
        const {email, password} = req.body;

        // VALIDATION DATA
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // CHECK USER EXIST OR NOT
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success : false,
                message : "USER IS NOT REGISTERED"
            })
        }
        
        // GENERATE JWT, AFTER PASSWORD MATCHING
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : "24h" });

            // SAVE TOKEN TO USER IN DB
            user.token = token;
            user.password = undefined;

            // CREATE COOKIE AND SEND RESPONSE
            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "LOGGED IN SUCCESSFULLY"
            })
        }else{
            return res.status(401).json({
                success : false,
                message : "PASSWORD IS INCORRECT",
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "LOGIN FAILURE, PLEASE TRY AGAIN"
        })
    }
}


// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try{
        // GETTING USER DATA FROM REQ.USER
        const userDetails = await User.findById(req.User.id);

        // GETTING DATA FROM REQ BODY
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        // VALIDATION

        // NONE FIELDS ARE EMPTY CHECK
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // VALIDATE OLD PASWORD
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password)
        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "The Password is incorrect"
            })
        }

        // CHECK if NewPassword ansd confirmNewPassword are diffeent
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success : false,
                message : "NEW PASSWORD AND CONFIRM NEW PASSWORD DO NOT MATCH"
            })
        }

        // CHECK IF NEW PASSWORD IS EQUAL TO OLD PASSWORD
        if(newPassword == oldPassword){
            return res.status(401).json({
                success : false,
                message : "OLD PASSWORD AND NEW PASSWORD MUST NOT BE SAME"
            })
        }

        // HASHING NEW PASSWORD 
        const hashedPassword = await bcrypt(newPassword, 10);

        // UPDATE PASSWORD IN DB
        const userUpdated = await User.findByIdAndUpdate(req.user.id,{password : hashedPassword}, {new : true});

        // SENDING MAIL
        try{
            const emailResponse = await mailSender(userUpdated.email, "PASSWORD CHANGED", passwordUpdated(userUpdated.email, `Password updated successfully for ${userUpdated.firstName} ${userUpdated.lastName}`));
            // console.log('EMAIL SENT SUCCESSFULLY', emailResponse.response);
        }catch(err){
            console.log("ERROR OCCURED WHILE SENDING EMAIL",err);
            return res.status(500).json({
                success : false,
                message : "ERROR OCCURRED WHILE SENDING EMAIL",
                error : err.message
            })
        }

        return res.status(200).json({
            success : true,
            message : "PASSWORD CHANGED"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "PASSWORD CHANGING FAILED",
            error : err.message
        })
    }
}

