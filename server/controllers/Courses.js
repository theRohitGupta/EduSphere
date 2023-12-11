const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");
const { totalDuration } = require("../utils/totalDuration");
const CourseProgress = require("../models/CourseProgress");


// CREATE COURSE HANDLER FUNCTION
exports.createCourse = async (req, res) => {
    try{
        // GET USER ID FROM REQ OBJECT
        const userId = req.user.id;

        // DATA FETCH
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        let { status, tag:_tag, instructions:_instructions} = req.body

        // FILE FETCH
        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        // console.log(tag, instructions)

        // VALIDATION
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag.length || !instructions.length){
            return res.status(400).json({
                success : false,
                message : "All Fields are Mandatory",
            })
        }

        if(!status || status === undefined)
            status = "Draft";

        // CHECK FOR INSTRUCTOR
        const instructorDetails = await User.findById(userId, {accountType : "Instructor"});

        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details Not Found"
            });
        }

        // CHECK Category VALIDITY
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "category DETAILS NOT FOUND"
            })
        }

        // UPLOAD IMAGE TO CLOUDINARY
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // CREATE ENTRY FOR NEW COURSE
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn,
            price,
            category : categoryDetails._id,
            tag,
            thumbnail : thumbnailImage.secure_url,
            status,
            instructions
        })

        // ADD THIS COURSE TO INSTRUCTOR COURSE LIST UPDATE 
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id
                }
            }
        );

        // UPDATE category SCHEMA
        await Category.findByIdAndUpdate(
            {_id : categoryDetails._id},
            {
                $push : {
                    courses : newCourse._id
                }
            }
        );

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "COURSE CREATED SUCCESSFULLY",
            data : newCourse
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success : false,
            message : "FAILED TO CREATE COURSE",
            err : err.message
        })
    }
}


// UPDATE COURSE DETAILS
exports.updateCourse = async (req, res) => {
    try{
        // GET USER ID FROM REQ OBJECT
        const userId = req.user.id

        // DATA FETCH
        const {courseId} = req.body;
        const updates = req.body

        const courseDetails = await Course.findById(courseId)

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "COURSE ID NOT FOUND"
            })
        }

        // CHECK INSTRUCTOR SAME OR NOT
        const uid = new mongoose.Types.ObjectId(userId)
        // console.log(courseDetails.instructor , uid)
        if(!courseDetails.instructor.equals(uid)){
            return res.status(400).json({
                success : false,
                message : "INSTRUCTOR MUST BE SAME PERSON WHO CREATED THE COURSE"
            })
        }

        if(req.files) {
            const thumbnail = req.files.thumbnailImage
            // UPLOAD IMAGE TO CLOUDINARY
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            courseDetails.thumbnail = thumbnailImage.secure_url
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === 'tag' || key === 'instructions') courseDetails[key] = JSON.parse(updates[key])
                else courseDetails[key] = updates[key]
            }
        }

        await courseDetails.save();
        // FIND COURSE DETAILS
        const courseData = await Course.findOne({_id : courseId})
                                                .populate(
                                                    {
                                                        path : "instructor",
                                                        populate : {
                                                            path : "additionalDetails",
                                                        }
                                                    }
                                                )
                                                .populate("category")
                                                // .populate("ratingAndReviews")
                                                .populate({
                                                    path : "courseContent",
                                                    populate : {
                                                        path : "subSection"
                                                    }
                                                }).exec();

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "COURSE Updated SUCCESSFULLY",
            data : courseData
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success : false,
            message : "FAILED TO UPDATE COURSE",
            err : err.message
        })
    }
}

// DELETE COURSE
exports.deleteCourse = async(req, res) => {
    try{
        const { courseId } = req.body
        const instructorId = req.user.id
        
        const courseDetails = await Course.findById(courseId)

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Course Details Not Found"
            })
        }

        const userId = new mongoose.Types.ObjectId(instructorId);
        if(!courseDetails.instructor.equals(userId)){
            return res.status(401).json({
                success : false,
                message : "Only the same instructor can delete his course"
            })
        }

        // UNENROLL STUDENTS FROM COURSE
        const studentsEnrolled = courseDetails.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull : { courses : courseId }
            })
        }

        // DELETE SECTION AND SUBSECTION
        const courseSections = courseDetails.courseContent
        for(const sectionId of courseSections){
            // DELETE SUBSECTIONS
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSection
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        // DELETE THIS COURSE FROM INSTRUCTOR COURSE LIST UPDATE 
        await User.findByIdAndUpdate(
            {_id : instructorId},
            {
                $pull : {
                    courses : courseId
                }
            }
        );

        // DELETE COURSE FROM category SCHEMA
        await Category.findByIdAndUpdate(
            {_id : courseDetails._id},
            {
                $pull : {
                    courses : courseDetails._id
                }
            }
        );

        await Course.findByIdAndDelete(courseDetails._id)

        return res.status(200).json({
            success : true,
            message : "COURSE DLETED SUCCESSFULLY"
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "COURSE COULD NOT BE DELETED",
            err
        })
    }
}

// GET ALL COURSES HANDLER FUNCTION
exports.getAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName : true,
                                                 price : true,
                                                 thumbnail : true,
                                                 instructor : true,
                                                 ratingsAndReviews : true,
                                                 studentsEnrolled : true
                                                }).populate("instructor")
                                                .exec();

        return res.status(200).json({
            success : true,
            message : "DATA FOR ALL COURSES FETCHED SUCCESSFULLY",
            data : allCourses,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "CANNOT FETCH COURSE DATA"
        })
    }
}


// GET COURSE DETAILS
exports.getCourseDetails = async(req, res) => {
    try{
        // GET ID
        const { courseId } = req.body

        // FIND COURSE DETAILS
        const courseDetails = await Course.findOne({_id : courseId})
                                                .populate(
                                                    {
                                                        path : "instructor",
                                                        populate : {
                                                            path : "additionalDetails",
                                                        }
                                                    }
                                                )
                                                .populate("category")
                                                .populate("ratingsAndReviews")
                                                .populate({
                                                    path : "courseContent",
                                                    populate : {
                                                        path : "subSection"
                                                    }
                                                }).exec();
                                        
        // VALIDATION
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `COULD NOT FIND COURSE WITH ${courseId}`,
            })
        }
        courseDetails.totalDuration = totalDuration(courseDetails)

        return res.status(200).json({
            success : true,
            message : "COURSE DETAILS FETCHED SUCCESSFULLY",
            data : courseDetails
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try{
        const { courseId } = req.body
        const userId = req.user.id

        const courseDetails = await Course.findOne({
            _id : courseId,
        }).populate({
            path : "instructor",
            populate : {
                path : "additionalDetails"
            }
        }).populate("category")
        // .populate("ratingAndReviews")
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec();

        let courseProgressCount = await CourseProgress.findOne({courseId : courseId, userId : userId})

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "COURSE DETAILS NOT FOUND"
            })
        }

        // TOTAL DURATION OF ALL COURSES
        const timeDuration = totalDuration(courseDetails)
        courseDetails.totalDuration = timeDuration

        return res.status(200).json({
            success : true,
            data : {
                courseDetails,
                completedVideos : courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : []
            }
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

// GET ALL INSTRUCTOR COURSES

exports.getInstructorCourses = async ( req, res ) => {
    try{
        const instructorId = req.user.id

        const instructorAllCoursesDetails = await Course.find({instructor: instructorId}).sort({createdAt: -1})
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec()

        if(!instructorAllCoursesDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details Not Found"
            })
        }

        // TOTAL DURATION OF ALL COURSES
        instructorAllCoursesDetails.forEach((courseDetails,i) => {
            const timeDuration = totalDuration(courseDetails)
            instructorAllCoursesDetails[i].totalDuration = timeDuration
        })

        res.status(200).json({
            success : true,
            message : "All Instructor Courses",
            data : instructorAllCoursesDetails
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Instructor courses could not be fetched",
        })
    }
}
