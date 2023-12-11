const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdated");
const bcrypt = require("bcrypt");
const { convertSecondsToDuration } = require("../utils/totalDuration");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
    try{
        // FETCH DATA
        const {firstName, lastName="",dateOfBirth="", about="", contactNumber, gender=""} = req.body;

        // GET USER ID
        const id = req.user.id;

        // FIND PROFILE
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // UPDATE PROFILE
        if(!firstName){
            return res.status(404).json({
                success: false,
                message: "FIRST NAME IS COMPULSORY"
            })
        }
        userDetails.firstName = firstName
        if(lastName) userDetails.lastName = lastName;
        if(dateOfBirth) profileDetails.dateOfBirth = dateOfBirth;
        if(about) profileDetails.about = about;
        if(gender) profileDetails.gender = gender;
        if(contactNumber) profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        await userDetails.save();
        userDetails.additionalDetails = profileDetails

        // RETURN RES
        return res.status(200).json({
            success : true,
            message : "PROFILE UPDATED SUCCESSFULLY",
            data: userDetails
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "PROFILE UPDATION FAILED"
        })
    }
}

// DELETE ACCOUNT
exports.deleteProfile = async(req, res) => {
    try{
        // USER ID FIND
        const id = req.user.id;

        // VALIDATION
        const userDetails = await User.findById({_id : id});
        if(!userDetails){
            return res.status.json({
                success : false,
                message : "USER NOT FOUND"
            })
        }

        // USER DELETE
        // UNENROLL USER FROM ALL OTHER SCHEMAS
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        await User.findByIdAndDelete({_id : id});

        // RESPONSE
        return res.status(200).json({
            success : true,
            message : "USER DELETED SUCCESSFULLY"
        })
    }catch(err){
        console.log(err)
        return res.status(200).json({
            success : false,
            message : "USER DELETION FAILED",
            err : err.message
        })
    }
}


exports.getUserDetails = async(req, res) => {
    try{
        // FIND ID
        const id = req.user.id;

        // VALIDATION AND GET USER DETAILS
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "USER FETCHED SUCCESSFULLY",
            data : userDetails
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "USER DATA CAN'T BE FETCHED"
        })
    }

}

exports.updateDisplayPicture = async(req, res) => {
    // console.log("WELCOME")
    try{
        // FIND USER ID
        const userId = req.user.id;

        // REQ PROFILE PICTURE
        const image = req.files.dp;

        // console.log(userId,image);

        if(!userId){
            return res.status(404).json({
                success : false,
                message : "USER ID NOT FOUND"
            });
        }
        if(!image){
            return res.status(300).json({
                success : false,
                message : "DISPLAY PICTURE NOT FOUND"
            });
        }

        const updatedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);

        const updatedProfile = await User.findByIdAndUpdate(userId, {image : updatedImage.secure_url}, {new : true}).populate("additionalDetails").exec();

        return res.status(200).json({
            success : true,
            message : "USER DISPLAY PICTURE UPDATED",
            data : updatedProfile
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "USER PROFILE PICTURE CANNOT BE UPDATED"
        })
    }
}

exports.getEnrolledCourses = async(req, res) => {
    try{
        // REQ USER BODY
        const userId = req.user.id;

        if(!userId){
            return res.status(404).json({
                success : false,
                message : "USER ID NOT FOUND"
            });
        }

        const userEnrolledCourses = await User.findById(userId, {courses:true})
                                                                            .populate({
                                                                                path : "courses",
                                                                                populate : {
                                                                                    path : "courseContent",
                                                                                    populate : "subSection"
                                                                                }
                                                                            }).exec();
        // console.log(userEnrolledCourses)
        userDetails = userEnrolledCourses.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseId: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }

        return res.status(200).json({
            success : true,
            message : "USER ENROLLED COURSES",
            EnrolledCourses : userDetails.courses
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "STUDENTS ENROLLED COURSES NOT FOUND"
        })
    }
}

exports.updatePassword = async(req, res) => {
    try{
        // VALIDATION

        const { oldPassword, newPassword } = req.body;

        if(!oldPassword || !newPassword){
            return res.status(404).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        
        // CHECK OLD PASSWORD AND NEW PASSWORD SAME OR NOT
        if(oldPassword === newPassword){
            return res.status(403).json({
                success : false,
                message : "BOTH PASSWORD FIELDS CONTAIN SAME VALUE"
            })
        }

        // FIND USER
        const userId = req.user.id

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "USER NOT FOUND"
            })
        }



        // OLD PASSWORD CHECKING CORRECT OR NOT
        const isPassSame = await bcrypt.compare(oldPassword, user.password)
        if(isPassSame){

            // CHECK OLD PASSWORD AND NEW PASSWORD SAME OR NOT
            // WHY CHECKING AGAIN BECAUSE NOW WE HAVE CHECKED THAT OLD PASSWORD WAS CORRECT
            // THUS NEW PASSWORD CANT BE SAME
            if(oldPassword === newPassword){
                return res.status(403).json({
                    success : false,
                    message : "OLD AND NEW PASSWORD IS SAME"
                })
            }

            // CREATING NEW PASSWORD HASH
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // PASSWORD UPDATE IN DB
            await User.findByIdAndUpdate(userId,
                {password : hashedPassword},
                {new : true}
            );

            // SEND MAIL
            await mailSender(user.email, "Password Updated", passwordUpdated(user.email,`${user.firstName} ${user.lastName}`));

            // RETURN RESPONSE
            return res.status(200).json({
                success : true,
                message : "Password Changed Sucessfully"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Password changing Failed",
            err : err.message
        })
    }
}

exports.unEnrollCourse = async(req, res) => {
    try{
        const { courseId } = req.body
        const userId = req.user.id

        if(!courseId || !userId){
            return res.status(404).json({
                success : false,
                message : "Course/User Id is required"
            })
        }

        const courseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $pull : {studentsEnrolled : userId}
            },
            {new:true});

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Course Not Found"
            })
        }

        const userDetails = await User.findByIdAndUpdate(userId,
            {
                $pull : {courses : courseId}
            },
            {new:true})
            .populate("courses").populate("additionalDetails").exec();
        
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User Not Found"
            }) 
        }

        // RETURN RES
        return res.status(200).json({
            success : true,
            message : "Course Unenrolled SUCCESSFULLY",
            data: userDetails
        })        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Course Could not be unenrolled -> FAILED"
        })
    }
}

exports.instructorDashboard = async(req, res) => {
    try{
        const userId = req.user.id

        const courseDetails = await Course.find({instructor:userId})

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })

        res.status(200).json({
            success : true,
            message : "INSTRUCTOR COURSE DATA WITH STATS",
            data : courseData
        })

    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "INTERNAL SERVER ERROR"
        })
    }
}