const jwt = require('jsonwebtoken')
async function authToken(req,res,next){
    try {
        const token = req.cookies?.token ;
        
        console.log("token        -",token);
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });
        
    } catch (error) {
        res.status(400).json({
            message:err.message||err,
            data:[],
            error:true,
            success:false
        })
        console.log("erroare authtoken");
    }
}

module.exports = authToken