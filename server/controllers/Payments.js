const { default: mongoose, Mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async(req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(404).json({
            success : false,
            message : "PLEASE PROVIDE COURSE ID"
        })
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(400).json({
                    success : false,
                    message : "COULD NOT FIND COURSE"
                })
            }

            // console.log(userId)
            const uid = new mongoose.Types.ObjectId(userId);
            // console.log(uid)
            if(course.studentsEnrolled.includes(uid)){
                return res.status(300).json({
                    success : false,
                    message : "STUDENT IS ALREADY ENROLLED"
                })
            }
            totalAmount += course.price;
        }catch(err){
            console.error(err)
            return res.status(500).json({
                success : false,
                message : err.message
            })
        }
    }

    const options = {
        amount : totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create({
            amount : totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        });
        // console.log(paymentResponse)
        res.json({
            success : true,
            message : paymentResponse
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "COULD NOT INITIATE ORDER"
        })
    }
}

exports.verifyPayment = async(req, res) => {
    // console.log(req.body);
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(404).json({
            success : false,
            message : "PAYMENT FAILED, DUE TO MISSING OR INVALID DETAILS"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
                                .createHmac("sha256", process.env.RAZORPAY_SECRET)
                                .update(body.toString())
                                .digest("hex");
                
    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success : true,
            message : "Payment Completed and Verified"
        })
    }
    return res.status(500).json({
        success : false,
        message : "PAYMENT FAILED"
    })
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Missing COURSES OR USER ID",
        });
    }

    try {
        for (const courseId of courses) {
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "COURSE NOT FOUND",
                });
            }

            const courseProgressDetails = await CourseProgress.create({
                courseId: courseId,
                userId : userId,
                completedVideos: [],
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId, courseProgress : courseProgressDetails._id } },
                { new: true }
            );

            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "USER NOT FOUND",
                });
            }

            // CONFIRMATION MAIL SEND
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );
        }

        // return res.status(200).json({
        //     success: true,
        //     message: "STUDENT ENROLLED IN ALL COURSES PROVIDED",
        // });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success : false,
            message : "ALL DETAILS ARE MANADATORY"
        })
    }

    try{
        const userDetails = await User.findById(userId);
        const emailResponse = await mailSender(userDetails.email,"Your Payment is Successfull",paymentSuccessEmail(`${userDetails.firstName} ${userDetails.lastName}`, amount/100 ,orderId, paymentId));   
        // return res.status(200).json({
        //     success : true,
        //     message : "PAYMENT SUCCESSFULL EMAIL SENT"
        // }) 
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "PAYMENT SUCCESS MAIL COULD NOT BE SENT"
        })
    }
}

