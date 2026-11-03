import { DropdownMenuDemo } from "./DropMenyZone"
import Viscardo from "../assets/Font/ViscardoAndGuamzn.jpg"
import { IoBookSharp } from "react-icons/io5"
import { MdSpaceDashboard } from "react-icons/md"
import { FaGlobe } from "react-icons/fa"
import { NavLink, Outlet, Link } from "react-router-dom"

const Tags = [
    { nombre: 'dashboard', label: 'Dashboard', icono: <MdSpaceDashboard className="text-lg" /> },
    { nombre: 'libros', label: 'Gestión de Libros', icono: <IoBookSharp className="text-lg" /> },
]

const AdminZone = () => {
    return (
        <div className="min-h-screen grid grid-cols-[64px_1fr] sm:grid-cols-[220px_1fr] bg-slate-50">
            {/* Sidebar */}
            <aside className="border-r border-slate-200 bg-white flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 border-b border-slate-200 p-3 bg-slate-50">
                        <img 
                            className="w-10 h-10 object-cover rounded-full border border-slate-300 flex-shrink-0" 
                            src={Viscardo} 
                            alt="Logo"
                        />
                        <div className="hidden sm:block overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 truncate">Biblioteca</p>
                            <p className="text-[10px] text-slate-500 truncate">Panel Admin</p>
                        </div>
                    </div>

                    <nav className="p-2 space-y-1">
                        {Tags.map((item, index) => (
                            <NavLink 
                                to={`/adminZone/${item.nombre}`} 
                                key={index}
                                className={({ isActive }) =>
                                    `flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                                        isActive 
                                            ? "bg-blue-50 text-blue-700 font-semibold shadow-sm" 
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`
                                }
                            >
                                <span className="hidden sm:inline">{item.label}</span>
                                <span className="text-slate-500">{item.icono}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="p-3 border-t border-slate-200">
                    <Link 
                        to="/"
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
                    >
                        <span className="hidden sm:inline">Ver Web Pública</span>
                        <FaGlobe className="text-sm" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col min-w-0">
                <header className="flex justify-between items-center px-6 py-3 bg-white border-b border-slate-200">
                    <div className="text-xs text-slate-400 font-medium hidden sm:block">
                        Panel de Administración • Sistema de Biblioteca
                    </div>
                    <div className="ml-auto">
                        <DropdownMenuDemo />
                    </div>
                </header>

                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminZone
