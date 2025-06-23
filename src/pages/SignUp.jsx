import React from 'react'
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import summaryAPI from '../commons';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmedPassword: "",
  });

  const navigate=useNavigate();

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

    if (data.password === data.confirmedPassword) {

      const dataResponse = await fetch('http://localhost:8080/api/sign-up', {
        method: summaryAPI.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const dataApi = await dataResponse.json();
      //console.log(dataApi); OK
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login");
      }
      if(dataApi.error){
        toast.error(dataApi.message);
      }
      
    }
    else {
      toast.error("Parola nu se potrivește!");
      
    }
  }
  console.log(data);
  return (
    <div>
      <section id='sign-up'>
        <div className='mx-auto container p-4 '>

          <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded'>
            <div className='text-9xl mx-auto'>
              Sign up
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label>Nume: </label>
                <div className='bg-slate-200 p-2'>
                  <input
                    required
                    onChange={handleOnChange}
                    name='name'
                    value={data.name}
                    type='text'
                    placeholder='Introduceți numele dvs.'
                    className='w-full h-full outline-none bg-transparent '></input>
                </div>
              </div>

              <div className='grid'>
                <label>Email: </label>
                <div className='bg-slate-200 p-2'>
                  <input
                    required
                    onChange={handleOnChange}
                    name='email'
                    value={data.email}
                    type='email'
                    placeholder='Introduceți o adresă de email validă'
                    className='w-full h-full outline-none bg-transparent '></input>
                </div>
              </div>

              <div>
                <label>Parolă: </label>
                <div className='bg-slate-200 p-2 flex'>
                  <input
                    required
                    onChange={handleOnChange}
                    name='password'
                    value={data.password}
                    type={showPass ? "text" : "password"}
                    placeholder='Introduceți parola dorită'
                    className='w-full h-full outline-none bg-transparent'>

                  </input>
                  <div className='cursor-pointer text-xl mt-2 ml-1' onClick={() => setShowPass((prev) => !prev)}>
                    <span>
                      {
                        showPass ? (<FaEyeSlash />)
                          :
                          (<FaEye />)
                      }


                    </span>
                  </div>
                </div>



              </div>
              <div>
                <label>Confirmați parola: </label>
                <div className='bg-slate-200 p-2 flex'>
                  <input
                    required
                    onChange={handleOnChange}
                    name='confirmedPassword'
                    value={data.confirmedPassword}
                    type={showConfirmPass ? "text" : "password"}
                    placeholder='Reintroduceți parola de mai sus'
                    className='w-full h-full outline-none bg-transparent'>

                  </input>
                  <div className='cursor-pointer text-xl mt-2 ml-1' onClick={() => setConfirmShowPass((prev) => !prev)}>
                    <span>
                      {
                        showConfirmPass ? (<FaEyeSlash />)
                          :
                          (<FaEye />)
                      }


                    </span>
                  </div>
                </div>



              </div>

              <div>

                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sign-up</button>

              </div>
            </form>

            <p className='my-4'>Aveți deja un cont? <Link to={"/login"} className='hover:text-red-600 text-red-400 hover:underline'>Login</Link></p>

          </div>

        </div>
      </section>
    </div>
  )
}

export default SignUp
