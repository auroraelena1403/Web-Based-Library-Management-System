import React from 'react'
import video from '../assets/videoHome.mp4';
//import Imagine from '../assets/cardResurseE.jpg'
//import '../pages/Home.css'
//import CategoryList from '../components/CategoryList'
import Banner from '../components/Banners/Banner'
import BookCardH from '../components/BookCardH'
import Cards from '../components/Cards/Cards'
import '../App.css';
import { Link } from 'react-router'
const Home = () => {
    return (
        <div className='bg-white'>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
                <video 
                    src={video} 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-85 "
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 "></div>

                
                <h1 className="text-white text-center text-[calc(2vw+1vh)] w-3/4 mt-10 z-10">
                    „Singurul lucru pe care trebuie să îl cunoşti cu precizie este unde se află biblioteca.”
                </h1>
                <p className="text-white text-end text-[calc(1vw+1vh)] mt-2 w-[800px] mr-[15%] z-10">
                    Albert Einstein
                </p>
            </div>

            <div >
                <Cards/>
            </div>
            
            

            {/* <CategoryList /> */}
            <Banner className="bg-gray-100 shadow-lg rounded-lg p-4" />
            <BookCardH category={"literatura_clasica"} heading={"Top books : literatura clasica"} />
        </div>
    )
}

export default Home
