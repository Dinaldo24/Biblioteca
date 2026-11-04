import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { GlobalCenter } from '../context/GlobalProvider'
import { FaUserShield, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import Viscardo from "../assets/Font/ViscardoAndGuamzn.jpg"

const Layout = () => {
    const navigate = useNavigate()
    const { user, logout, limpiarFiltros } = useContext(GlobalCenter)

    const irAlCatalogo = () => {
        if (limpiarFiltros) limpiarFiltros()
        navigate('/')
    }

    const handleLogout = () => {
        logout()
        irAlCatalogo()
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className='w-full bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 shadow-md flex items-center justify-between sticky top-0 z-40'>
                {/* Logo con la imagen del Colegio */}
                <div 
                    onClick={irAlCatalogo} 
                    className="flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                    title="Ir al inicio de la Biblioteca"
                >
                    <img 
                        src={Viscardo} 
                        alt="Logo Colegio Juan Pablo Vizcardo y Guzmán" 
                        className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full border-2 border-indigo-400 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">Biblioteca</span>
                        <span className="text-[9px] sm:text-[10px] text-indigo-300 font-medium tracking-wide">J. P. Vizcardo y Guzmán</span>
                    </div>
                </div>

                <div className='flex items-center gap-2 sm:gap-3'>
                    <Button 
                        onClick={irAlCatalogo} 
                        variant="ghost" 
                        size="sm"
                        className="text-white hover:bg-slate-800 cursor-pointer text-xs sm:text-sm px-2.5 sm:px-3"
                    >
                        Catálogo
                    </Button>

                    {user ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Button 
                                onClick={() => navigate('/adminZone/libros')} 
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm px-2.5 sm:px-4"
                            >
                                <FaUserShield className="text-sm" /> 
                                <span className="hidden sm:inline">Panel Admin</span>
                                <span className="sm:hidden">Admin</span>
                            </Button>
                            <span className="text-xs text-gray-300 hidden md:inline">
                                Hola, <strong>{user.username}</strong>
                            </span>
                            <Button 
                                onClick={handleLogout} 
                                variant="outline" 
                                size="sm" 
                                className="text-red-400 border-red-500/80 hover:bg-red-950/50 flex items-center gap-1 cursor-pointer text-xs px-2 sm:px-2.5"
                                title="Cerrar sesión"
                            >
                                <FaSignOutAlt /> 
                                <span className="hidden sm:inline">Salir</span>
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            onClick={() => navigate('/login')} 
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm px-2.5 sm:px-4"
                        >
                            <FaSignInAlt /> 
                            <span className="hidden sm:inline">Iniciar Sesión (Admin)</span>
                            <span className="sm:hidden">Ingresar</span>
                        </Button>
                    )}
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
