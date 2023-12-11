import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/settingsApi';
import { FiUpload } from "react-icons/fi"
import toast from 'react-hot-toast';

function ChangeDp() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const [ loading,setLoading ] = useState(false)
    const [ selectedImage, setSelectedImage ] = useState(null)
    const [ imageFile,setImageFile ] = useState(user.image);

    const inputRef = useRef(null);

    const handleFileChange = e => {
        e.preventDefault()
        if(!e.target.files[0]) return
        setSelectedImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!selectedImage) {toast.error(<>Please Select an Image</>); return}
        try{
            setLoading(true)
            const formData = new FormData();
            formData.append('dp', selectedImage);
            dispatch(updateDisplayPicture(token,formData)).then(() => setLoading(false))
        }catch(err){
            console.log("CANT CHANGE DP ERR",err.message)
        }
    }

    useEffect(() => {
        setImageFile(user.image);
    }, [user])

  return (
    <div className=' flex gap-5 w-full justify-around items-center border-[1px] border-richblack-700 p-5 rounded-lg bg-richblack-800'>
        <img src={selectedImage ? URL.createObjectURL(selectedImage) : imageFile} alt={`profile-${user.firstName}`} className=' aspect-square rounded-full object-cover h-20'/>
        <div className=' w-[80%] flex gap-4 flex-col'>
            <p className='font-normal text-lg text-richblack-5'>Change Profile Picture</p>
            <div className=' flex gap-4'>
                {
                    !loading && (<div>
                        <input className=' hidden' ref={inputRef} type='file' accept='image/*' onChange={handleFileChange}/>
                        <button onClick={() => inputRef.current.click()} className=' common-btn bg-richblack-700 text-richblack-5 py-1 px-5' disabled={loading}>Select</button>
                    </div>)
                }
                <div className={`common-btn ${loading ? " bg-richblack-700 text-richblack-5" : "bg-yellow-50 text-richblack-900"} py-1 px-5`} onClick={handleSubmit}>
                    <button type='submit' className=' flex place-items-center gap-2' disabled={loading}>{loading ? <>Uploading...</> : <>Upload<FiUpload/></>}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeDp