import React, { useContext, useEffect, useState } from 'react';
import summaryAPI from '../commons';
import bookCategory from '../helpers/bookCategory'
import { Card } from 'flowbite-react';
import { Link } from 'react-router';
import Context from '../Context/Context'
import addToCart from '../helpers/addToCart'


const AllBooks = () => {
    const [openUploadProduct, setOpenUploadProduct]=useState(false);
    const [allBooks, setAllBooks]=useState([]);
    const { fetchUserAddToCart } = useContext(Context)
    const [selectedCategories, setSelectedCategories] = useState({});
    const [filteredBooks, setFilteredBooks] = useState([]);
    
    const [categorySearch, setCategorySearch] = useState('');
    const [showAllCategories, setShowAllCategories] = useState(false);

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }
  
    const fetchAllProducts=async()=>{
      const response=await fetch(summaryAPI.allBooks.url);
      const dataRes=await response.json();
      console.log("verificare date",dataRes);
  
      setAllBooks(dataRes?.data || []);
      
      setFilteredBooks(dataRes?.data || []);
    }
    
  
    useEffect(()=>{
      fetchAllProducts();
  
    },[])

    useEffect(() => {
      const selected = Object.keys(selectedCategories).filter((key) => selectedCategories[key]);
      console.log(" selected filters", selected);
      if (selected.length === 0) {
        setFilteredBooks(allBooks);
      } else {
        const filtered = allBooks.filter((book) => {
          console.log("book.category:", book.category);
          return book.category.some(cat => selected.includes(cat));
        });
        
      
        setFilteredBooks(filtered);
      }
    }, [selectedCategories, allBooks]);
  
    const handleCategoryChange = (e) => {
      const { value, checked } = e.target;
      setSelectedCategories((prev) => ({
        ...prev,
        [value]: checked,
      }));
    };

    const filteredCategoryList = bookCategory.filter(cat =>
      cat.label.toLowerCase().includes(categorySearch.toLowerCase())
    );
    const displayedCategories = showAllCategories ? filteredCategoryList : filteredCategoryList.slice(0, 10);

    
    
  return (
    // <div>
    //     <div>
        

    //   {
    //     //allBooks
    //   }
    //   <div className='grid gap-8 my-12 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
    //       {
    //         allBooks.map((book,index)=>{
    //           return(
    //             <Card key={book._id} className='flex flex-col items-center text-center shadow-md p-4'>
    //             <Link to={"/book/"+book?._id}>
    //               <img
    //                 src={book.bookImage[0]}
    //                 alt={book.bookTitle}
    //                 className="w-full h-60 object-cover rounded-md"
    //               />
    //             </Link>
    //             <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
    //               {book.bookTitle}
    //             </h5>
    //             <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
    //               {book.author}
    //             </p>
    //             {/* <button
    //               onClick={() => handleAddToReserved(book)}
    //               className="btn-primary mt-4"
    //             >
    //               Rezervă
    //             </button> */}
    //             <button className='text-sm bg-green-900 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,book?._id)}>Add to Cart</button>
    //           </Card>
                
    //           )
    //         })
    //       }
    //     </div>
    //     </div>
    // </div>

    <div className="container mx-auto p-4 flex gap-6 min-h-[80vh]">
      
      {/* Sidebar Filtre */}
      <aside className="w-64 flex flex-col border rounded p-4 shadow-md sticky top-4 h-[80vh] overflow-hidden bg-white">
        <h2 className="text-lg font-bold mb-4">Filtrează după categorie:</h2>

        {/* Search categorii */}
        <input
          type="text"
          placeholder="Caută categorii..."
          className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />

        {/* Lista filtrelor cu scroll vertical */}
        <div className="flex-grow overflow-y-auto pr-2">
          {displayedCategories.length > 0 ? (
            displayedCategories.map((category, index) => (
              <label key={index} className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  value={category.value}
                  checked={!!selectedCategories[category.value]}
                  onChange={handleCategoryChange}
                  className="cursor-pointer"
                />
                <span>{category.label}</span>
              </label>
            ))
          ) : (
            <p className="text-gray-500">Nicio categorie găsită.</p>
          )}
        </div>

        {/* Buton pentru mai multe / mai putine categorii */}
        {filteredCategoryList.length > 10 && (
          <button
            className="mt-4 text-blue-600 hover:underline self-start"
            onClick={() => setShowAllCategories(prev => !prev)}
          >
            {showAllCategories ? 'Mai puține categorii' : 'Mai multe categorii'}
          </button>
        )}
      </aside>

      {/* Rezultate cărți */}
      <main className="flex-grow">
        {filteredBooks.length > 0 ? (
          <div className="grid gap-8 my-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {filteredBooks.map(book => (
              <Card key={book._id} className="flex flex-col items-center text-center shadow-md p-4">
                <Link to={`/book/${book._id}`}>
                  <img
                    src={book.bookImage[0]}
                    alt={book.bookTitle}
                    className="w-full h-60 object-cover rounded-md"
                  />
                </Link>
                <h5 className="text-xl font-bold mt-2">{book.bookTitle}</h5>
                <p className="text-gray-700">{book.author}</p>
                <button
                  className="text-sm bg-green-900 hover:bg-red-700 text-white px-3 py-0.5 rounded-full mt-2"
                  onClick={(e) => handleAddToCart(e, book._id)}
                >
                  Add to Cart
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nicio carte găsită pentru filtrele selectate.</p>
        )}
      </main>
    </div>

  )
}

export default AllBooks
