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
// import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'
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

    const [subLinks, setSubLinks] = useState([
        {
            "_id": "6578073b229167212952d9a0",
            "name": "Python",
            "description": "Python is a popular, high-level programming language renowned for its readability and versatility. Its clean syntax facilitates quick learning, making it ideal for beginners. With a vast ecosystem of libraries and frameworks, Python is used in web development, data science, machine learning, and more. Learning Python opens doors to diverse career opportunities, given its widespread adoption in various industries. Its simplicity, coupled with extensive community support, makes it an excellent choice for both beginners and experienced developers, enhancing programming skills and expanding career prospects."
        },
        {
            "_id": "65780ae4229167212952d9ac",
            "name": "Web Development",
            "description": "Web development involves creating websites and web applications. Learning it is crucial as the internet continues to shape our digital world. Mastering web development allows you to build dynamic, interactive platforms. Key technologies include HTML5 for structure, CSS3 for styling, and JavaScript for interactivity. Server-side frameworks like Node.js and Django enhance functionality. Frontend frameworks such as React, Angular, and Vue.js provide dynamic user interfaces. Additionally, understanding backend technologies like Express, Flask, and databases like MongoDB and MySQL is essential. Embracing web development ensures you're equipped for the latest tech trends and empowers you to contribute to the evolving digital landscape."
        },
        {
            "_id": "65780b5c229167212952d9b4",
            "name": "Blockchain",
            "description": "Blockchain is a decentralized, secure digital ledger technology. It ensures transparency, immutability, and trust in transactions. Learning blockchain, with languages like Solidity and frameworks like Ethereum, enables you to develop smart contracts, decentralized applications (DApps), and explore emerging technologies like Non-Fungible Tokens (NFTs). As blockchain disrupts industries such as finance, healthcare, and supply chain, acquiring blockchain skills positions you at the forefront of innovation. Familiarity with technologies like Hyperledger, Corda, and languages like Go and Rust further enhances your ability to contribute to cutting-edge decentralized solutions in the evolving tech landscape."
        },
        {
            "_id": "65780ba2229167212952d9b6",
            "name": "Cloud Computing",
            "description": "Cloud Computing involves accessing and managing computing resources over the internet. Technologies like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform provide scalable and on-demand services. Learning cloud computing is crucial as it offers cost efficiency, flexibility, and global accessibility. Embracing DevOps practices and tools like Docker and Kubernetes, along with proficiency in languages like Python, JavaScript (Node.js), and Go, are essential for cloud development. Mastering cloud computing opens doors to efficient application deployment, resource management, and facilitates the development of modern, scalable applications in today's tech landscape."
        },
        {
            "_id": "65780c0e229167212952d9b8",
            "name": "Data Science",
            "description": "Data Science involves extracting insights from data to inform decision-making. It employs techniques from statistics, mathematics, and computer science. In the era of big data, learning data science is crucial for deriving meaningful patterns and predictions. Key technologies include machine learning (utilizing TensorFlow, PyTorch), data visualization (using tools like Tableau), and programming languages such as Python and R. Mastering data science equips you to analyze complex datasets, enabling informed business decisions, predictive modeling, and automation. With the increasing reliance on data-driven insights across industries, learning data science is invaluable for staying competitive in today's tech-driven landscape."
        },
        {
            "_id": "65780c26229167212952d9ba",
            "name": "DevOps",
            "description": "DevOps is a collaborative approach that unifies software development and IT operations, emphasizing automation, continuous integration, and continuous delivery. Learning DevOps is crucial for streamlining software development processes, improving collaboration, and ensuring faster, more reliable releases. Embracing containerization tools like Docker, orchestration tools like Kubernetes, and infrastructure-as-code with Terraform are vital in DevOps practices. Proficiency in languages such as Python and Shell scripting is essential for automation. DevOps skills are highly sought after in the industry, as organizations increasingly adopt cloud technologies and seek efficient, agile development pipelines for successful software delivery."
        },
        {
            "_id": "65780c50229167212952d9bc",
            "name": "Android Development",
            "description": "Android development involves creating applications for the Android operating system using languages like Java and Kotlin. Kotlin, an officially supported language, is increasingly preferred for its conciseness and safety. Learning Android development is crucial due to the widespread use of Android devices globally. Embrace the latest technologies like Jetpack Compose for modern UIs, Kotlin Coroutines for asynchronous programming, and Android Architecture Components for scalable app design. Mastering Android development opens opportunities for creating cutting-edge mobile apps, contributing to a thriving ecosystem, and tapping into a vast user base on diverse devices, making it a valuable skill in the tech industry."
        }
    ]);

    // useEffect(() => {
    //     const fetchSublinks = async() => {
    //         // setLoading(true)
    //         try{
    //             const result = await fetchCourseCategories()
    //             setSubLinks(result);
    //         }catch(err){
    //             console.log("CANT FETCH CATEGORIES", err);
    //         }
    //         // setLoading(false)
    //     }
    //     fetchSublinks();
    // }, [])

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