//https://cloudinary.com/documentation/upload_images#landingpage
const url=`https://api.cloudinary.com/v1_1/dxwqf9vuw/image/upload`

const uploadImageJS=async(image)=>{
    const formData=new FormData();
    formData.append("file",image);
    formData.append("upload_preset",'websiteBook')
    const dataResponse=await fetch(url,{
        method:"post",
        body: formData
    })

    return dataResponse.json();
}

export default uploadImageJS