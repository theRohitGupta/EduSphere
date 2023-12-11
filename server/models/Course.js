const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        trim : true,
        required : true
    },
    courseDescription : {
        type : String,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    whatYouWillLearn : {
        type : String,
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section",
        }
    ],
    ratingsAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview",
        }
    ],
    price : {
        type : Number,
        required : true,
    },
    thumbnail : {
        type : String,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
    },
    studentsEnrolled : [
        {
            type : mongoose.Types.ObjectId,
            required : true,
            ref : "User",
        }
    ],
    instructions : {
        type : [String]
    },
    status : {
        type : String,
        enum : ["draft", "published"],
    },
    tag : {
        type : [String],
        required : true
    },
    totalDuration : {
        type : String,
    }
},{ timestamps : true }
);

module.exports = mongoose.model("Course",courseSchema);