import React, {useState, useEffect} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 
import {  useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../redux/features/apiSlices/userApiSlice';
import { loginUser, setCredinttials } from "../redux/features/slices/authSlice"
import Loading from "../components/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Offline, Online, Detector } from "react-detect-offline";


const Login = () => {
  // state for login
  const [values, setValues] = useState({
    email:"",
    password:""
  }) 

  // mode handling
  const mode = useSelector((state)=> state.auth.mode);
  // const user = useSelector((state)=> state.auth.user);

  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // onchange function
  const handleChange = (e) =>{
    setValues({...values, [e.target.name] : e.target.value});
  }

  const [login, {isLoading}] = useLoginMutation();

  // handle submit 
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const { data } = await login(values);
    if(data.user){
      dispatch(setCredinttials(data.user))
      navigate("/")
    }
    if(data.err){
      toast.error(data.err)
    }
  }


  // useEffect(() => {
  //     if(user === null){
  //       navigate('/')
  //     }
    
  // }, []);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <section className={`p-4 md:h-screen transition-all duration-150 ease-in-out w-full  mx-auto md:mt-0 mt-10 h-auto ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} flex flex-col items-center justify-center`}>
      <div className='pb-4'>
    {isLoading && (
        <Loading/>
      )}
    </div>
      <div className={`md:p-10 p-4 grid xl:grid-cols-2 md:h-[80vh] h-auto lg:grid-cols-2 md:grid-cols-2 grid-cols-1 blur-glass justify-center gap-4 w-full max-w-5xl  mx-auto drop-shadow-xl ${mode === "dark" ? 'bg-darkfg' : 'bg-white'} rounded-lg`}>
      <span className='gradient-box'></span>
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-emerald-400 font-bold text-3xl'>Welcome Back</h1>
        <h2 className={`text-lg font-semibold ${mode === "dark" ? 'text-white' : 'text-gray-950'}`}>Login now</h2>
        <div className='w-96 h-96 flex items-center justify-center'>
        <img className='w-full object-cover' src="./images/khareedo-signup.svg" alt="khareedo-signup" />
        </div>
      </div>
      <form autoComplete='off' onSubmit={handleSubmit} className='flex justify-center  flex-col gap-4 w-full max-w-xl '>
      <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-emerald-400">Your Email?</span>
            </div>
            <input value={values.email} onChange={(e)=>handleChange(e)} type="email" placeholder="Email"  name='email' className={`input input-bordered ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'} w-full`} />
      </label>
      <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-emerald-400">Password</span>
            </div>
            <input value={values.password} onChange={(e)=>handleChange(e)} type="password" name='password' placeholder="Password" className={`input input-bordered ${mode === "dark" ? 'bg-darkufg text-lightbg placeholder:text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'} w-full`} />
      </label>
      <div>
        <button className='arrow-btn hover-button  bg-emerald-400 text-gray-800 font-semibold' type='submit'>
        <span className="button-text">Login</span>
          <span className="icon"><FaArrowRight/></span>
        </button>
        <span className={`flex gap-4 mt-4 ${mode === "dark" ? 'text-lightbg' : 'text-darkbg'}`}>Don't have an account ?<Link className='text-emerald-400' to="/register">Register</Link></span>
      </div>
      <ToastContainer />
      {/* <Detector
  render={({ online }) => (
    <div className={online ? "normal" : "warning"}>
      You are currently {online ? "online" : "offline"}
    </div>
  )}
/> */}
      </form>
    </div>
    </section>
  )
}

export default Login
