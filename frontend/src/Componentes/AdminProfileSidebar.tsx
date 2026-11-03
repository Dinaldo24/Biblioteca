import React, { useContext, useState } from 'react'
import { GlobalCenter } from '../context/GlobalProvider'
import { useNavigate } from 'react-router-dom'
import { IoEllipsisVertical } from 'react-icons/io5'
import { FaUserCircle, FaGlobe, FaSignOutAlt, FaUserEdit, FaKey } from 'react-icons/fa'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { MdOutlineCheckCircle, MdOutlineWarning } from 'react-icons/md'

export const AdminProfileSidebar = () => {
    const { user, setUser, logout, authurl } = useContext(GlobalCenter)
    const navigate = useNavigate()

    const [menuAbierto, setMenuAbierto] = useState(false)
    const [modalAbierto, setModalAbierto] = useState(false)

    // Formulario de edición de perfil
    const [nombre, setNombre] = useState(user?.nombre || 'Administrador')
    const [nuevoUsername, setNuevoUsername] = useState(user?.username || 'admin')
    const [actualPassword, setActualPassword] = useState('')
    const [nuevaPassword, setNuevaPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')

    const [verActual, setVerActual] = useState(false)
    const [verNueva, setVerNueva] = useState(false)
    const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null)
    const [guardando, setGuardando] = useState(false)

    const handleAbrirModal = () => {
        setMenuAbierto(false)
        setNombre(user?.nombre || 'Administrador')
        setNuevoUsername(user?.username || 'admin')
        setActualPassword('')
        setNuevaPassword('')
        setConfirmarPassword('')
        setMensaje(null)
        setModalAbierto(true)
    }

    const handleGuardarPerfil = async (e: React.FormEvent) => {
        e.preventDefault()
        setMensaje(null)

        if (!actualPassword) {
            setMensaje({ tipo: 'error', texto: 'Debes ingresar tu contraseña actual para confirmar los cambios' })
            return
        }

        if (nuevaPassword && nuevaPassword !== confirmarPassword) {
            setMensaje({ tipo: 'error', texto: 'La nueva contraseña y su confirmación no coinciden' })
            return
        }

        if (nuevaPassword && nuevaPassword.trim().length < 3) {
            setMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener mínimo 3 caracteres' })
            return
        }

        setGuardando(true)

        try {
            const resp = await fetch(`${authurl}/editar-perfil`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentUsername: user?.username || 'admin',
                    newUsername: nuevoUsername.trim(),
                    newNombre: nombre.trim(),
                    actualPassword: actualPassword,
                    nuevaPassword: nuevaPassword ? nuevaPassword.trim() : null
                })
            })

            const data = await resp.json()

            if (resp.ok && data.exito) {
                setMensaje({ tipo: 'exito', texto: data.mensaje || '¡Perfil actualizado con éxito!' })
                const nuevoUserSession = {
                    ...user,
                    username: data.username || nuevoUsername,
                    nombre: data.nombre || nombre
                }
                localStorage.setItem('usuario_biblioteca', JSON.stringify(nuevoUserSession))
                setUser(nuevoUserSession)
                setActualPassword('')
                setNuevaPassword('')
                setConfirmarPassword('')
            } else {
                setMensaje({ tipo: 'error', texto: data.mensaje || 'No se pudo actualizar el perfil' })
            }
        } catch (err) {
            console.error(err)
            setMensaje({ tipo: 'error', texto: 'Error al contactar con el backend en ' + authurl })
        } finally {
            setGuardando(false)
        }
    }

    const handleCerrarSesion = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="relative border-t border-slate-200 p-2.5 bg-white">
            {/* Fila fija de Usuario */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition">
                <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="hidden sm:block overflow-hidden text-left">
                        <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                            {user?.nombre || user?.username || 'Administrador'}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">@{user?.username || 'admin'}</p>
                    </div>
                </div>

                {/* Botón 3 puntitos */}
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                    title="Opciones de perfil"
                >
                    <IoEllipsisVertical className="text-base" />
                </button>
            </div>

            {/* Menú flotante al dar clic en los 3 puntos */}
            {menuAbierto && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuAbierto(false)}
                    />
                    <div className="absolute bottom-16 left-2 right-2 sm:w-56 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <p className="text-xs font-bold text-slate-800 truncate">
                                {user?.nombre || 'Administrador'}
                            </p>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                Rol: {user?.rol || 'ADMIN'}
                            </span>
                        </div>

                        <button
                            onClick={handleAbrirModal}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition text-left cursor-pointer"
                        >
                            <FaUserEdit className="text-slate-400 text-sm" />
                            <span>Editar Perfil</span>
                        </button>

                        <button
                            onClick={() => {
                                setMenuAbierto(false)
                                navigate('/')
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition text-left cursor-pointer"
                        >
                            <FaGlobe className="text-slate-400 text-sm" />
                            <span>Ver Catálogo Público</span>
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        <button
                            onClick={handleCerrarSesion}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition text-left cursor-pointer"
                        >
                            <FaSignOutAlt className="text-rose-400 text-sm" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </>
            )}

            {/* Modal de Editar Perfil */}
            {modalAbierto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <FaUserCircle className="text-xl text-blue-600" />
                                <h3 className="font-bold text-lg">Editar Perfil de Administrador</h3>
                            </div>
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {mensaje && (
                            <div
                                className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2 ${
                                    mensaje.tipo === 'exito'
                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                                }`}
                            >
                                {mensaje.tipo === 'exito' ? (
                                    <MdOutlineCheckCircle className="text-base flex-shrink-0 mt-0.5 text-emerald-600" />
                                ) : (
                                    <MdOutlineWarning className="text-base flex-shrink-0 mt-0.5 text-rose-600" />
                                )}
                                <span>{mensaje.texto}</span>
                            </div>
                        )}

                        <form onSubmit={handleGuardarPerfil} className="space-y-3.5 text-left">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombre del Administrador"
                                    className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Nombre de Usuario
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevoUsername}
                                    onChange={(e) => setNuevoUsername(e.target.value)}
                                    placeholder="admin"
                                    className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <hr className="my-2 border-slate-100" />

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Nueva Contraseña (opcional)
                                </label>
                                <div className="relative">
                                    <input
                                        type={verNueva ? 'text' : 'password'}
                                        value={nuevaPassword}
                                        onChange={(e) => setNuevaPassword(e.target.value)}
                                        placeholder="Dejar en blanco para no cambiarla"
                                        className="w-full px-3 py-2 pr-10 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setVerNueva(!verNueva)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {verNueva ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            {nuevaPassword && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                        Confirmar Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmarPassword}
                                        onChange={(e) => setConfirmarPassword(e.target.value)}
                                        placeholder="Repite la nueva contraseña"
                                        className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Contraseña Actual <span className="text-rose-500">* (Requerida)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={verActual ? 'text' : 'password'}
                                        required
                                        value={actualPassword}
                                        onChange={(e) => setActualPassword(e.target.value)}
                                        placeholder="Tu contraseña actual"
                                        className="w-full px-3 py-2 pr-10 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setVerActual(!verActual)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {verActual ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Ingresa tu contraseña actual para autorizar los cambios.
                                </p>
                            </div>

                            <div className="pt-3 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalAbierto(false)}
                                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={guardando}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition cursor-pointer shadow"
                                >
                                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
