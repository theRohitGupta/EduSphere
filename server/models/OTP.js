const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 900 //15 * 60
    }
});

// FUNCTION FOR SENDING MAILS
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email From EduSphere ", emailTemplate(otp));
        // console.log("EMAIL SENT SUCCESSFULLY: ", mailResponse.response);
    }catch(err){
        console.log("ERROR OCCURED WHILE SENDING MAILS: ", err);
        throw err;
    }
}

// PRE MIDDLEWARE
OTPSchema.pre("save", async function(next){
    // console.log("New document saved to database");

    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);