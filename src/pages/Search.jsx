import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import summaryAPI from '../commons';
import BookCardH from '../components/BookCardH';
import VerticalCard from '../components/VerticalCard';

const Search = () => {
    const query=useLocation();
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    //console.log(query.search); OK
    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(summaryAPI.searchBook.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
        console.log(dataResponse);
    }
    
    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div>
         <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
      
    </div>
  )
}

export default Search
