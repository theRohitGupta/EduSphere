import React, { useCallback, useEffect, useRef, useState } from 'react' 
import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import SupStar from '../../../../common/SupStar';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import ReactPlayer from 'react-player';

function UploadFiles({name, label, register, errors, setValue, video=false, viewData=null, editData=null, disabled}) {
    // const course = useSelector((state) => state.course)
    // console.log(viewData, editData)
    const [files, setFiles] = useState(null);
    const [ previewSource, setPreviewSource ] = useState(viewData ? viewData : editData ? editData : "")
    // console.log(previewSource)

    const inputRef = useRef(null)

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        if(file){
            previewFile(file)
            setFiles(file)
        }
    }, [])

    useEffect(() => {
        register(name, {
            required : true,
        })
    }, [register])

    useEffect(() => {
        setValue(name, files)
    }, [files, setValue])

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    function fileSizeValidator(file) {
        if (file.size > 1024 ** 2 * 2) {
          return {
            code: 'size-too-large',
            message: `File Size is Greater than 2MB`,
          };
        }
        return null;
      }

    const cancelBtn = () => {
        setPreviewSource("")
        setFiles(null)
        setValue(name,null)
    }
      
    const {
        fileRejections, 
        getRootProps, 
        getInputProps, 
        isDragActive} = useDropzone({
            validator: !video ? fileSizeValidator : null,
            onDrop, 
            disabled : files === null ? false : true,
            accept: !video ? { 'image/*': ['.jpeg', '.png', '.jpg'] } : {'video/*' : [".mp4"]}, 
            maxFiles: 1})

  return (
    <div className=' relative'>
        <p className=' form-field-title'>{label} {!viewData && (<SupStar/>)}</p>
        <div className={` px-3 py-8 rounded-lg border-[1px] border-dashed border-richblack-600 bg-richblack-700`}>
            {
                previewSource ? (
                    <div className=' flex flex-col w-full gap-4'>  
                        {
                            !video ? (
                                <div className=' flex items-center flex-col gap-4'>
                                    <div className='w-full'>
                                        <p className=' text-left text-richblack-200 text-sm'>Image Preview</p>
                                        <p className=' text-pink-400 text-xs'>This image preview will be shown across all devices</p>
                                    </div>
                                    <img src={previewSource} alt={""} className=' object-cover aspect-video'/>
                                </div>
                            ) : (
                                <div className=' relative pt-[56.25%]'>
                                    <ReactPlayer
                                    className=' absolute top-0 left-0'
                                    url={previewSource}
                                    width='100%'
                                    height='100%'
                                    playsinline
                                    controls
                                    />
                                </div>
                            )
                        }
                        {
                            !viewData && (<button onClick={() => cancelBtn()} className={`text-richblack-25 text-xs hover:underline ${disabled ? "hidden" : ""}`}>Cancel</button>)
                        }
                    </div>
                ) :
                (<div {...getRootProps()} className='flex flex-col items-center gap-4'>
                    <input {...getInputProps()} ref={inputRef}/>
                    <div className=' p-3 rounded-full bg-pure-greys-800'><FiUploadCloud className=' text-yellow-50 h-5 w-5'/></div>
                    <div className=' text-sm leading-5 text-richblack-200 text-center'>
                        <p>Drag and drop an {video ? "Video" : "Image"},</p>
                        <p>or click to <span className=' text-yellow-50'>Browse</span> {video ? "" : "(Max 2MB)"}</p>
                    </div>
                    <div className=' text-xs text-richblack-200'>
                        <ul className=' flex gap-16 list-disc'>
                            <li>Aspect Ratio 16:9</li>
                            <li>Recommended Size 1024 x 576</li>
                        </ul>
                    </div> 
                </div>)
            }
            {fileRejections.map(({ file, errors }) => {
            return (
                <li key={file.path} className=' list-none text-yellow-50'>
                {file.path} - {file.size} bytes
                <ul className=' list-none text-pink-400'>
                    {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
                </li>
            );
            })}
        </div>
        {
            errors[name] && (
                <span className='form-error right-0'>{label} is Required</span>
            )
        }
    </div>
  )
}

export default UploadFiles