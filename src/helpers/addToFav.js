//11:02

import { toast } from "react-toastify";
import summaryAPI from "../commons";


const addToFav = async (e,id)=>{
    e?.stopPropagation();
    e?.preventDefault();

    const response=await fetch(summaryAPI.addToFav.url,{
        method:summaryAPI.addToFav.method,
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

export default addToFav;