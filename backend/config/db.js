 const mongoose=require('mongoose');


 async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to db");
    }catch(err){
        console.log("err");
    }
 }



 //username:catalinaelena1403
 //pass:N4FAtFmvIyoFkfeu

 module.exports=connectDB