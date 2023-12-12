const Category = require("../models/Category");
const Course = require("../models/Course");


// CREATE Category HANDLER FUNCTION
exports.createCategory = async (req, res) => {
    try{
        // FETCHING DATA FROM BODY
        const {name, description} = req.body;

        // VALIDATION
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        // CREATE ENTRY IN DB
        const categoryDetails = await Category.create({
            name,
            description,
        });
        // console.log(categoryDetails);

        return res.status(200).json({
            success : true,
            message : 'CATEGORY CREATED SUCCESSFULLY'
        })

    }catch(err){
        return res.status(500).json({
            success : false,
            message : "CREATING Category FAILED",
        })
    }
}


// GET ALL Category
exports.showAllCategories = async (req, res) => {
    try{
        const allCategorys = await Category.find({}, {name:true, description : true});
        return res.status(200).json({
            success : true,
            allCategorys,
            message : "ALL Categories FETCHED SUCCESSFULLY"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "ERROR IN GETTING ALL Categories"
        })
    }
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

// CATEGORY PAGE DETAILS
exports.categoryPageDetails = async(req, res) => {
    try{
        // console.log(req.body)
        // GET CATEGORY ID
        const {categoryId} = req.body;

        // VALIDATION
        if(!categoryId){
            return res.status(400).json({
                success : false,
                message : "CATEGORY ID NOT FOUND"
            })
        }

        // COURSES OF SPECIFIED CATEGORYID
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path : "courses",
                match : { status : "published" },
                populate : [
                    {
                    path : "instructor"
                }
                ,{
                    path : "category"
                },{
                    path : "ratingsAndReviews"
                }]
            }).exec();

        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : "CATEGORY NOT FOUND"
            })
        }

        if(selectedCategory.courses.length === 0){
            // console.log("NO COURSES FOUND IN SELECTED CATEGORY")
            return res.status(200).json({
                success : true,
                message : "NO COURSES FOUND IN SELECTED CATEGORY",
                data : {selectedCategory}
            })
        }

        // GET COURSES FOR DIFFRENT CATEGORIES
        const categoriesExceptSelected = await Category.find({
                                                _id : {$ne: categoryId},
                                                })
                                            
        let differentCategories = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
                                                .populate({
                                                    path : "courses",
                                                    match : { status : "published" },
                                                    populate : [
                                                        {
                                                        path : "instructor"
                                                    }
                                                    ,{
                                                        path : "category"
                                                    },{
                                                        path : "ratingsAndReviews"
                                                    }]
                                                }).exec()

        const allCategories = await Category.find()
                                                .populate({
                                                    path : "courses",
                                                    match : { status : "published" },
                                                    populate : [
                                                        {
                                                        path : "instructor"
                                                    }
                                                    ,{
                                                        path : "category"
                                                    },{
                                                        path : "ratingsAndReviews"
                                                    }]
                                                }).exec()

        // GET TOP SELLING COURSES
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);

        return res.status(200).json({
            success : true,
            message : "ALL TYPES OF CATEGORIES FETCHED SUCCESSFULLY",
            data : {
                selectedCategory,
                differentCategories,
                mostSellingCourses
            }
        })
    }catch(error){
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}