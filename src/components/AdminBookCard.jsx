
import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditBook from '../components/AdminEditBook'

const AdminBookCard =({
    data,
    fetchData,
}) =>{

    const [editBook, setEditBook]=useState(false);


  return (
    <div className='bg-white p-4 rounded '>
       <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.bookImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.bookTitle}</h1>

            <div>

                

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditBook(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>

          
       </div>

       {
          editBook && (
            <AdminEditBook bookData={data} onClose={()=>setEditBook(false)} fetchdata={fetchData}/>
          )
        }

      
        
        
    
    </div>
  )
}

export default AdminBookCard
