import React from 'react'
import { useParams , useLocation, useNavigate} from 'react-router'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import VerticalCard from '../components/VerticalCard'
import summaryAPI from '../commons'
import Context from '../Context/Context'
import addToCart from '../helpers/addToCart'
import { Card } from 'flowbite-react';
import { Link } from 'react-router';
import bookCategory from '../helpers/bookCategory'

const CategoryBooks = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [selectCategory, setSelectCategory] = useState({})
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(summaryAPI.filterProduct.url, {
      method: summaryAPI.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    setLoading(false)
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target

    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    )

    setFilterCategoryList(arrayOfCategory)
  }, [selectCategory])

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)

    setData((prev) =>
      [...prev].sort((a, b) =>
        value === 'asc'
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    )
  }
  
return (
  <div className='container mx-auto p-4'>
      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by category */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form bookCategory='text-sm flex flex-col gap-2 py-2'>
              {bookCategory.map((categoryName, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    name="category"
                    checked={!!selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side (products) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryBooks
