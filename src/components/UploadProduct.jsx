import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import bookCategory from '../helpers/bookCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImageJS from '../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import summaryAPI from '../commons';
import { toast } from 'react-toastify';

const UploadProduct = ({
  onClose
}) => {

  const [data, setData] = useState({
    bookTitle: "",
    author: "",
    publisher: "",
    category: [],
    bookImage: [],
    description: "",
    inStock: "",
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value} = e.target
    
      
  
    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
   
    })
  }
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
  
    setData((prevData) => {
      if (checked) {
        return { ...prevData, category: [...prevData.category, value] };
      } else {
        return { ...prevData, category: prevData.category.filter((cat) => cat !== value) };
      }
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    //setUploadImage(file.name);
    //console.log("file", file);
    const uploadImageCloudinary = await uploadImageJS(file);

    setData((preve) => {
      return {
        ...preve,
        bookImage: [...preve.bookImage, uploadImageCloudinary.url]
      }
    })

    //console.log("uploadimage", uploadImageCloudinary.url); OK
  }

  const handleDeleteProductImage = async(index)=>{
    //console.log("image index",index) OK
    
    const newProductImage = [...data.bookImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        bookImage : [...newProductImage]
      }
    })
    
  }

  // upload product

  const handleSubmit =async (e)=>{
    e.preventDefault();
    // console.log("data", data); OK

    const response=await fetch(summaryAPI.uploadProduct.url,{
      method:summaryAPI.uploadProduct.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const responseData=await response.json();

    if(responseData.success){
      toast.success(responseData?.message);
      onClose();
    }
    if(responseData.error){
      toast.error(responseData?.message);
    }


  }

  return (
    <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-4/5 pb-3' onSubmit={handleSubmit}>

          <label htmlFor='bookTitle'>Book title</label>
          <input
            type='text' id='bookTitle'
            placeholder='enter book title'
            name='bookTitle'
            value={data.bookTitle} onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='author'>Book author</label>
          <input
            type='text' id='author'
            placeholder='enter book author'
            name='author'
            value={data.author} onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='publisher'>Book publisher</label>
          <input
            type='text' id='publisher'
            placeholder='enter book publisher'
            name='publisher'
            value={data.publisher} onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />


<label className="font-bold">Book categories</label>
<div className="grid grid-cols-2 gap-2 p-2 border rounded bg-slate-100">
  {bookCategory.map((el) => (
    <label key={el.value} className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        value={el.value}
        checked={data.category.includes(el.value)}
        onChange={handleCategoryChange}
        className="w-4 h-4"
      />
      {el.label}
    </label>
  ))}
</div>

          {/* images */}
          <label htmlFor='bookImage' className='mt-3'>Book bookImage</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>

              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadImage} />
              </div>

            </div>
          </label>

          <div>
            {
              data?.bookImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data.bookImage.map((el, index) => {
                      return (
                        <div className='relative group'>
                          <img
                            src={el}
                            alt={el}
                            width={80}
                            height={80}
                            className='bg-slate-100 border cursor-pointer'
                            onClick={()=>{
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }}
                             />

                          <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                            <MdDelete />
                          </div>
                        </div>

                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>*Please upload product image</p>
              )
            }
          </div>




          <label htmlFor='description' className='mt-3'>Book description</label>
          <textarea
            type='text' id='description'
            placeholder='enter book description'
            rows={3}
            name='description'
            value={data.description} onChange={handleOnChange}
            className='h-28 bg-slate-100 border resize-none p-1'
            required
          ></textarea>


          <label htmlFor='inStock'>NO Items</label>
          <input
            type='number' id='inStock'
            placeholder='enter no items'
            name='inStock'
            value={data.inStock} onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded mb-3'
            required
          />






<button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>

        </form>

      </div>

      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }

    </div>
  )
}

export default UploadProduct
