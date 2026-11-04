import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { PropsDetalle } from "../assets/Data"
import { libros, obtenerPortada } from "../assets/Data"
import { GlobalCenter } from '../context/GlobalProvider'
import { Button } from '../components/ui/button'
import { FaBook, FaLongArrowAltLeft } from "react-icons/fa"

const SingleUser = () => {
    const navigate = useNavigate()
    const { titulo } = useParams<{ titulo: string }>()
    const { variable } = useContext(GlobalCenter) as { variable: PropsDetalle }

    const libroSeleccionado: PropsDetalle = (variable && variable.titulo) 
        ? variable 
        : (libros.find(l => l.titulo.toLowerCase() === decodeURIComponent(titulo || '').toLowerCase()) || libros[0])

    const Redirect = () => {
        navigate('/')
    }

    const portadaUrl = obtenerPortada(libroSeleccionado)

    return (
        <div className='min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6'>
            <div className='w-full max-w-4xl mb-4'>
                <button 
                    onClick={Redirect} 
                    className='flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 cursor-pointer font-medium text-sm transition-all'
                >
                    <FaLongArrowAltLeft /> Volver al Catálogo
                </button>
            </div>

            <div className='bg-white rounded-2xl shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-slate-200'>
                <div className='p-6 sm:p-8 flex flex-col justify-between order-2 md:order-1'>
                    <div>
                        <div className='flex items-center gap-2 text-indigo-600 mb-2'>
                            <FaBook className='text-xl' />
                            <span className='text-xs sm:text-sm font-bold uppercase tracking-wider'>{libroSeleccionado.genero}</span>
                        </div>
                        <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-4'>{libroSeleccionado.titulo}</h1>
                        
                        <div className='space-y-2 text-sm sm:text-base text-slate-700 mb-6'>
                            <p><strong className='text-slate-900'>Autor:</strong> {libroSeleccionado.autor}</p>
                            <p><strong className='text-slate-900'>Año de publicación:</strong> {libroSeleccionado.anio}</p>
                            <p><strong className='text-slate-900'>Páginas:</strong> {libroSeleccionado.paginas}</p>
                        </div>

                        <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                            Ejemplar disponible en la biblioteca escolar para consulta en sala o préstamo con el administrador.
                        </p>
                    </div>

                    <div className='pt-4 border-t border-slate-100 flex gap-3'>
                        <Button onClick={Redirect} className='bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'>
                            Ver más libros
                        </Button>
                    </div>
                </div>

                <div className='min-h-[280px] sm:min-h-[380px] bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 order-1 md:order-2 border-b md:border-b-0 md:border-l border-slate-200'>
                    <img 
                        src={portadaUrl} 
                        alt={libroSeleccionado.titulo}
                        className='max-h-[260px] sm:max-h-[350px] w-auto object-contain rounded-lg shadow-lg'
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleUser
