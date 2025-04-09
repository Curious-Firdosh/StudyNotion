const Category = require('../model/Category');
const { findById } = require('../model/section');

// Create Category Handler function 

exports.createCategory = async(req,res) => {
    
    try{
        // get data from Request ki body
        const{name , description} = req.body

        // Validation 
        if(!name){
            return res.status(401).json({
                success : false,
                message : "All Fields Are Required"
            })
        };

        // Creat Entry In DB
        const categoryDetails = await Category.create({
            name : name,
            description : description
        });
        console.log( "categoryDetails --->" ,categoryDetails)

        // Return Response 
        return res.status(200).json({
            success : true,
            message: "Category Created SuccessFully"
        })



    }
    catch(err) {
        console.log("Error While creating Category ==>" ,err)
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
} ;

// showAllCategories Handler Function
exports.showAllCategories = async (req,res) => {
    try{

        const allCategorys = await Category.find({} , {name : true , description : true});
        
        return res.status(200).json({
            success : true,
            message: "allCategorys Returned SuccessFully",
            allCategorys
        });
    }
    catch(err){
        
        console.log("Error While showAllCategories  ==>" ,err)
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

// Category Page Details 
 exports.categoryPageDetails = async(req ,res) => {
        
    try{
        // get category id from request body 
         const {categoryId} = req.body
        // get curses from these secified category id 
        const selectedCategory = await Category.findById(categoryId)
                                                .populate('courses')
                                                .exec()
        //Validation 
        if(!selectedCategory){
            return res.status(404).json({
                success : false ,
                message : "Data Not Found"
            })
        };
        // Get Course From diffrent Categories 
        const diffrentCategories = await Category.find({
                                                    _id : {$ne : categoryId}
                                                })
                                                .populate('courses')
                                                .exec()
        // Get Top Selling Courses hw: Khud Se Karna Hia 
        // Return Response 
        return response.status(200).json({
            success : true,
            data : {
                diffrentCategories,
                selectedCategory
            },
        });

    }
    catch(err){
        
        console.log("Error while getting Category Page Details  ==>" ,err)
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
 }
