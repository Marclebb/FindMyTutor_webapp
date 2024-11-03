import React from 'react'
import { useNavigate } from 'react-router-dom'
import error from './assets/error.png'

function Errorpage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/Card');  
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <img src={error} className='w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 m-8 sm:m-14' alt="Error" />
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center pb-4'>
        There was an error loading the page you are looking for
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-gray-600 text-center'>
        It's either because the page doesn't exist or you don't have access to it.
      </p>

      <button 
        onClick={handleRedirect} 
        className="mt-6 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300">
        Go back to homepage
      </button>
    </div>
  )
}

export default Errorpage
