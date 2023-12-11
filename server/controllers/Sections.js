const Course = require("../models/Course");
const Section = require("../models/Section");


exports.addSection = async(req, res) => {
    try{

        // DATA FETCH
        const {sectionName, courseId} = req.body;

        // DATA VALIDATION
        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "MISSING PROPERTIES"
            });
        }

        // CREATE SECTION
        const newSection = await Section.create({sectionName});

        // UPDATE COURSE WITH SECTION OBJECTID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
                                                            {
                                                                $push : {
                                                                    courseContent : newSection._id
                                                                }
                                                            },
                                                            {new : true}
                                                            ).populate({
                                                                path : "courseContent",
                                                                populate : {
                                                                    path : "subSection"
                                                                }
                                                            }).exec();
                    
        return res.status(200).json({
            success : true,
            message : "SECTION CREATED SUCCESSFULLY",
            data : updatedCourseDetails,
        })

    }catch(err){
        console.log(err)
        return res.status(500),json({
            success : false,
            message : "SECTION CREATION FAILED",
        })
    }
}


// UPDATE SECTION

exports.updateSection = async(req, res) => {
    try{
        // DATA INPUT
        const {sectionName, sectionId, courseId} = req.body;

        // DATA VALIDATION
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE MANDATORY"
            })
        }

        // UPDATE DATA
        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, {sectionName : sectionName}, {new : true}).populate({path : "subSection"}).exec();

        if(!updatedSectionDetails){
            return res.status(404).json({
                success : false,
                message : "Section Details Not Found"
            })
        }

        // RETURN RES
        return res.status(200).json({
            success : true,
            message : "SECTION UPDATED SUCCESSFULLY",
            data: updatedSectionDetails
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "SECTION UPDATION FAILED",
        })
    }
}

// DELETE SECTION

exports.deleteSection = async (req, res) => {
    try{
        // SECTION ID FETCH
        // const {sectionId} = req.body;
        const {sectionId, courseId} = req.body;

        // VALIDATION
        if(!sectionId || !courseId){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE MANDATORY"
            })
        }

        // DELETE SECTION FROM SECTION SCHEMA
        const sectionFound = await Section.findByIdAndDelete(sectionId);

        if(!sectionFound){
            return res.status(404).json({
                success : false,
                message : "SECTION ID NOT FOUND"
            })
        }

        // DELETE COURSEID FROM COURSE SCHEMA
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $pull : {
                    courseContent : sectionId
                }
            },
            {new : true}
            ).populate({
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }).exec();
        
        if(!updatedCourseDetails){
            return res.status(404).json({
                success : false,
                message : "Course Id Not Found"
            })
        }

        // RETURN RES
        return res.status(200).json({
            success : true,
            message : "SECTION DELETED SUCCESSFULLY",
            data : updatedCourseDetails
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "SECTION DELETION FAILED"
        })
    }
}