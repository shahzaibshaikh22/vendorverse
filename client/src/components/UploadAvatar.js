import React, {useState} from 'react'
import { FaStumbleuponCircle, FaTimes } from "react-icons/fa"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setCredinttials } from '../redux/features/slices/authSlice'

const UploadAvatar = ({showUpload, setShowUpload}) => {
    const [Avatar, setAvatar] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const user = useSelector((state)=>state.auth.user)
    const _id = user._id

    const dispatch = useDispatch()
    
    const handleUpload = (e)=>{
              e.preventDefault();
              const formData = new FormData();
              formData.append('image', Avatar);
              formData.append('_id', _id);
              console.log(formData);
              axios.post("http://localhost:5000/upload", formData)
              .then(res=> dispatch(setCredinttials(res.data.user)) )
              .catch(err=>console.log(err.message))
              setAvatar("")
              setIsSubmit(true)
    }
  return (
    <div className={showUpload ? 'scale-100 w-full h-screen  bg-zinc-800 transition-all duration-150 ease-in-out z-[10]  fixed top-0 left-0 flex items-center justify-center' : 'scale-0 w-full h-screen ease-in-out  bg-zinc-800 transition-all duration-150  fixed z-[10] top-0 left-0 flex items-center justify-center'}>
    {isSubmit ? (
      <div className='w-full max-w-lg mx-auto flex flex-col gap-4 items-center justify-center bg-zinc-800 p-4 rounded-lg drop-shadow-lg'>
        <h3 className='text-3xl text-emerald-500'>Uploaded Successfully!</h3>
        <FaStumbleuponCircle/>
      </div>
    ): (
      <div className={showUpload ? 'uploadModal bg-zinc-800 flex flex-col gap-2 p-4 w-full max-w-lg rounded-lg drop-shadow-md' : 'bg-zinc-800 uploadModal flex flex-col gap-2 p-4 w-full max-w-lg rounded-lg drop-shadow-md'}>
      <div className='flex w-full items-center justify-between'>
        <h3 className='text-2xl'>set up  profile photo</h3>
        <FaTimes onClick={()=>setShowUpload(false)} className='text-2xl cursor-pointer hover:text-emerald-400'/>
      </div>
      <form onSubmit={handleUpload} className='pt-4 pb-4 w-full flex items-center  flex-col'>
            <lord-icon
          src="https://cdn.lordicon.com/smwmetfi.json"
          trigger="loop"
          colors="primary:#00a96e"
          style={{width:"100px", height:"100px"}}>
      </lord-icon>
      <input type="file"  onChange={(e)=>setAvatar(e.target.files[0])}  className="file-input file-input-bordered file-input-success w-full" />
        {Avatar !== "" && (
             <div className='flex w-full items-center justify-end gap-2 pt-4'>
             <button onClick={()=>setShowUpload(false)} className='bg-zinc-900 text-white rounded-lg px-6 py-2'>Not Now</button>
             <button type='submit' className='bg-emerald-400 text-gray-800 font-semibold rounded-lg px-6 py-2 disabled'>Upload</button>
           </div>
        )}
      </form>
     
    </div>
    )}
  </div>
  )
}

export default UploadAvatar
