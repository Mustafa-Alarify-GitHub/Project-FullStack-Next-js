import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5 animate-pulse'>
        <h1 className='text-3xl font-bold text-red-500'>Loding........</h1>
    </div>
  )
}

export default loading