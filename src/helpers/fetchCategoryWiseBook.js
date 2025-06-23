import summaryAPI from '../commons';

const fetchCategoryWiseBook = async(category)=>{
    const response=await fetch(summaryAPI.categoryWiseBooks.url,{
        method:summaryAPI.categoryWiseBooks.method,
        headers:{
            "content-type":'application/json'
        },
        body:JSON.stringify({
            category:category
        })
    })


    const dataResponse=await response.json();
    return dataResponse;
}

export default fetchCategoryWiseBook;