import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'  

export interface Welcome {
      googleID: string;
      email: string;
      nombre: string;
      apellido: string;
      foto: string;
      token: string;
      iat: number;
}
const DasboardProfile = () => {


    const navigate =  useNavigate()
      const { token } = useParams()
      const [UserGoogle, setUserGoogle] = useState<Welcome>({} as Welcome)
      const estadoDeveloper = async () => {
            try {
                  let primero = await fetch('http://localhost:3000/auth/profile', {
                        method: 'GET',
                        headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "application/json"
                        }
                  })
                  let secudno = await primero.json()
                  setUserGoogle(secudno.msg)
            } catch (error) {
                  console.log(error)
                  return error
            }
      }
      useEffect(() => {
            if (token) {
                  localStorage.setItem('token', token)
                  estadoDeveloper()  
                   navigate("/dashboard")
            }  
      }, [])
      return (
            <>
                  {
                        !UserGoogle ? (
                              <p>Cargando...</p>
                        ) : (
                              <div className='w-md border rounded-sm mx-auto flex items-center *: flex-col m-2 shadow-2xl border-gray-200'>
                                    <h1 className='mt-2'>{UserGoogle.apellido}</h1>
                                    <h1 className='mt-2'>{UserGoogle.email}</h1>
                                    <h1 className='mx-2'>{UserGoogle.nombre}</h1>
                                    {
                                          UserGoogle.foto && <img className='rounded-full' src={UserGoogle.foto} alt='Imagen For google' ></img>
                                    }
                              </div>
                        )
                  }
            </>
      )
}

export default DasboardProfile