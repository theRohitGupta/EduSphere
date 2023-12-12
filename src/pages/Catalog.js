import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Slider from '../components/core/Catalog/Slider'
import { useParams } from 'react-router-dom'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI'
import { getCatalogPageData } from '../services/operations/catalogData'
import CourseCard from '../components/core/Catalog/CourseCard'
import Spinner from '../components/common/Spinner'

function Catalog() {
  const {catalogName} = useParams()
  const [ catalogPageData, setCatalogPagedata ] = useState(null)
  const [ categoryId, setCategoryId ] = useState("")
  const [ activeCategory, setActiveCategory ] = useState(0)
  const [loading, setLoading] = useState(false)
  const courseCategory = ["Most Popular", "New", "Trending"]

  // FETCH ALL CATGEORIES
  useEffect(() => {
    const getCategories = async() => {
      setLoading(true)
      const result = await fetchCourseCategories();
      const category_id = result.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
      // console.log(category_id)
      setCategoryId(category_id)
      // setLoading(false)
    }
    getCategories()
  },[catalogName])

  useEffect(() => {
    const getCategoryDetails = async() => {
      setLoading(true)
      try{
        if(categoryId){
          const result = await getCatalogPageData(categoryId)
          // console.log(result)
          // console.log(result?.data?.data)
          setCatalogPagedata(result?.data?.data)
        }
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    }
    getCategoryDetails()
  },[categoryId])

  return (
    <div className=' relative'>
      {
        loading ? (
          (<div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>)
        ) : (
          <div className=' text-white'>
            <Navbar backgroundColor={1}/>
            
            <div className='bg-richblack-800'>
              <div className='flex flex-col justify-between w-10/12 mx-auto pt-[100px] pb-8'>
                  <div className=' flex flex-col gap-4'>
                    <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Catalog / <span className=' text-yellow-50'>{catalogPageData?.selectedCategory?.name}</span></p>
                    <p className=' text-3xl leading-9 text-richblack-5 font-semibold'>{catalogPageData?.selectedCategory?.name}</p>
                    <p className=' text-richblack-300 text-sm font-normal'>{catalogPageData?.selectedCategory?.description}</p>
                  </div>
              </div>
            </div>

            <div className=' pt-8 pb-16 flex flex-col gap-12 w-10/12 mx-auto'>
                {/* SECTION 1 */}
                <div className='flex flex-col justify-between gap-2'>
                  <p className=' text-2xl leading-9 text-richblack-5 font-semibold'>Courses to get you started</p>
                  <div className='border-b-[1px] border-richblack-300 pt-6 relative'>
                    <div className="absolute flex gap-4 text-sm top-1">
                      {
                        courseCategory.map((category,index) => (
                          <p key={index} className={`cursor-pointer border-b-[1px] px-1 ${activeCategory===index ? " text-yellow-50 border-yellow-50" : " text-richblack-300 border-richblack-300"}`} onClick={() => setActiveCategory(index)}>{category}</p>
                        ))
                      }
                    </div>
                  </div>
                  <div className=' mt-4'>
                    <Slider Courses={catalogPageData?.selectedCategory?.courses}/>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className='flex flex-col justify-between gap-4'>
                  <p className=' text-2xl leading-9 text-richblack-5 font-semibold'>Top Courses in {catalogPageData?.selectedCategory?.name}</p>
                  <div>
                    <Slider Courses={catalogPageData?.differentCategories?.courses}/>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className='flex flex-col justify-between gap-4'>
                  <p className=' text-2xl leading-9 text-richblack-5 font-semibold'>Frequently Bought</p>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8'>
                      {
                          catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index) => (
                            <CourseCard course={course} key={index} Height={"h-[300px]"}/>
                          ))
                      }
                    </div>
                </div>
            </div>

            <Footer/>
          </div>
        )
      }
    </div>
  )
}

export default Catalog