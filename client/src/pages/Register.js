import React, {useState} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'; 
import {  useDispatch } from "react-redux"
import { setCredinttials } from '../redux/features/slices/authSlice'; 
import { useUserRegisterMutation } from '../redux/features/apiSlices/userApiSlice';
import { useNavigate} from 'react-router-dom'
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

const Register = () => {
  // empty state for form fields
  const [values, setValues] = useState(
    {
      username:"",
      email:"",
      country:"",
      phone:"",
      password:"",
      confirmPassword:""
    }
  )

  // theme handling
  let {mode, isLoading} = useSelector((state)=> state.auth);

  // instance of useNavigate
  const navigate = useNavigate();
  // useDispatch instance for usnig this function
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const user = useSelector((state) => state.auth.user);

  // onChange input fields function
  const handleChange = (e)=>{
    setValues({...values, [e.target.name] : e.target.value});
  }

  
  const [registration] = useUserRegisterMutation();
  // form submiting function 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    isLoading = true;
    const { data } = await registration(values);
   if(data.user){
    isLoading = false
    dispatch(setCredinttials(data.user))
    toast.success("OTP sent to your mail please verify your email!")
    setTimeout(() => {
      navigate('/verify')
    }, 5000);
   }
    if(data.err){
      toast.error(data.err)
    }
  }

  if(isLoading){
    return (
      <Loading/>
    )
  }

  return (
   


<section className={`p-4 md:h-screen transition-all duration-150 ease-in-out w-full  mx-auto md:mt-0 mt-10 h-auto ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} flex flex-col items-center justify-center`}>
<div className='pb-4'>
{isLoading && (
  <Loading/>
)}
</div>
<div className={`md:p-10 p-4 grid xl:grid-cols-2 md:h-[80vh] h-auto lg:grid-cols-2 md:grid-cols-2 grid-cols-1 blur-glass justify-center gap-4 w-full max-w-5xl  mx-auto drop-shadow-xl ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'} rounded-lg`}>
<span className='gradient-box'></span>
<div className='flex items-center justify-center flex-col'>
  <h1 className='text-emerald-400 font-bold text-3xl'>Get Started</h1>
  <h2 className={`text-lg font-semibold ${mode === "dark" ? 'text-white' : 'text-gray-950'}`}>Register now</h2>
  <div className='w-96 h-96 flex items-center justify-center'>
  <img className='w-full object-cover' src="./images/khareedo-signup.svg" alt="khareedo-signup" />
  </div>
</div>
<form autoComplete='off' onSubmit={handleSubmit} className='flex  flex-col gap-4 w-full max-w-xl'>
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
              <span className="label-text text-emerald-400">Password</span>
            </div>
            <input onChange={(e)=>handleChange(e)} name="password" type="password" value={values.password} placeholder="Password" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
      </label>
      <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-emerald-400">Confirm password</span>
            </div>
            <input onChange={(e)=>handleChange(e)} name="confirmPassword" type="password" value={values.confirmPassword} placeholder="re-type password" className={`input input-bordered   w-full ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'}`} />
      </label>
      </div>
      <div>
        <button className='arrow-btn hover-button  bg-emerald-400 text-gray-800 font-semibold' type='submit'>
        <span className="button-text">Register</span>
          <span className="icon"><FaArrowRight/></span>
        </button>
        <span className={`flex gap-4 mt-4 ${mode === "dark" ? 'text-lightbg' : 'text-darkbg'}`}>Already have an account<Link className='text-emerald-400' to="/login">Login</Link></span>
      </div>
      </form>
      
</div>
<ToastContainer />
</section>
)
}

export default Register
