import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5 animate-pulse'>
        <div className='w-1/2 h-8 bg-gray-400'></div>
        <div className='w-1/2 h-8 bg-gray-400'></div>
        <div className='w-1/2 h-8 bg-gray-400'></div>
        
        <div className='w-1/2 h-8 bg-gray-400'></div>
    </div>
  )
}

export default loading