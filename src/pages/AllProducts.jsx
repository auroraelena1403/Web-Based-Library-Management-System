import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryAPI from '../commons';
import AdminBookCard from '../components/AdminBookCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct]=useState(false);
  const [allBooks, setAllBooks]=useState([]);

  const fetchAllProducts=async()=>{
    const response=await fetch(summaryAPI.allBooks.url);
    const dataRes=await response.json();
    console.log(dataRes);

    setAllBooks(dataRes?.data || []);
  }

  useEffect(()=>{
    fetchAllProducts();

  },[])
  return (
    <div>
      <div className='bg-white py-1 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All products</h2>
        <button className='border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload product</button>

      </div>


      {
        //allBooks
      }
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allBooks.map((product,index)=>{
              return(
                <AdminBookCard data={product} key={index+"allProduct"} fetchData={fetchAllProducts}/>
                
              )
            })
          }
        </div>

      {/* upload product cmp */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
        )
      }
     
    </div>
  )
}

export default AllProducts
