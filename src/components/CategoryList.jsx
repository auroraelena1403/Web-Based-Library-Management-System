import React, { useEffect, useState } from 'react'
import summaryAPI from '../commons';
import { Link } from 'react-router';

const CategoryList = () => {

    const [bookCat, setBookCat]=useState([]);
    const [loading, setLoading]=useState(false);
    const categoryLoading = new Array(13).fill(null)

    const fetchBookCat=async()=>{
        setLoading(true);
        const response=await fetch(summaryAPI.bookCategory.url);
        const dataResponse=await response.json();
        setLoading(false);
        setBookCat(dataResponse.data);
        // console.log(dataResponse,"cats"); OK
    }
    useEffect(()=>{

        fetchBookCat();
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-3 justify-between overflow-scroll scrollbar-none'>
        
        
        {
          loading ? (
            categoryLoading.map((el,index)=>{
            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

            </div>
            })
          ):(
        
        bookCat.map(({ category, book }, index) => (
                           <Link to={"/book-category/"+category} key={category}>
                             <div key={index} className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                <img
                                    src={book?.bookImage[0]}
                                    alt={book?.bookTitle}
                                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                />
                                
                                
                            </div>
                            <p className="text-center text-sm md:text-base mt-2 font-bold">{category}</p>
                           </Link>
                            
                        )))
                        }
                      
        </div>
    
    </div>
  )
}

export default CategoryList
