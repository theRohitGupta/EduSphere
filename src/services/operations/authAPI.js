import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { resetCart } from "../../slices/cartSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints

export function sendOtp(email, navigate) {
    return async(dispatch) => {
        // const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SENDOTP_API, {
                email : email,
                checkUserPresent : true,
            })
            // console.log("SEND OTP API RESPONSE........", response.data.message)
            // console.log(response.data.success)

            if(!response.data.success) throw new Error(response.data.message)

            toast.success(response.data.message)
            navigate("/verify-email")
        }catch(err){
            // console.log("SEND OTP API ERROR..........", err)
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
        // toast.dismiss(toastId);
    }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async(dispatch) => {
        // const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, confirmPassword, otp
            })
            // console.log("SIGN UP API RESPONSE.......", response)
            // console.log(response.data.success)

            if(!response.data.success) throw new Error(response.data.message)

            toast.success("SIGNUP SUCCESSFULLY")
            navigate("/login")
        }catch(err){
            // console.log("SIGNUP FAILED........",err)
            toast.error(err.response.data.message);
            navigate("/signup")
        }
        dispatch(setLoading(false))
        // toast.dismiss(toastId)
    }
}

export function login({email, password, navigate}){
    return async(dispatch) => {
        // const toastId = toast.loading("Loading.....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })
            // console.log("LOGIN API RESPONSE...........", response)
            // console.log(response.data.success)

            if(!response.data.success) throw new Error(response.data.message)

            toast.success(response.data.message)
            dispatch(setToken(response.data.token))
            const userImage = response.data.user.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}` 
            dispatch(setUser({...response.data.user, image: userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        }catch(err){
            // console.log("LOGIN API ERROR.........",err)
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
        // toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        // const toastId = toast.loading("loading.....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', RESETPASSTOKEN_API, {
                email,
            })

            if(!response.data.success) throw new Error(response.data.message)
            // console.log(response)

            toast.success(response.data.message)
            setEmailSent(true)
        }catch(err){
            // console.log("RESET PASSWORD TOKEN ERROR......", err)
            toast.error(err.response.data.message)
        }
        // toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token, navigate){
    return async(dispatch) => {
        // const toastId = toast.loading("Loading.....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password, confirmPassword, token
            })
            // console.log("RESET PASSWORD RESPONSE.........", response)

            if(!response.data.success) throw new Error(response.data.message)

            toast.success(response.data.message)
            navigate("/login")
        }catch(err){
            // console.log("RESET PASSWORD FAILED...",err)
            toast.error(err.response.data.message)
        }
        // toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function logout(navigate){
    return (dispatch) => {
        const toastId = toast.loading("Logging Out...")
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.clear()
        toast.success("Logged Out")
        toast.dismiss(toastId)
        navigate("/")
    }
}