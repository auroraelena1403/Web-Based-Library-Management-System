import React, { useContext, useState } from 'react'
import logo from '../assets/LogoSiNume.png'
import { GrSearch } from "react-icons/gr";
import Imagine from '../assets/cardResurseE.jpg';
//import '../App.css'
import { Link, useLocation, useNavigate } from 'react-router';
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import Context from '../Context/Context';
import { FaUserCheck } from "react-icons/fa";
import summaryAPI from '../commons';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../commons/Role';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const navigate = useNavigate();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q");
    const [search, setSearch] = useState(searchQuery)



    const handleLogout = async () => {
        const fetchData = await fetch(summaryAPI.logoutUser.url, {
            method: summaryAPI.logoutUser.method,
            credentials: 'include'
        })

        const data = await fetchData.json()
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
        }
        if (data.error) {
            toast.error(data.message);
        }
    }
    // console.log("User Role:", user?.role); OK
    // console.log("Expected Role:", ROLE.ADMIN); OK

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/");
        }

    }

    return (
        <div>
            <header className='h-20 shadow-md bg-white  w-full '>
                <div className='h-full container mx-auto flex items-center px-4 justify-between '>
                    <div className=''>
                        <Link to={"/"}>
                            <p className='text-center text-base md:text-base mt-2 font-bold relative'>Studysphere</p>
                        </Link>
                    </div>

                    <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                        <input type='text' placeholder='caută produse...' className='w-full outline-none' onChange={handleSearch} value={search} />
                        <div className='text-lg min-w-[50px] h-8 bg-green-950 flex items-center justify-center rounded-r-full text-white'>
                            <GrSearch />
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mr-3'>

                        
                        <Link to={"/catalog"} className='text-center text-sm md:text-base mt-2 font-bold relative'>
                            <span>Catalog</span>

                            

                        </Link>

                        <Link to={"/about-us"} key={'aboutUs'} className='text-center text-sm md:text-base mt-2 font-bold relative mr-10'>
                        <span>Despre noi</span>

                        </Link>

                        
                        <div className='ml-4 relative flex justify-center'>
                            {
                                user?._id ? (
                                    <div className='text-3xl cursor-pointer relative flex justify-center'>

                                        <div className='' onClick={() => setMenuDisplay(preve => !preve)} >
                                            {
                                                user?.name ? (
                                                    <span className="flex flex-col items-center">
                                                        {/* <FaUserCheck className='w-10 h-6 ' /> */}
                                                        <div className='text-2xl relative'>
                                                            <span><FaUserCheck /></span>

                                                            <div className='bg-gray-500 text-white x-5 rounded-full p-1 flex items-center absolute -top-2 right-4 justify-center'>
                                                                <p className='text-xs '>{user?.name}</p>
                                                            </div>

                                                        </div>

                                                    </span>


                                                ) : (
                                                    <Link to={"/login"}>
                                                     <FaRegUser className='w-10 h-10 ' />
                                                    </Link>

                                                   
                                                )
                                            }
                                        </div>



                                    </div>

                                ) : (<Link to={"/login"}>
                                    <FaRegUser className='text-3xl' />
                                   </Link>)
                            }
                            {
                                menuDisplay && (<div className='absolute  bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded z-50'>
                                    <nav>
                {user?.role === ROLE.ADMIN ? (
                    <div>
                        <Link
                    to={"/admin-panel/all-products"}
                    className='whitespace-nowrap md:block hover:bg-slate-100 p-2 block'
                    onClick={() => setMenuDisplay(false)}
                >
                    Admin Panel
                </Link>

                <Link
                            to={'/adminOrders'}
                            className='whitespace-nowrap md:block hover:bg-slate-100 p-2 block'
                            onClick={() => setMenuDisplay(false)}
                        >
                            Comenzi
                        </Link>

                </div>
                    
                ) : (
                    <>
                        <Link
                            to={'/order'}
                            className='whitespace-nowrap md:block hover:bg-slate-100 p-2 block'
                            onClick={() => setMenuDisplay(false)}
                        >
                            Comenzi
                        </Link>
                        <Link
                            to={'/favorites'}
                            className='whitespace-nowrap md:block hover:bg-slate-100 p-2 block'
                            onClick={() => setMenuDisplay(false)}
                        >
                            Favorite
                        </Link>
                    </>
                )}
            </nav>
                                </div>)
                            }


                        </div>

                        <Link to={"/cart"} className='text-2xl relative'>
                            <span><FaCartShopping /></span>

                            <div className='bg-gray-500 text-white x-5 rounded-full p-1 flex items-center absolute -top-2 right-4 justify-center'>
                                <p className='text-xs'>{context?.cartProductCount}</p>
                            </div>

                        </Link>

                        <div className=''>
                            {
                                user?._id ? (
                                    <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-green-950 hover:bg-green-400'>Deconectare</button>
                                )
                                    : (
                                        <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-green-950 hover:bg-green-400'>Conectare</Link>
                                    )
                            }
                        </div>

                    </div>
                </div>

            </header>

        </div>
    )
}

export default Header
Header