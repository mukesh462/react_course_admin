import React from 'react'
import { MainLogo } from '../components/Logos'

function Dashboard() {
  return (
    <div className='w-full h-[70svh] flex justify-center items-center'>
      <div className="text-3xl m-2 p-5 font-bold rounded-2xl bg-[#fbf8f8]">
        <MainLogo/>
      </div> 

    </div>
  )
}

export default Dashboard
