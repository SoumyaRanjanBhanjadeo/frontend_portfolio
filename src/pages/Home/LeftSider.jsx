import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Link } from 'react-router-dom';

const LeftSider = () => {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                    <Link to="https://www.facebook.com/">
                        <CiFacebook className='text-gray-400 icon' />
                    </Link>
                    <Link to="mailto:asish.bhanjadeo@gmail.com">
                        <CiMail className='text-gray-400 icon' />
                    </Link>
                    <Link to="https://www.instagram.com/asishbhanjadeo__/">
                        <IoLogoInstagram className='text-gray-400 icon' />
                    </Link>
                    <Link to="https://www.linkedin.com/in/soumya-ranjan-bhanjadeo-8073941a5">
                        <CiLinkedin className='text-gray-400 icon' />
                    </Link>
                    <Link to="https://github.com/SoumyaRanjanBhanjadeo">
                        <FiGithub className='text-gray-400 icon' />
                    </Link>
                </div>
                <div className='w-[1px] h-32 bg-[#183a3b] sm:hidden'></div>
            </div>
        </div>
    )
}

export default LeftSider
