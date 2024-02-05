import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()

  const checkToken=()=>{
      if(!localStorage.getItem("userInfo")){
        navigate("/")
      }
  }


  useEffect(()=>{
    checkToken();
  },[])


  return (
    <div className='border-2 border-gray-500 flex flex-col mt-28 justify-center items-center text-center'>
        <img src="checked.png" alt="" className='w-1/2 mx-auto'/> 
        <h1  className='items-center text-center m-auto mt-20 text-3xl font-bold'>Successfully logged in</h1>
    </div>
  )
}

export default Home