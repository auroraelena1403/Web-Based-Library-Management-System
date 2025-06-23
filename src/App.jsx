import { ToastContainer} from 'react-toastify';
import './output.css'
import './App.css'
import { Outlet } from "react-router";
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import summaryAPI from './commons';
import Context from './Context/Context';
import { useDispatch } from "react-redux";
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch=useDispatch();
  const [cartProductCount, setCartProductCount]=useState(0);
  const fetchUserDetails=async ()=>{

    const dataResponse = await fetch(summaryAPI.currentUser.url,{
      method:summaryAPI.currentUser.method,
      credentials:'include'
    })

    const dataApi=await dataResponse.json();
    //console.log("data-user", dataApi); OK
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(summaryAPI.countAddToCart.url,{
      method:summaryAPI.countAddToCart.method,
      credentials:'include'
    })

    const dataApi=await dataResponse.json();
    console.log("count", dataApi); 
    setCartProductCount(dataApi.data.count);
  }
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);
  

  return (
    <>
    <div className='bg-white'>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
      }} >
      <ToastContainer/>
    <Header/>
    <div className='min-h-[calc(100vh-180px)]'>
    <Outlet/>
    </div>
    <Footer/>
    </Context.Provider>
    </div>
      
    </>
  )
}

export default App
