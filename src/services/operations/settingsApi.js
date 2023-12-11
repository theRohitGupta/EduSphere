import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    UPDATE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints


export function updateDisplayPicture(token,formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            // console.log(token,formData)
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("UPDATE DP RESONSE....",response.data.data)
            console.log(response.data.success)

            if(!response.data.success) throw new Error(response.data.message)

            toast.success("DP UPDATED SUCCESSFULLY")
            dispatch(setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data));
        }catch(err){
            console.log("DP CHNAGE FAILED", err)
            toast.error("Could Not Change DP")
        }
        toast.dismiss(toastId)
    }
}

export function updateUserDetails({token,firstName, lastName, dateOfBirth, gender, contactNumber, about}){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API,{
                firstName,lastName,dateOfBirth,gender,contactNumber,about
                },{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("UPDATED PROFILE RESPONSE", response.data.data);

            if(!response.data.data) throw new Error(response.data.message)

            toast.success("PROFILE UPDATED")
            dispatch(setUser(response.data.data))
            localStorage.setItem("user",JSON.stringify(response.data.data));
        }catch(err){
            console.log("PROFILE UPDATE FAILED", err)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export function updatePassword({token, oldPassword, newPassword}){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT", UPDATE_PASSWORD_API,{
                oldPassword, newPassword
            },{
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            })

            console.log("UPDATED PASSWORD RESPONSE", response);

            if(!response.data.success) throw new Error(response.data.message)

            toast.success("PASSWORD CHANGED SUCCESSFULLY")

        }catch(err){
            console.log("PASSWORD CHANGED FAILED")
            toast.error("Password Updation Failed")
        }
        toast.dismiss(toastId)
    }
}

export const deleteProfile = async(token) => {
    const toastId = toast.loading("DELETING...")
    try{
        const response = await apiConnector("DELETE", DELETE_PROFILE_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("PROFILE DELETED SUCCESSFULLY")
        localStorage.clear();
    }catch(err){
        console.log("PROFILE DELETION FAILED", err)
        toast.error('PROFILE DELETION FAILED')
    }
    toast.dismiss(toastId)
}