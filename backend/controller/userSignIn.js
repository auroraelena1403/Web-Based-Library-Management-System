const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


async function userSignInController(req, res) {
    try {
        const {email, password}=req.body;
        if(!email){
            throw new UNSAFE_ErrorResponseImpl("Introduceți un email valid!");
        }
        if(!password){
            throw new UNSAFE_ErrorResponseImpl("Introduceți o parolă!");
        }
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("Utilizatorul nu a fost găsit!");
        }
        const checkPass= await bcrypt.compare(password,user.password);
        console.log(checkPass,"checkPass");
        if(checkPass){
            const tokenData={
                _id:user._id,
                email:user.email,
            }
            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,  { expiresIn: 60 * 60 * 8 });
            const tokenOption={
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 8 * 1000, // 8 ore
                sameSite: "strict", // Prevenire CSRF
            }
            console.log("token", token, tokenOption);
            res.cookie("token", token, tokenOption).json({
                message:"Logare efectuată cu succes!",
                data:token,
                success:true,
                error:false
            })

        }
        else{
            throw new Error("Verificați parola!");
        }
    } catch (err) {
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
    
}

module.exports = userSignInController;