import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading"
import { useSellerRequestMutation } from '../redux/features/apiSlices/sellerApiSlice';

const BecomeSeller = () => {
    const {mode, user} = useSelector((state)=> state.auth)
    let isLoading = useSelector((state)=> state.auth.isLoading)
    const [values, setValues] = useState(
      {
        username:"",
        email:"",
        storeName:"",
        country:"",
        phone:"",
        city:"",
        state:""
      }
    )
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false)
    const handleChange = (e)=>{
      setValues({...values, [e.target.name] : e.target.value});
    }

    const [register]  =  useSellerRequestMutation()

    const handleSubmit =  async (e)=>{
      isLoading = true
      e.preventDefault();
      const res = await register(values)
      console.log(res.data.err);
      
      if(res.data.msg){
        toast.success(res.data.msg)
        isLoading = false
        setTimeout(() => {
          navigate('/waiting')
        }, 3000);
      }
      if(res.data.err){
        isLoading = false
        toast.error(res.data.err)
        // console.log(res.data.err);

      }
    }

    if(isLoading){
      return(
        <Loading/>
      )
    }
  return (
    <section className={` w-full relative z-[1] h-screen  pt-20 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
        <div className="absolute seler-bg w-1/2 right-0 bottom-0 h-1/2 bg-emerald-600 z-[-1] "></div>
        {/* registration form for become a seller */}
       {isSignup ? (
         <div className={`w-full h-full flex items-center justify-center absolute top-0 left-0 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
         <form autoComplete='off' onSubmit={handleSubmit} className={`${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'} flex p-4 rounded-lg  flex-col gap-4 w-full max-w-xl`}>
       <label className="form-control w-full">
             <div className="label">
               <span className="label-text text-emerald-400">What is your name?</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="username" type="text" value={values.username} placeholder="Username" className={` ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}  input input-bordered  w-full`} />
       </label>
       <label className="form-control w-full">
             <div className="label">
               <span className="label-text text-emerald-400">Your Email?</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="email" type="email" value={values.email} placeholder="Email" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
       </label>
       <label className="form-control w-full">
             <div className="label">
               <span className="label-text text-emerald-400">Store Name</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="storeName" type="text" value={values.storeName} placeholder="Enter Store Name" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
       </label>
       <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 items-center w-full'>
       <label className="form-control w-full ">
             <div className="label">
               <span className="label-text text-emerald-400">You From ?</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="country" type="text" value={values.country} placeholder="Country" className={`input input-bordered w-full  ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
       </label>
       <label className="form-control w-full ">
             <div className="label">
               <span className="label-text text-emerald-400">Phone</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="phone" type="number" value={values.phone} placeholder="Phone number" className={`input input-bordered    w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`}/>
       </label>
       </div>
       <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 items-center w-full'>
       <label className="form-control w-full ">
             <div className="label">
               <span className="label-text text-emerald-400">City</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="city" type="text" value={values.city} placeholder="Enter city" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
       </label>
       <label className="form-control w-full ">
             <div className="label">
               <span className="label-text text-emerald-400">State</span>
             </div>
             <input onChange={(e)=>handleChange(e)} name="state" type="text" value={values.state} placeholder="Enter State" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
       </label>
       </div>
       <div>
         <div className="flex gap-4 items-center">
         <button className='arrow-btn hover-button  bg-emerald-400 text-gray-800 font-semibold' type='submit'>
         <span className="button-text">Register</span>
           <span className="icon"><FaArrowRight/></span>
         </button>
         <span onClick={()=>setIsSignup(false)} className=' cursor-pointer text-sm bg-lightfg p-3 rounded-md '>Not Now</span>
         </div>
       </div>
       </form>
         </div>
       ) : (<div></div>)}
        {/* registration form for become a seller */}
      <div className={`xl:max-w-[1440px]  h-full flex items-center  lg:max-w-[1024px] mx-auto`}>
            <div className='w-1/2 flex flex-col gap-8'>
                <h1 className={`text-6xl leading-[4.5rem]  ${mode === "dark" ? 'text-lightfg' : 'text-darkufg'} `}>Become An <span className='text-emerald-500'>Khareedo</span> Seller</h1>
                <p className={`text-2xl xl:w-[500px] leading-[2rem] ${mode === "dark" ? 'text-lightbg' : 'text-darkufg'}`}>
                Start selling your products to a wider audience! Become a seller on our platform today and showcase your offerings to customers looking for unique items like yours. Sign up now to get started!
                </p>
                {user ? (
                  <button onClick={()=>setIsSignup(true)} className='bg-emerald-500 w-[150px] text-xl text-lightbg rounded-full px-6 py-2'>Get Started</button>
                ):(
                  <Link to="/register"  className='bg-emerald-500 w-[120px] text-xl text-lightbg rounded-full px-6 py-2'>Sign up</Link>
                )}
            </div>
            <div className="w-1/2">
                <img src="./images/becomeseller.svg" className='w-full' alt="" />
            </div>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default BecomeSeller
