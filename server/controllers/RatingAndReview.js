const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");


exports.createRating = async(req, res) => {
    try{
        // FETCH USER ID
        const userId = req.user.id;

        // FETCH COURSEID
        const {courseId, rating, review} = req.body;

        // VALIDATION
        if(!userId || !rating || !review || !courseId){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // CHECK IF USER IS ENROLLED OR NOT
        const userEnrolled = await Course.findOne({_id : courseId, studentsEnrolled : {$elemMatch : {$eq : userId}}});

        if(!userEnrolled){
            return res.status(404).json({
                success : false,
                message : "STUDENT IS NOT ENROLLED IN COURSE"
            })
        }

        // CHECK IF USER ALREADY GAVE A RATING
        const userRatingExists = await RatingAndReview.findOne({user : userId, course : courseId});

        if(userRatingExists){
            return res.status(400).json({
                success : false,
                message : "USER ALREADY REVIEWED"
            })
        }

        // CREATED DB ENTRY
        const newReview = await RatingAndReview.create({user : userId,rating, review, course : courseId});

        const updatedCourse = await Course.findByIdAndUpdate({_id : courseId}, {$push : {ratingsAndReviews : newReview._id}}, {new : true});

        return res.status(200).json({
            success : true,
            message : "REVIEW CREATED SUCCESSFULLY",
            data : updatedCourse
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "REVIEW CREATION FAILED"
        })
    }
}

// GET AVERAGE RATING

exports.getAverageRating = async(req, res) => {
    try{
        // GET COURSE ID
        const courseId = req.body.courseId;

        // VALIDATION
        if(!courseId){
            return res.status(400).json({
                success : false,
                message : "COURSE ID NOT FOUND"
            })
        }

        const allRating = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                }
            },{
                $group : {
                    _id : null,
                    averageRating : { $avg : "$rating" }
                }
            }
        ]);

        if(allRating.length > 0){
            return res.status(200).json({
                success : true,
                averageRating : allRating[0].averageRating,
            })
        }

        return res.status(200).json({
            success : true,
            averageRating : 0
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "AVERAGE RATING CREATION FAILED"
        })
    }
}

// GET ALL RATINGS

exports.getAllRatings = async(req, res) => {
    try{
        const allRatings = await RatingAndReview.find({})
                                                .sort({rating : "desc"})
                                                .populate(
                                                    {
                                                        path : "user",
                                                        select : "firstName lastName email image",
                                                    }
                                                ).populate(
                                                    {
                                                        path : "course",
                                                        select : "courseName"
                                                    }
                                                ).exec();

        return res.status(200).json({
            success : true,
            message : "GET ALL RATINGS SUCCESSFULL",
            data : allRatings,
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "CAN'T GET ALL RATINGS"
        })
    }
}