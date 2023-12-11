const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async(req, res) => {
    const { courseId, subSectionId} = req.body
    const userId = req.user.id

    try{
        const subSectionDetails = await SubSection.findById(subSectionId)
        if(!subSectionDetails){
            return res.status(404).json({
                success : false,
                message : "SubSection NOT FOUND"
            })
        }
        // console.log(courseId, userId)

        let courseProgressDetails = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId
        })
        if(!courseProgressDetails){
            return res.status(404).json({
                success : false,
                message : "COURSE PROGRESS NOT FOUND"
            })
        }else{
            // CHECK FOR RECOMPLETION
            if(courseProgressDetails.completedVideos.includes(subSectionId)){
                return res.status(300).json({
                    success : false,
                    message : "SubSection ALREADY COMPLETED"
                })
            }
            courseProgressDetails.completedVideos.push(subSectionId)
        }
        await courseProgressDetails.save()
        return res.status(200).json({
            success : true,
            message : `${subSectionId} Video Has Marked Completed`
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "INTERNAL SERVER ERROR"
        })
    }
}