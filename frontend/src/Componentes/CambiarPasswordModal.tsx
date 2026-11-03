import React, { useContext, useState } from 'react'
import { GlobalCenter } from '../context/GlobalProvider'
import { FaKey } from 'react-icons/fa'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { MdOutlineCheckCircle, MdOutlineWarning } from 'react-icons/md'

export const CambiarPasswordModal = () => {
  const { user, authurl } = useContext(GlobalCenter)
  const [abierto, setAbierto] = useState(false)
  const [actualPassword, setActualPassword] = useState('')
  const [nuevaPassword, setNuevaPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [verActual, setVerActual] = useState(false)
  const [verNueva, setVerNueva] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje(null)

    if (!actualPassword || !nuevaPassword || !confirmarPassword) {
      setMensaje({ tipo: 'error', texto: 'Todos los campos son obligatorios' })
      return
    }

    if (nuevaPassword !== confirmarPassword) {
      setMensaje({ tipo: 'error', texto: 'La nueva contraseña y su confirmación no coinciden' })
      return
    }

    if (nuevaPassword.trim().length < 3) {
      setMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener mínimo 3 caracteres' })
      return
    }

    setEnviando(true)

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
        setMensaje({ tipo: 'exito', texto: data.mensaje || '¡Contraseña actualizada con éxito!' })
        setActualPassword('')
        setNuevaPassword('')
        setConfirmarPassword('')
      } else {
        setMensaje({ tipo: 'error', texto: data.mensaje || 'No se pudo actualizar la contraseña' })
      }
    } catch (err) {
      console.error(err)
      setMensaje({ tipo: 'error', texto: 'Error al contactar con el backend en ' + authurl })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg text-sm transition shadow-sm cursor-pointer"
        title="Cambiar contraseña de administrador"
      >
        <FaKey className="text-xs" /> Cambiar Contraseña
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2 text-slate-900">
                <FaKey className="text-amber-500 text-lg" />
                <h3 className="font-bold text-lg">Cambiar Contraseña</h3>
              </div>
              <button
                onClick={() => {
                  setAbierto(false)
                  setMensaje(null)
                }}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {mensaje && (
              <div
                className={`p-3 rounded-xl mb-4 text-sm flex items-start gap-2 ${
                  mensaje.tipo === 'exito'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {mensaje.tipo === 'exito' ? (
                  <MdOutlineCheckCircle className="text-lg flex-shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <MdOutlineWarning className="text-lg flex-shrink-0 mt-0.5 text-rose-600" />
                )}
                <span>{mensaje.texto}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    setAbierto(false)
                    setMensaje(null)
                  }}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  disabled={enviando}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition cursor-pointer shadow"
                >
                  {enviando ? 'Guardando...' : 'Guardar Cambio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
