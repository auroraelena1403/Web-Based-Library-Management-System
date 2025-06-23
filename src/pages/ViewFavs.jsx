import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import summaryAPI from '../commons';
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
const ViewFavs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {

        const response = await fetch(summaryAPI.viewFavs.url, {
            method: summaryAPI.viewFavs.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })


        const responseData = await response.json()
        console.log("datacart", responseData);

        if (responseData.success) {
            setData(responseData.data)
        }


    }
    const handleLoading = async () => {
        await fetchData()
    }
    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])
    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryAPI.deleteFavProduct.url, {
            method: summaryAPI.deleteFavProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    // const handlePayment = async (orderType) => {
    //     const stripePromise = await loadStripe('pk_test_51R1OewIPaK9Bh8sysSVzAcEMU0jvcMlgmt9wnrBqrdzQ2RZwY9Im5C9gK7NsWKlIKcQSrHIMiD908penBOolDEvf00nvWhoaFc')
    //     const response = await fetch(summaryAPI.payment.url, {
    //         method: summaryAPI.payment.method,
    //         credentials: 'include',
    //         headers: {
    //             "content-type": 'application/json'
    //         },
    //         body: JSON.stringify({
    //             cartItems: data,
    //             orderType: orderType
    //         })
    //     })

    //     const responseData = await response.json()

    //     if (responseData?.id) {
    //         stripePromise.redirectToCheckout({ sessionId: responseData.id })
    //     }

    //     console.log("payment response", responseData)
    // }

    return (
        <div>
            <div className='container mx-auto'>
                <h1 className='text-5xl lg:text-xl text-ellipsis line-clamp-1 mt-10 ml-4'>Favorite</h1>
                <div className='text-center text-lg my-3'>
                    {
                        data.length === 0 && !loading && (
                            <p className='bg-white py-5'>No Data</p>
                        )
                    }
                </div>

                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                    {/***view product */}
                    <div className='w-full max-w-3xl'>
                        {
                            loading ? (
                                loadingCart?.map((el, index) => {
                                    return (
                                        <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                        </div>
                                    )
                                })

                            ) : (
                                data.map((product, index) => {
                                    return (
                                        <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                            <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.bookId?.bookImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                            </div>
                                            <div className='px-4 py-2 relative'>
                                                {/**delete product */}
                                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                    <MdDelete />
                                                </div>

                                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.bookId?.bookTitle}</h2>
                                                <p className='capitalize text-slate-500'>{product?.bookId.category}</p>
                                                <p className='capitalize text-slate-500'>{product?.bookId.author}</p>
                                                {/* <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div> */}
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>


                    {/***summary  */}
                    {/* {
                        data[0] && (
                            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                                {
                                    loading ? (
                                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                                        </div>
                                    ) : (
                                        <div className='h-36 bg-white'>
                                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>

                                            </div>

                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>

                                            </div>

                                            <button className='bg-blue-600 p-2 text-white w-full mt-2'
                                                onClick={() => handlePayment("ridicare personala")}>
                                                Ridicare personala
                                            </button>

                                            <button className='bg-blue-600 p-2 text-white w-full mt-2'
                                                onClick={() => handlePayment("livrare la domiciliu")}>
                                                Livrare la domiciliu
                                            </button>

                                        </div>
                                    )
                                }
                            </div>
                        )
                    } */}
                </div>
            </div>

        </div>
    )
}

export default ViewFavs
