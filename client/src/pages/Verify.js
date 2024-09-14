import React, { useState, useRef, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useResendOtpMutation, useVerifyOtpMutation } from '../redux/features/apiSlices/userApiSlice'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user.email);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [values, setValues] = useState({
    email:user.email
  });

  // timer of 1 minute

  const [seconds, setSeconds] = useState(60);

  // state for user data 
  if(user){
    let email;
     email = user.email
  }
  const navigate = useNavigate()


  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const { value } = e.target;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input field
      if (index < otp.length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      }
  };
  const [verifyOtp, {isLoading, isError}] =useVerifyOtpMutation()

  const handleSubmit =async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    let userCre = {
      otp:enteredOtp,
      email:user.email
    }
    const {  data }  = await verifyOtp(userCre);
    if(data.msg){
      toast.success(data.msg)
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }
    if(data.err){
      toast.error(data.err)
    }
    // Reset OTP input fields
    setOtp(['', '', '', '', '', '']);
    // Handle further actions after OTP verification
  };

  // resend OTP request
  const [resendotp] = useResendOtpMutation();


  const handleResendOtp = async()=>{
    const { data } = await resendotp(values)
    if(data.msg){
      toast.success(data.msg)
    }
    if(data.err){
      toast.success(data.err)
    }
    // reset opt time again
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          // You can add code here to handle timer completion
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, []);


  if(isLoading){
    return(
      <h1>Checking</h1>
    )
  }

  return (
    <section className='w-full h-screen bg-zinc-900 max-w-lg mx-auto  justify-center px-6'>
        <div className='w-full mt-10 bg-zinc-800 drop-shadow-lg flex flex-col gap-4 items-center p-5 border-t-4 border-emerald-400'>
      <h1 className='text-2xl text-emerald-400 font-semibold'>Email Verification</h1>
      <FaLock className='text-gray-500 text-3xl'/>
      <h2>Enter 6 digit OTP code sent to your email</h2>
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <div className='flex gap-4 w-full'>
        {otp.map((digit, index) => (
          <input
            className='w-full h-16 flex items-center justify-center text-center border-2 border-gray-500 focus:outline-none focus:border-emerald-500 rounded-md text-5xl'
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            name="otp"
            value={digit}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
        </div>
        <span className='text-sm flex items-center gap-2 text-emerald-400'>Pin code will expires after  <span>{`${Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`}</span></span>
          <div className=''>
          <span className='text-xs'>Din't recieve pin code ? </span>
          <span onClick={handleResendOtp} className='text-xs text-emerald-400 cursor-pointer'>sent again</span>
      </div>
        <button className='bg-emerald-400 p-3 text-gray-900 text-lg rounded-md font-semibold' type="submit">Verify</button>
      </form>
    </div>
        <ToastContainer />
    </section>
  );
};

export default Verify;
