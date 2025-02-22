import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {aToken,setAToken} = useContext(AdminContext);
    const navigate=useNavigate();

    const logoutHandler = () => {
        navigate('/')
        aToken && setAToken('');
        localStorage.removeItem('aToken');
        setAToken('');
    }
  return (
    <div className='fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 sm:px-10 border-b bg-white shadow-md'>
        <div className='flex text-xs items-center gap-2'>
            <img src={assets.admin_logo} alt="" className="h-12 w-36 cursor-pointer sm:w-40 "/>
            <p className='border px-1 py-0.5 rounded-full border-gray-500 text-gray-600'>
{aToken?'Admin':'Doctor'} Dashboard
            </p>
        </div>
      <button onClick={logoutHandler} className='bg-teal-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
