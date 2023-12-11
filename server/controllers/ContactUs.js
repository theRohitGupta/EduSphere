const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
    const { email, firstName, lastName, message, phoneNumber, countryCode } = req.body
    // console.log(req.body)
    try{
        const emailRes = await mailSender( email, "Your Message has Sent Successfully",contactUsEmail( email, firstName, lastName, message, phoneNumber, countryCode))
        // console.log("EMAIL RES", emailRes)
        return res.json({
            success : true,
            message : "Email Sent Successfully"
        })
    }catch(err){
        console.log(err)
        return res.json({
            success : false,
            message : "Something Went Wrong"
        })
    }
}