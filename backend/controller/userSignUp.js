const userModel = require("../models/userModel");
const bcrypt=require('bcrypt');


async function userSignUpController(req,res){
    try{
        const {email, password, name}=req.body;
        //console.log(req.body); OK
        const user=await userModel.findOne({email});
        if(user){
            throw new Error("Email already in use")
        }
        if(!email){
            throw new UNSAFE_ErrorResponseImpl("Please provide email");
        }
        if(!password){
            throw new UNSAFE_ErrorResponseImpl("Please provide password");
        }
        if(!name){
            throw new UNSAFE_ErrorResponseImpl("Please provide name");
        }

        const salt=bcrypt.genSaltSync(10);
        const hashPassword=await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something is wrong");
        }
        const payload = {
            ...req.body,
            role:"GENERAL",
            password: hashPassword
        }

        const userData=new userModel(payload);
        const saveUser=await userData.save();
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created successfully"
        })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=userSignUpController