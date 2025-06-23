import React, { useContext, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import '../output.css'
import '../App.css'
import '../index.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import summaryAPI from '../commons';
import { toast } from 'react-toastify';
import Context from '../Context/Context';


const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  //const generalContext=useContext(Context);
  //console.log("generalContext", generalContext); OK
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse=await fetch(summaryAPI.signIn.url,{
      method:summaryAPI.signIn.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const dataApi=await dataResponse.json();
    console.log("data", dataResponse);
    
    if(dataApi.success){
      toast.success(dataApi.message);
      
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if(dataApi.error){
      toast.error(dataApi.message);
    }

  }
  console.log(data);
  return (
    <div className='' >
      <section id='login'>
        <div className='mx-auto container p-4 '>

          <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded'>
            <div className='text-9xl mx-auto'>
              Login
            </div>

            <form className='pt-6' onSubmit={handleSubmit}>

              <div className='grid'>
                <label>Email: </label>
                <div className='bg-slate-200 p-2'>
                  <input
                    onChange={handleOnChange}
                    name='email'
                    value={data.email}
                    type='email'
                    placeholder='Introduceți adresa de email'
                    className='w-full h-full outline-none bg-transparent '></input>
                </div>
              </div>

              <div>
                <label>Parolă: </label>
                <div className='bg-slate-200 p-2 flex'>
                  <input
                    onChange={handleOnChange}
                    name='password'
                    value={data.password}
                    type={showPass ? "text" : "password"}
                    placeholder='Introduceți parola'
                    className='w-full h-full outline-none bg-transparent'>

                  </input>
                  <div className='cursor-pointer text-xl' onClick={() => setShowPass((prev) => !prev)}>
                    <span>
                      {
                        showPass ? (<FaEyeSlash />)
                          :
                          (<FaEye />)
                      }


                    </span>
                  </div>
                </div>

                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>Parolă uitată? </Link>

              </div>

              <div>

                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>

              </div>
            </form>

            <p className='my-4'>Nu aveți un cont? <Link to={"/sign-up"} className='hover:text-red-600 text-red-400 hover:underline'>Sign-up</Link></p>

          </div>

        </div>
      </section>

    </div>
  )
}

export default Login
