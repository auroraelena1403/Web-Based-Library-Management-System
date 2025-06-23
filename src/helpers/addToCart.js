//11:02

import { toast } from "react-toastify";
import summaryAPI from "../commons";


const addToCart = async (e,id)=>{
    e?.stopPropagation();
    e?.preventDefault();

    const response=await fetch(summaryAPI.addToCart.url,{
        method:summaryAPI.addToCart.method,
        credentials:'include',
        headers:{
            "content-type":'application/json'
        },
        body:JSON.stringify(
           { bookId:id}
        )
    })

    const responseData=await response.json();
    if(responseData.success){
        toast.success(responseData.message);
    }
    if(responseData.error){
        toast.error(responseData.message);
        console.log("OF");
    }
}

export default addToCart;