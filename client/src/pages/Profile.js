import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useProfileQuery } from '../redux/features/apiSlices/userApiSlice'
import { Label, input } from 'flowbite-react'
import { HiLocationMarker, HiMail, HiPhone, HiUpload, HiUser } from "react-icons/hi";
import { useUpdateProfileMutation } from '../redux/features/apiSlices/userApiSlice';
import { setCredinttials } from '../redux/features/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserMap from '../components/UserMap';
import UploadAvatar from '../components/UploadAvatar';

const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const mode = useSelector((state) => state.auth.mode)

  const { email,username,country,state,phone,phone2, token, _id } = user;
  const [showUpload, setShowUpload] = useState(false)

  const dispatch = useDispatch()
  
  const [values, setValues] = useState({
    email,
    username,
    country,
    state,
    phone,
    phone2,
    password:"",
    confirmPassword:""
  })

  const handleChange = (e) =>{
    setValues({...values, [e.target.name] : e.target.value});
  }

  
  // const { data } =  useProfileQuery(user.user.token);

  // if(data){
  //   dispatch(setCredinttials(data))
  // }
  // else{
  //   console.log("no");
  // }

  
  







// OSubmit function 
const [updateuser, {isLoading, isError}] = useUpdateProfileMutation();


const handleSubmit = async (e)=>{
  e.preventDefault();
  // if(values.password !== values.confirmPassword){
  //   toast.error("password is not matched!")
  // }
  const response = await updateuser(values)
    if(response.data.user){
      toast.success("profile updated successfully")
      dispatch(setCredinttials(response.data.user))
      values.password = "";
      values.confirmPassword = "";
    }
    if(response.data.err){
      toast.error(response.data.err)
      
    }
}


  return (
    <section className={`${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'} profile flex flex-col gap-4 w-full h-screen pt-20`}>
      <h1 className={`text-2xl text-center`}>My Profile</h1>
      
      <div className='w-full xl:max-w-[1440px] flex gap-12 items-center justify-center lg:max-w-[1024px] mx-auto  h-full'>
        <div className='relative w-full h-full flex items-center flex-col gap-4'>
          <div className='w-60 h-60 bg-gray-400 rounded-full p-1 flex items-center justify-center'>
           {user ? user.avatar !== "" &&(
             <img src={`http://localhost:5000/${user.avatar}`} className='w-full rounded-full h-full object-contain' alt="" />
           ) : (
            <img src="./images/profile.png" className='w-full rounded-full h-full object-contain' alt="" />
           )}
          </div>
          {showUpload &&(
            <UploadAvatar  showUpload={showUpload} setShowUpload={setShowUpload}/>
          )}
          <button onClick={()=>setShowUpload(true)} className='bg-transparent border-2 border-emerald-500 rounded-md px-4 flex items-center py-2 gap-2 font-semibold'><HiUpload/> Update photo</button>
        </div>
        <div className='w-full h-full'>
          <form onSubmit={handleSubmit} className='w-full h-full flex flex-col gap-4 '>
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="email" name="email" value="Your email" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="email"   type="email" name="email" onChange={(e)=>handleChange(e)} placeholder={values.email} value={values.email} required />
              </div>
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="username" value="Your username" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="username"  type="text" name="username" onChange={(e)=>handleChange(e)} placeholder={values.username} value={values.username} required />
              </div>

            <div className='flex w-full items-center gap-4'>
            <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="phone2" value="secondary Phone" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="phone2" type="number" name="phone2" onChange={(e)=>handleChange(e)} placeholder={values.phone2} value={values.phone2} required />
              </div>
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="phone" value="Your Phone" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="phone"  type="number" name="phone" onChange={(e)=>handleChange(e)} placeholder={values.phone} value={values.phone} required />
              </div>
            </div>
          
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="country" value="Your Country" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="country"   type="text" name="country" onChange={(e)=>handleChange(e)} placeholder={values.country} value={values.country} required />
              </div>
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="state" value="Your State/province" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="state"  type="text" name="state" onChange={(e)=>handleChange(e)} placeholder={values.state} value={values.state} required />
              </div>
              <div className='flex w-full items-center gap-4'>
            <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="password" value="Password" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="password" type="password" name="password" onChange={(e)=>handleChange(e)} placeholder={"update password"} value={values.password}  />
              </div>
              <div className="w-full max-w-lg">
                <div className="mb-2 block">
                  <Label className={`${mode === "dark" ? 'text-white' : 'text-darkbg'}`} htmlFor="cpass" value="re-type password" />
                </div>
                <input className={`w-full rounded-md border-[1px]  ${mode === "dark" ? 'bg-darkfg  text-lightgray' : 'bg-lightfg text-darkbg'}`} id="cpass"  type="password" name="confirmPassword" onChange={(e)=>handleChange(e)} placeholder={"confirm password"} value={values.confirmPassword} />
              </div>
            </div>
              <div>
            <button type='submit' className='bg-emerald-500 text-white rounded-md px-6 py-2'>Update</button>

              </div>
          </form>
        </div>
        <div className='w-full h-full'>
            <UserMap/>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Profile
