import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/rootSlice'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(IoMdEyeOff);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const dispatch = useDispatch();

    const login = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/admin-login`, user);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem('token', JSON.stringify(response.data));
                window.location.href = '/admin';
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-primary'>
            <div className='w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white'>
                <h1 className='text-2xl text-center'>Admin Login</h1>
                <hr />
                <input type="text" placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <input type={showPassword ? "password" : "text"} placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <span className='eye-icon text-xl' onClick={togglePassword}>
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
                <button className='bg-primary text-white p-2' onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login
