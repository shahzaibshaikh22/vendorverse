import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isAuthenticated: false,
    token:localStorage.getItem("token") ? localStorage.getItem("token") : "",
    userAvatar:"",
    email:localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")): "",
    mode:"dark",
    isLoading:false,
    lenghts: localStorage.getItem('Length') ? localStorage.getItem('Length') : 0,
    wishLength: localStorage.getItem('wishLength') ? localStorage.getItem('wishLength') : 0
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
    },
    setCredinttials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setMode:(state)=>{
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(state.user.user.token));
      localStorage.setItem("email", JSON.stringify(state.user.user.email));
    },
    logoutUser: (state) => {
      state.user = localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.token = localStorage.removeItem("token");;
      localStorage.removeItem("Avatar")
      localStorage.removeItem("email")
    },
    getAvatar:(state,action) =>{
      state.userAvatar = action.payload
      localStorage.setItem("Avatar", JSON.stringify(action.payload))
    },
    setCartLength:(state, action)=>{
      //   localStorage.setItem('lenghtOfCart', JSON.stringify(action.payload))
      state.lenghts = action.payload
      localStorage.setItem('Length', JSON.stringify(action.payload))
    },
    setWishListLength:(state, action)=>{
      //   localStorage.setItem('lenghtOfCart', JSON.stringify(action.payload))
      state.wishLength = action.payload
      localStorage.setItem('wishLength', JSON.stringify(action.payload))
    }
  },
});

export const { loginUser, logoutUser, setWishListLength,setCredinttials,registerUser, setMode, getAvatar, setCartLength } = authSlice.actions;
export default authSlice.reducer