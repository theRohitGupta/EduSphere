import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/EduSphereLogo.png"
import { studentsEndpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API, 
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentsEndpoints

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => resolve(true)

        script.onerror = () => resolve(false)

        document.body.appendChild(script)
    })
}

async function sendPaymentSuccessEmail(response, amount, token){
    // console.log(response)
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, 
        {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount,
        }, {
            Authorization : `Bearer ${token}`
        })
    }catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERR...",err)
    }
}

// VERIFY PAYMENT
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....")
    dispatch(setPaymentLoading(true))
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, 
        {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(err){
        console.log("PAYMENT VERIFY ERROR",err)
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    // console.log(courses)
    const toastId = toast.loading("Loading...")
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.err("RAZORAPY SDK FAILED TO LOAD")
            return
        }

        // INITIATE ORDER
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, 
            {
                Authorization : `Bearer ${token}`
            }
        )

        if(!orderResponse.data.success) throw new Error(orderResponse.data.message)

        // console.log(process.env.REACT_APP_RAZORPAY_KEY);
        
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "EduSphere",
            description: "ThankYou for Purchasing The Course",
            image : rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(response){
                // SEND SUCCESSFULL MAIL
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                // VERIFY PAYMENT
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        } 

        // console.log(options)
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Payment Failed")
            console.log(response)
        })

    }catch(err){
        console.log("PAYMENT ERROR...")
        console.error(err)
        toast.error("PAYMENT COULD NOT BE INITIATED")
    }
    toast.dismiss(toastId);
}