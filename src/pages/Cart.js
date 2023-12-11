import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RatingStars from '../components/common/RatingStars'
import getAvgRating from '../utils/avgRating'
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart } from '../slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import IconBtn from '../components/common/IconBtn'
import { buyCourse } from '../services/operations/paymentApi'

function Cart() {
  const { cart, totalItems, total } = useSelector((state) => state.cart)
  // console.log(cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  const { token } =useSelector((state) => state.auth)
  // console.log(user)
  const avgRating = (course) => {
    return getAvgRating(course.ratingsAndReviews)
  }

  const handleBuyCourse = () => {
    if(token){
      let courses = []
      cart.forEach((course) => {
        courses.push(course._id)
      })
      // console.log(courses)
      buyCourse(token,courses , user, navigate, dispatch)
      return;
    }
  }

  return (
    <div>
      <div className=' flex flex-col gap-8'>
        <div className=' flex flex-col gap-3'>
          <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Catalog / <span className=' text-yellow-50'>Cart</span></p>
          <p className=' text-3xl leading-9 text-richblack-5 font-normal'>Checkout</p>  
        </div>
        {
          totalItems > 0 ? (
            <div className=' flex gap-4'>
              <div className=' flex flex-col gap-8 w-[70%]'>
                <p className=' text-richblack-300 text-base font-normal'>Order Summary</p>
                <div className=' flex flex-col gap-6 text-white'>
                  {
                    cart.map((course,index) => (
                      <div key={index} className={`flex gap-5 pb-5 ${totalItems-1 !== index ? "border-b-[1px] border-richblack-700" : ""}`}>
                        <img src={course.thumbnail} alt={course.courseName} className=' h-[150px] aspect-video object-cover rounded-md'/>
                        <div className=' flex flex-col gap-2 w-[60%]'>
                          <p className=' text-lg font-semibold text-richblack-5'>{course.courseName}</p>
                          <div className=' flex gap-1 text-xs text-yellow-50'>
                            {
                              course.tag.slice(0,4).map((item,i) => (
                                <div key={i} className=' py-1 px-2 bg-richblack-800 rounded-3xl'>{item}</div>
                              ))
                            }
                          </div>
                          <p className=' text-richblack-300 text-xs font-normal'>Instructor: {course.instructor.firstName} {course.instructor.lastName}</p>
                          <div className=' flex gap-2 text-richblack-25 text-xs items-center'>
                            <span className=' text-yellow-50'>{avgRating(course) || 0}</span>
                            <RatingStars Review_Count={avgRating(course)} Star_Size={15}/>
                            <span>({course?.ratingsAndReviews?.length} ratings)</span>
                          </div>
                        </div>
                        <p className=' w-[15%] text-yellow-50 font-bold text-lg text-center'>&#8377; {Intl.NumberFormat("en-US").format(course.price)}</p>
                        <button onClick={() => dispatch(removeFromCart(course))} className='flex justify-start mt-1'><AiOutlineDelete className=' hover:text-pink-100 duration-200 h-fit w-fit hover:scale-110'/></button>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className=' w-[30%] bg-richblack-800 rounded-lg px-4 py-6 h-fit border-richblack-700 border-2'>
                  <div className=' flex flex-col'>
                      <p className=' text-base font-medium text-richblack-50'>Payment Details</p>
                      <ul className=' list-none text-richblack-300 text-sm flex flex-col gap-1 mt-2'>
                        <li>Own this course by completing checkout</li>
                        <li>Please re-verify your details from <Link className='text-yellow-50' onClick={() => navigate("/dashboard/my-profile")}>My Profile Page</Link> before checkout</li>
                        <li className=' text-pink-100 text-xs'>Your prefilled details will be used to generate reciept</li>
                      </ul>
                      <div className=' p-4 border-[1px] border-richblack-700 text-richblack-5 rounded-lg mt-6 text-sm'>
                        <p>Full Name: <span className=' text-yellow-50'>{user.firstName} {user.lastName}</span></p> 
                        <p className=' mt-2'>Email ID: <span className=' text-yellow-50'>{user.email}</span></p>
                        <hr className=' my-4 text-richblack-700'/>
                        <div className=' flex justify-between'>
                          <p className=' text-richblack-300'>Total</p>
                          <p className=' text-richblack-5'>&#8377; {Intl.NumberFormat("en-US").format(total)}/-</p>
                        </div>
                        <div className=' w-full mt-3'>
                          <IconBtn customWidth={"w-full flex items-center justify-center"} onclick={() => handleBuyCourse()}>Pay &#8377;{Intl.NumberFormat("en-US").format(total)}</IconBtn>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          ) : (
            <p className=' text-richblack-100 text-xl left-6 font-normal flex items-center justify-center mt-[25%]'>Add Some Courses to Checkout</p>
          )
        }
      </div>
    </div>
  )
}

export default Cart