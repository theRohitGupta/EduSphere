import React from 'react'
import Navbar from '../components/common/Navbar'
import LoginSignupTemplate from '../components/core/Forms/LoginSignupTemplate'
import login from "../assets/Images/login.webp"
import instructorLogin from "../assets/Images/instructorLogin.webp"
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'

function Login() {
  const {loading} = useSelector((state) => state.auth)
  return (
    <div className=' relative'>
      {
        loading ? (
          <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>
        ) : (
          <div>
            <Navbar backgroundColor={1}/>
          
            <LoginSignupTemplate
              studentTitle={"Welcome Back"}
              instructorTitle={"Welcome Back"}
              studentSubTitle={"Build skills for today, tomorrow, and beyond."}
              instructorSubTitle={"Discover your passions"}
              studentSpanText={"Education to future-proof your career."}
              instructorSpanText={"Be Unstoppable"}
              studentTemplateImage={login}
              instructorTemplateImage={instructorLogin}
              formType={"login"}
            />
      
          </div>
        )
      }
    </div>
  )
}

export default Login