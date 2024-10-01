import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {

  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const listenToScroll = () => {
    let heightToHidden = 150;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, [])

  return (
    <div className='py-10'>
      <div className='h-[1px] w-full bg-gray-700'></div>

      <div className="flex items-center justify-center flex-col mt-10 opacity-70">
        <h1 className="text-white">
          Designed and Developed By
        </h1>
        <h1 className="text-white">
          <span className="text-white">Soumya Ranjan Bhanjadeo</span>
        </h1>
      </div>

      {isVisible &&
        <div className="fixed w-[50px] h-[50px] right-[20px] bottom-[10px] grid place-items-center bg-secondary text-white clip cursor-pointer z-30 transition ease delay-200 hover:translate-y-[-0.50rem]" onClick={goToBtn}>
          <FaArrowUp />
        </div>
      }
    </div>
  )
}

export default Footer
