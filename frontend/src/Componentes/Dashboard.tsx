import React, { useContext, useEffect, useState } from 'react'
import { GlobalCenter } from '../context/GlobalProvider'
import { GetallBook } from '../helpers/llamada'
import type { PropsDetalle } from '../assets/Data'
import { libros as librosIniciales } from '../assets/Data'
import { useNavigate } from 'react-router-dom'
import { 
  MdSpaceDashboard, 
  MdCategory, 
  MdOutlineAdminPanelSettings,
  MdOutlineCheckCircle,
  MdOutlineWarning
} from 'react-icons/md'
import { FaBookOpen, FaDatabase, FaServer, FaKey } from 'react-icons/fa'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Dashboard = () => {
  const { user, backurl, authurl } = useContext(GlobalCenter)
  const navigate = useNavigate()

  const [libros, setLibros] = useState<PropsDetalle[]>([])
  const [cargando, setCargando] = useState(true)

  // Estados para Cambiar Contraseña
  const [mostrarModalPass, setMostrarModalPass] = useState(false)
  const [actualPassword, setActualPassword] = useState('')
  const [nuevaPassword, setNuevaPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [verActual, setVerActual] = useState(false)
  const [verNueva, setVerNueva] = useState(false)
  const [passMensaje, setPassMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null)
  const [enviandoPass, setEnviandoPass] = useState(false)

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await GetallBook(backurl)
        if (Array.isArray(data) && data.length > 0) {
          setLibros(data)
        } else {
          setLibros(librosIniciales)
        }
      } catch (err) {
        console.error('Error cargando libros para dashboard:', err)
        setLibros(librosIniciales)
      } finally {
        setCargando(false)
      }
    }
    cargarLibros()
  }, [backurl])

  // Métricas calculadas
  const totalLibros = libros.length
  const totalPaginas = libros.reduce((acc, curr) => acc + (Number(curr.paginas) || 0), 0)
  const promedioPaginas = totalLibros > 0 ? Math.round(totalPaginas / totalLibros) : 0

  // Distribución por géneros
  const generosMap = libros.reduce((acc: { [key: string]: number }, curr) => {
    const g = curr.genero || 'Sin género'
    acc[g] = (acc[g] || 0) + 1
    return acc
  }, {})

  const generosLista = Object.entries(generosMap).sort((a, b) => b[1] - a[1])
  const generosUnicos = Object.keys(generosMap).length

  // Libros recientes (últimos 4)
  const librosRecientes = [...libros].reverse().slice(0, 4)

  // Enviar cambio de contraseña
  const handleCambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPassMensaje(null)

    if (!actualPassword || !nuevaPassword || !confirmarPassword) {
      setPassMensaje({ tipo: 'error', texto: 'Por favor completa todos los campos' })
      return
    }

    if (nuevaPassword !== confirmarPassword) {
      setPassMensaje({ tipo: 'error', texto: 'La nueva contraseña y su confirmación no coinciden' })
      return
    }

    if (nuevaPassword.trim().length < 3) {
      setPassMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener mínimo 3 caracteres' })
      return
    }

    setEnviandoPass(true)

    try {
      const response = await fetch(`${authurl}/cambiar-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user?.username || 'admin',
          actualPassword,
          nuevaPassword: nuevaPassword.trim()
        })
      })

      const data = await response.json()

      if (response.ok && data.exito) {
        setPassMensaje({ tipo: 'exito', texto: data.mensaje || '¡Contraseña actualizada con éxito en la base de datos!' })
        setActualPassword('')
        setNuevaPassword('')
        setConfirmarPassword('')
      } else {
        setPassMensaje({ tipo: 'error', texto: data.mensaje || 'No se pudo actualizar la contraseña' })
      }
    } catch (err) {
      console.error(err)
      setPassMensaje({ tipo: 'error', texto: 'Error al contactar con el backend en ' + authurl })
    } finally {
      setEnviandoPass(false)
    }
  }

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-[90vh]">
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
              <MdOutlineAdminPanelSettings className="text-2xl" />
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-300 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/30">
              Panel Administrativo
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Bienvenido, {user?.nombre || user?.username || 'Administrador'} 👋
          </h1>
          <p className="text-blue-200/80 text-sm mt-1">
            Gestiona la colección de libros, supervisa métricas y administra tus credenciales.
          </p>
        </div>

        {/* Botones de acción rápida */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setMostrarModalPass(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            <FaKey /> Cambiar Contraseña
          </button>
          <button
            onClick={() => navigate('/adminZone/libros')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            <FaBookOpen /> Gestionar Libros
          </button>
        </div>
      </div>

      {/* Estado del Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <FaServer className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Backend Spring Boot</p>
              <p className="text-sm font-bold text-slate-800">Render Cloud API</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> En Línea
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <FaDatabase className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Base de Datos</p>
              <p className="text-sm font-bold text-slate-800">PostgreSQL (Neon.tech)</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Conectada
          </span>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Libros</span>
            <span className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
              <FaBookOpen className="text-lg" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{cargando ? '...' : totalLibros}</p>
          <p className="text-xs text-slate-500 mt-2">Disponibles en el catálogo</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Géneros</span>
            <span className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
              <MdCategory className="text-lg" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{cargando ? '...' : generosUnicos}</p>
          <p className="text-xs text-slate-500 mt-2">Categorías distintas registradas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Promedio Páginas</span>
            <span className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
              <MdSpaceDashboard className="text-lg" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{cargando ? '...' : `${promedioPaginas}`}</p>
          <p className="text-xs text-slate-500 mt-2">Páginas por libro</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Páginas</span>
            <span className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
              <FaDatabase className="text-lg" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{cargando ? '...' : totalPaginas.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-2">Páginas catalogadas</p>
        </div>
      </div>

      {/* Sección Doble: Distribución por Géneros y Libros Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Distribución por género */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Distribución por Género</h2>
              <p className="text-xs text-slate-500">Cantidad de libros por cada categoría</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              {generosLista.length} Géneros
            </span>
          </div>

          <div className="space-y-4">
            {generosLista.map(([genero, cant]) => {
              const porcentaje = Math.round((cant / (totalLibros || 1)) * 100)
              return (
                <div key={genero}>
                  <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                    <span>{genero}</span>
                    <span className="text-slate-500 font-semibold">{cant} libros ({porcentaje}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Libros Recientes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recién Catalogados</h2>
            <button
              onClick={() => navigate('/adminZone/libros')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Ver todos →
            </button>
          </div>

          <div className="space-y-4">
            {librosRecientes.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
                <img
                  src={b.portada || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'}
                  alt={b.titulo}
                  className="w-12 h-16 object-cover rounded-md shadow-sm border border-slate-200 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="font-semibold text-slate-800 text-sm truncate">{b.titulo}</p>
                  <p className="text-xs text-slate-500 truncate">{b.autor}</p>
                  <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {b.genero} • {b.anio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Sección de Cambiar Contraseña */}
      {mostrarModalPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2 text-slate-900">
                <FaKey className="text-amber-500 text-lg" />
                <h3 className="font-bold text-lg">Cambiar Contraseña</h3>
              </div>
              <button
                onClick={() => {
                  setMostrarModalPass(false)
                  setPassMensaje(null)
                }}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passMensaje && (
              <div
                className={`p-3 rounded-xl mb-4 text-sm flex items-start gap-2 ${
                  passMensaje.tipo === 'exito'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {passMensaje.tipo === 'exito' ? (
                  <MdOutlineCheckCircle className="text-lg flex-shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <MdOutlineWarning className="text-lg flex-shrink-0 mt-0.5 text-rose-600" />
                )}
                <span>{passMensaje.texto}</span>
              </div>
            )}

            <form onSubmit={handleCambiarPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.username || 'admin'}
                  className="w-full px-3 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm border border-slate-200 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Contraseña Actual
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    type={verNueva ? 'text' : 'password'}
                    required
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    placeholder="Mínimo 3 caracteres"
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

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarModalPass(false)
                    setPassMensaje(null)
                  }}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviandoPass}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition cursor-pointer shadow"
                >
                  {enviandoPass ? 'Guardando...' : 'Guardar Cambio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
