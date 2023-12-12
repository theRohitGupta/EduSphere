import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/EduSphereWhite.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Navbar/ProfileDropDown'
import LogBtns from '../core/Navbar/LogBtns'
import { IoIosArrowDown } from "react-icons/io"
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'
import { ACCOUNT_TYPE } from '../../utils/constants'
import Spinner from './Spinner'

function Navbar({backgroundColor}) {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    const [ loading, setLoading ] = useState(false)
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async() => {
        setLoading(true)
        try{
            const result = await fetchCourseCategories()
            setSubLinks(result);
        }catch(err){
            console.log("CANT FETCH CATEGORIES", err);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

  return (
    <div className={` fixed w-full z-[9999] ${backgroundColor===1 ? "bg-richblack-800":"bg-richblack-900"} top-0`}>
        <div className='flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto'>
                <Link to="/">
                    <img src={logo} alt="logo" width={160} height={32} loading='lazy'/>
                </Link>

                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" 
                                            ? (<div className=' flex gap-1 items-center group relative'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown/>
                                                
                                                <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                    {
                                                        loading ? (
                                                            <div className=' grid place-content-center min-h-[100px]'><Spinner/></div>
                                                        ) : (
                                                            <>
                                                            {
                                                                subLinks.length ? (
                                                                    subLinks.map((sublink, index) => {
                                                                        return (
                                                                            <Link to={`/catalog/${sublink.name.replaceAll(" ","-").toLowerCase()}`} key={index}>
                                                                                <p className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 capitalize' >
                                                                                    {sublink.name}
                                                                                </p>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                ) : (<div className=' text-center'>No Categories Created</div>)
                                                            }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>) 
                                            : (<Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* LOGIN SIGNUP BTN */}
                <div className='flex gap-x-6 items-center justify-end'>
                    {
                        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to={"/dashboard/cart"} className=' relative text-richblack-5'>
                                <AiOutlineShoppingCart className=' h-[20px] w-[20px]'/>
                                {
                                    totalItems > 0 && (
                                        <span className=' absolute -right-2 -top-[6px] font-bold text-xs text-black p-[1px] rounded-full aspect-square grid place-content-center w-[15px] h-[15px] bg-yellow-50'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }  
                    {
                        token === null && (
                            <div className=' flex gap-x-4'>
                                <LogBtns link={"/login"} text={"Log In"}/>
                                <LogBtns link={"/signup"} text={"Sign Up"}/>
                            </div>
                        )
                    } 
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar