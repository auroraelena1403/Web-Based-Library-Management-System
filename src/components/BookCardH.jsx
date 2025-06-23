import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import fetchCategoryWiseBook from "../helpers/fetchCategoryWiseBook";
import addToCart from "../helpers/addToCart";
import Context from '../Context/Context'

const BookCardH = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

  const fetchData = async () => {
    setLoading(true);
    const categoryBook = await fetchCategoryWiseBook(category);
    setLoading(false);
    setData(categoryBook?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{heading}</h2>
      <div className="relative">
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <div
          className="flex gap-4 overflow-x-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden p-4 min-w-[180px] max-w-[200px]"
                >
                  <div className="bg-gray-300 h-40 w-full rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 w-1/2 rounded mb-2"></div>
                </div>
              ))
            : data.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden p-4 min-w-[180px] max-w-[200px]"
                >
                  <Link to={`/book/${product._id}`}>
                    <img
                      src={product.bookImage[0]}
                      alt={product.bookTitle}
                      className="w-full h-40 object-contain mb-4"
                    />
                  </Link>
                  <div className="relative group">
                    <h5 className="text-sm font-bold text-gray-800 truncate group-hover:overflow-visible group-hover:whitespace-normal group-hover:absolute group-hover:bg-white group-hover:shadow-lg group-hover:p-2 group-hover:rounded-lg group-hover:z-10">
                      {product.bookTitle}
                    </h5>
                  </div>
                  <h6 className="text-xs font-medium text-gray-600">
                    {product.author}
                  </h6>
                  <button
                    className={`text-sm text-white px-3 py-0.5 rounded-full mt-4 
              ${product?.inStock > 0 ? "text-sm bg-green-950 hover:bg-red-700 text-black px-3 py-0.5 rounded-full" : "bg-gray-400 text-gray-600 text-sm  px-3 py-0.5 rounded-full cursor-not-allowed"}`}
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    disabled={product?.inStock <= 0}
                  >
                    {product?.inStock > 0 ? "Add To Cart" : "Out of Stock"}
                  </button>
                </div>
              ))}
        </div>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default BookCardH;
