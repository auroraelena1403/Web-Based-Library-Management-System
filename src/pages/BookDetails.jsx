import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import summaryAPI from '../commons';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import BookCardH from '../components/BookCardH';
import Context from '../Context/Context'
import addToCart from '../helpers/addToCart';
import addToFav from '../helpers/addToFav';


const BookDetails = () => {
  const [data, setData] = useState({
    bookTitle: "",
    author: "",
    publisher: "",
    category: [],
    bookImage: [],
    description: "",
    inStock: "",
  })
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const bookImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const { fetchUserAddToCart } = useContext(Context)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate();
  //console.log(Context,"context?");

  //console.log("book id", params); OK

  const fetchBookDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryAPI.bookDetails.url, {
      method: summaryAPI.bookDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false);

    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.bookImage[0]);
  }

  //console.log("data", data);
  //console.log("cat", data.category); OK
  useEffect(() => {
    fetchBookDetails();
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    // fetchUserAddToCart()
  }
  const handleAddToFav = async (e, id) => {
    await addToFav(e, id)
    // fetchUserAddToCart()
  }

  return (
    <div className='container mx-auto p-4 mt-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 mb-16'>
        {/***book Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseEnter={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/**product zoom */}
            {
              zoomImage && (
                <div className=' absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                    }}
                  >

                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    bookImageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.bookImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/***product details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

              <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
              </div>
            </div>
          ) :
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.publisher}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.bookTitle}</h2>
                <p className='capitalize text-slate-400'>{data?.author}</p>
                {/* <p className='capitalize text-slate-400'>{data?.category},</p> */}
                {
                  data?.category?.map((category, index) => {
                    return (
                      <p className='capitalize text-slate-400' key={category}>{category},</p>
                    )
                  })
                }

                <div className='text-red-600 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                {/* <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                </div> */}



                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleAddToFav(e, data?._id)}>Favorite</button>
                  <button
                    className={`border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium 
              ${data?.inStock > 0 ? "bg-red-600 text-white hover:text-red-600 hover:bg-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"}`}
                    onClick={(e) => handleAddToCart(e, data?._id)}
                    disabled={data?.inStock <= 0}
                  >
                    {data?.inStock > 0 ? "Add To Cart" : "Out of Stock"}
                  </button>
                  <div className='my-2'>
                    {data?.inStock > 0 ? (
                      <p className='text-green-600 font-medium'>In Stock: {data.inStock}</p>
                    ) : (
                      <p className='text-red-600 font-medium'>Out of Stock</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description : </p>
                  <p>{data?.description}</p>
                </div>

                
              </div>
            )
        }

      </div>

      {
        data?.category?.map((category, index) => {
          return (
            <div>
              <BookCardH category={category} heading={"Recommended Product"} />

            </div>

          )
        })
      }

      <div className='justify-center'>
      {data?.pdf && (
                  <div className="mt-8 mb-8 ml-24">
                    <p className="text-slate-600 font-medium my-1 justify-center">Citește cartea (PDF):</p>
                    {/* Variante: Alege una dintre cele de mai jos */}

                    {/* 🟢 Varianta simplă cu iframe */}
                    <iframe
                      src={`/pdf/${data.pdf}`}
                      width="50%%"
                      height="680px"
                      title="PDF Viewer"
                    />

                    {/* 🔵 SAU: doar un link spre PDF */}
                    {/* <a
      href={data.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      Deschide cartea în format PDF
    </a> */}
                  </div>
                )}
      </div>


      








    </div>
  )
}

export default BookDetails
