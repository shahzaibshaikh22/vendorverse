import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { logoutUser } from '../redux/features/slices/authSlice' 
import { useNavigate } from 'react-router-dom';
import UploadAvatar from '../components/UploadAvatar';
import { isMobile } from 'react-device-detect';

const Home = () => {

  // state for uploading image 
  const [showUpload, setShowUpload] = useState(true);
  // user from redux
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();
  // jwt
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(logoutUser());
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
    else{
      navigate("/login")
    }
  },[token, navigate,user])
  
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');

    const handleDeviceTypeChange = () => {
      if (mediaQueryMobile.matches) {
        setDeviceType('Phone');
      } else if (mediaQueryTablet.matches) {
        setDeviceType('Tablet');
      } else if (mediaQueryDesktop.matches) {
        setDeviceType('Desktop');
      } else {
        setDeviceType('Unknown');
      }
    };

    handleDeviceTypeChange();

    mediaQueryMobile.addListener(handleDeviceTypeChange);
    mediaQueryTablet.addListener(handleDeviceTypeChange);
    mediaQueryDesktop.addListener(handleDeviceTypeChange);

    return () => {
      mediaQueryMobile.removeListener(handleDeviceTypeChange);
      mediaQueryTablet.removeListener(handleDeviceTypeChange);
      mediaQueryDesktop.removeListener(handleDeviceTypeChange);
    };
  }, []);

  return (
    <div className='w-full h-screen relative '>
      {user && !user.user.avatar && (
        <UploadAvatar showUpload={showUpload} setShowUpload={setShowUpload}/>
      )}
        <div className='w-full h-screen'>
        <h3>hasd</h3>
        <h3>hasd</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ab impedit placeat blanditiis ut facere iure ipsa aperiam in non? Fuga amet porro molestiae, autem minima tempore a optio quisquam.</p>
        <div>
        {deviceType && <p>You are using a {deviceType} device.</p>}
    </div>
        <button onClick={handleLogout} className='bg-emerald-400 text-white p-2 rounded-lg'>Logout</button>
      </div>
    </div>
  )
}

export default Home
