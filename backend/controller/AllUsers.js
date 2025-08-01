const userModel = require("../models/userModel");

async function allUsers(req,res){
    try {
        console.log("userid",req.userId);

        const allUsers=await userModel.find();

        res.json({
            message:"All users:",
            data:allUsers,
            error:false,
            success:true
        })
    } catch (err) {
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=allUsers;