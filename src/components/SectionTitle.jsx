import React from 'react'

const SectionTitle = ({title}) => {
  return (
    <div className='flex gap-10 items-center'>
      <h1 className='text-3xl text-white py-11'>{title}</h1>
      <div className="w-60 h-[1px] bg-tertiary"></div>
    </div>
  )
}

export default SectionTitle
