import React, { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

export interface Props {
  children: ReactNode
}

const ProtecterRouter = ({ children }: Props) => {
  const navigate = useNavigate()
  const [autorizado, setAutorizado] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const sesion = localStorage.getItem('usuario_biblioteca')
      if (sesion) {
        const parsed = JSON.parse(sesion)
        if (parsed.token && (parsed.rol === 'ADMIN' || parsed.username === 'admin')) {
          setAutorizado(true)
          return
        }
      }
    } catch {
      // fallo de parseo
    }

    setAutorizado(false)
    const timer = setTimeout(() => {
      navigate("/login")
    }, 1500)

    return () => clearTimeout(timer)
  }, [navigate])

  if (autorizado === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Verificando credenciales de administrador...</p>
      </div>
    )
  }

  if (!autorizado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-red-950/80 border border-red-500 p-6 rounded-xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-300 mb-2">Acceso Restringido</h2>
          <p className="text-gray-300 mb-4">Debes iniciar sesión con una cuenta de administrador para acceder a esta zona.</p>
          <p className="text-xs text-gray-400">Redirigiendo al formulario de inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtecterRouter