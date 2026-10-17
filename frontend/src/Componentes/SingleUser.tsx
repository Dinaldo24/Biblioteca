import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { PropsDetalle } from "../assets/Data"
import { GlobalCenter } from '../context/GlobalProvider'
import { Button } from '../components/ui/button'
import { FaBook } from "react-icons/fa";
import { Spinner } from '../components/ui/spinner'
import { FaLongArrowAltLeft } from "react-icons/fa";





const SingleUser = () => {

    let navigate = useNavigate()
    const Redirect = () => {

        navigate('/index')
    }
    const { variable } = useContext(GlobalCenter) as { variable: PropsDetalle }
    return (
        <>
            {
                Object.values(variable).length === 0 ? <Spinner></Spinner> :
                    <div className='border min-h-screen h-screen flex items-center justify-center  '>
                        <div className='border-gray-100 w-[60%] grid grid-cols-2  relative justify-around rounded-sm bg-[#f6fbfd] shadow-2xl   min-h-[70%]'>
                            <div className='relative  '>
                                <p className='font-stretch-semi-condensed    m-2 text-4xl decoration-2 mb-4'>{variable.titulo}</p>
                                <FaBook className='absolute top-3 right-4 text-2xl '></FaBook>
                                <p className='mx-2  rounded-sm mt-2'> <span className='text-gray-600'>Autor</span> :{variable.autor}</p>
                                < p className='mx-2   rounded-sm mt-2'> <span className='text-gray-600'>Genero</span> :  {variable.genero}</p>
                                <p className='mx-2   rounded-sm mt-2' > <span className='text-gray-600'>Paginas</span> : {variable.paginas}</p>
                                <p className='text-balance mx-2 mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque rerum accusantium, architecto qui omnis dolorum incidunt consequuntur nobis praesentium explicabo corporis odio repellendus veritatis repudiandae, et commodi autem labore ex.</p>
                                <Button variant={'outline'} className="mx-2 mt-2 cursor-pointer"> Libro</Button>
                                <hr className='my-5'></hr>
                                <div className=' w-full flex mx-2'>
                                    <Button className={"min-w-[70px]  mx-2"} variant={'outline'}  >Ver</Button>
                                    <Button className={"min-w-[70px] mx-2"} variant={'outline'}  >triller</Button>
                                    <Button className={"min-w-[70px] mx-2"} variant={'outline'}  >199</Button>
                                    <Button className={"min-w-[70px]"} variant={'outline'}  >Osasco</Button>
                                </div>
                                <div className=' min-h-[100px] 
                        w-full h-14 bg-linear-to-r from-blue-400 rounded-sm to-blue-100 absolute bottom-0 w-[100%]'>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div style={{
                                backgroundImage: `url(https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }} className='p-2 rounded-md hover:'>
                            </div>
                        </div>
                        <FaLongArrowAltLeft onClick={Redirect} className='absolute top-20 right-20 text-2xl p-1  bg-linear-to-r  from-gray-500 via-gray-900 to-black .  text-gray-200 cursor-pointer border h-10 w-10 rounded-full bg-black' ></FaLongArrowAltLeft>

                    </div>
            }


        </>
    )
}

export default SingleUser