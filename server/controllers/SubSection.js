const { findByIdAndDelete } = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubSection = async (req, res) => {
    try{
        // FETCH DATA FROM BODY
        const {sectionId, title, description} = req.body;

        // FETCH VIDEO FILES
        const video = req.files.videoFile;

        // VAIDATION
        // console.log(sectionId, video)
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // UPLOAD VIDEO TO CLOUDINARY
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // CREATE A SUBSECTION
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl : uploadDetails.secure_url
        })

        // UPDATE SECTION WITH SUBSECTION OBJECT ID
        const updatedSection = await Section.findByIdAndUpdate({_id : sectionId}, 
                                                                {$push : {
                                                                    subSection : subSectionDetails._id,
                                                                }},
                                                                {new : true}
                                                                ).populate("subSection").exec();

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "SUBSECTION CREATED SUCCESSFULLY",
            data : updatedSection
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "SUB SECTION CREATION FAILED"
        })
    }
}

// UPDATE SUBSECTION
exports.updateSubSection = async(req, res) => {
    try{
        // FETCH DATA
        const { sectionId, subSectionId, title, timeDuration, description} = req.body;
        const updatedOptions = {};
        if(title !== undefined)
            updatedOptions.title = title;
        if(description !== undefined)
            updatedOptions.description = description;

        // FETCH VIDEO 
        // UPLOAD VIDEOS TO CLOUDINARY
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            updatedOptions.videoUrl = uploadDetails.secure_url;
            updatedOptions.timeDuration = `${uploadDetails.duration}`
        }

        // UPDATE INFORMATION IN DB
        const updatedSubSectionDetails = await SubSection.findByIdAndUpdate(subSectionId,
                                                                            updatedOptions,
                                                                            {new : true}
                                                                            );
        
        if(!updatedSubSectionDetails){
            return res.status(404).json({
                success : false,
                message : "SUBSECTION DETAILS NOT FOUND",
            }) 
        }

        const updatedSectionDetails =  await Section.findById(sectionId,{sectionName : true}, {new : true}).populate("subSection").exec();

        // console.log(updatedSectionDetails);

        return res.status(200).json({
            success : true,
            message : "SUBSECTION DETAILS UPDATED SUCCESSFULLY",
            data : updatedSectionDetails
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "SUBSECTION DETAILS UPDATION FAILED"
        })
    }
}


// DELETE SUBSECTION
exports.deleteSubSection = async (req, res) => {
    try{
        // FETCH SECTION ID
        const {subSectionId, sectionId} = req.body;

        // DELETE SUBSECTION
        const subSectionDetails = await SubSection.findByIdAndDelete({_id : subSectionId});

        if(!subSectionDetails){
            return res.status(404).json({
                success : false,
                message : "SUBSECTION ID NOT FOUND"
            })
        }

        // DELETE SUBSECTION FROM SECTION
        const sectionDetails =  await Section.findByIdAndUpdate(sectionId,{
            $pull : {
                subSection : subSectionId
            }
        },
        {new : true})
        .populate("subSection").exec();

        if(!sectionDetails){
            return res.status(404).json({
                success : false,
                message : "SECTION DETAILS NOT FOUND"
            })
        }

        return res.status(200).json({
            success : true,
            message : "SUBSECTION DETAILS DELETED SUCCESSFULLY",
            data : sectionDetails
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "SUBSECTION DETAILS DELETION FAILED"
        })
    }
}