import React from 'react'
import FormSession from './FormSession'
import Hero from "../assets/Font/images.jpg"

const InicarSession = () => {
    return (

        <div className='min-h-screen bg-gradient-to-b flex  justify-center from-black via-sky-950  to-gray-800    relative '>
            <div className='absolute text-white border   h-screen w-[50%] rounded-full  blur-2xl'><h1></h1></div>
            <div className='absolute text-white border  right-0 w-200  h-screen w-[50%] bg-indigo-800/15 rounded-full   
            blur-2xl'><h1></h1></div>
            <div className="box    
            bg-linear-to- from-gray-800 from-10% via-grey-00 via-50% to-gray-800 to-60% ...
            text-white z-10 flex items-center justify-center">
                <FormSession></FormSession>
            </div>

        </div>

    )

}

export default InicarSession