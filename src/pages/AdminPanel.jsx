import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router';
import ROLE from '../commons/Role';


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate=useNavigate();
    useEffect(()=>{
       if(user?.role !== ROLE.ADMIN){
        navigate("/");
       }
    },[user])
    return (
        <div className='min-h-[calc(100vh-120px)] lg:flex h-full  hidden'>
            <aside className='bg-white min-h-full w-full max-w-40 shadow-md mt-1 '>
                <div className='h-32 bg-white flex justify-center items-center flex-col'>
                    <div className='text-3xl cursor-pointer relative flex justify-center ' >
                        {
                            user?.name ? (
                                <span className="flex flex-col items-center">
                                    {/* <FaUserCheck className='w-10 h-6 ' /> */}
                                    <div className='text-5xl relative'>
                                        <span><MdAdminPanelSettings /></span>

                                        

                                    </div>

                                </span>
                            ) : (
                                <FaRegUser className='w-10 h-10 ' />
                            )


                        }
                    </div>
                    <p>{user?.name}</p>
                    <p>{user?.role}</p>
                </div>

                <div>
                    {/* users */}
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-4'>
                <Outlet/>

                

            </main>
        </div>
    )
}

export default AdminPanel
