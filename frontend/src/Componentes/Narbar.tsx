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
        <div>
            <header className='w-full bg-slate-900 text-white px-6 py-3 shadow-md flex items-center justify-between'>
                {/* Logo con la imagen del Colegio */}
                <div 
                    onClick={irAlCatalogo} 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                    title="Ir al inicio de la Biblioteca"
                >
                    <img 
                        src={Viscardo} 
                        alt="Logo Colegio Juan Pablo Vizcardo y Guzmán" 
                        className="w-9 h-9 object-cover rounded-full border-2 border-indigo-400 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-bold tracking-tight text-white leading-tight">Biblioteca</span>
                        <span className="text-[10px] text-indigo-300 font-medium tracking-wide">J. P. Vizcardo y Guzmán</span>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <Button 
                        onClick={irAlCatalogo} 
                        variant="ghost" 
                        className="text-white hover:bg-slate-800 cursor-pointer"
                    >
                        Catálogo
                    </Button>

                    {user ? (
                        <>
                            <Button 
                                onClick={() => navigate('/adminZone/libros')} 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 cursor-pointer"
                            >
                                <FaUserShield /> Panel Admin
                            </Button>
                            <span className="text-xs text-gray-300 hidden sm:inline">
                                Hola, <strong>{user.username}</strong>
                            </span>
                            <Button 
                                onClick={handleLogout} 
                                variant="outline" 
                                size="sm" 
                                className="text-red-400 border-red-500 hover:bg-red-950/50 flex items-center gap-1 cursor-pointer"
                            >
                                <FaSignOutAlt /> Salir
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={() => navigate('/login')} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 cursor-pointer"
                        >
                            <FaSignInAlt /> Iniciar Sesión (Admin)
                        </Button>
                    )}
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
