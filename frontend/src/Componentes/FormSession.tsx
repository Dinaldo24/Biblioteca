import React, { useContext, useState, useEffect } from 'react'
import { Input } from "../components/ui/input"
import { Label } from '../components/ui/label'
import { useNavigate } from 'react-router-dom'
import { GlobalCenter } from '../context/GlobalProvider'
import Viscardo from "../assets/Font/ViscardoAndGuamzn.jpg"

const FormSession = () => {
  const navigate = useNavigate()
  const { authurl, setUser } = useContext(GlobalCenter)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [intentosFallidos, setIntentosFallidos] = useState(0)
  const [bloqueadoSegundos, setBloqueadoSegundos] = useState(0)

  // Temporizador para cuenta regresiva si se activa el rate limit
  useEffect(() => {
    if (bloqueadoSegundos <= 0) return
    const timer = setInterval(() => {
      setBloqueadoSegundos(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [bloqueadoSegundos])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (bloqueadoSegundos > 0) return

    setError(null)
    setCargando(true)

    try {
      const response = await fetch(`${authurl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: username.trim(), 
          password 
        })
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.exito) {
        // Guardar sesión
        const sessionData = {
          id: data.id,
          username: data.username,
          nombre: data.nombre,
          rol: data.rol,
          token: data.token
        }
        localStorage.setItem('usuario_biblioteca', JSON.stringify(sessionData))
        setUser(sessionData)
        setIntentosFallidos(0)
        setBloqueadoSegundos(0)
        navigate('/adminZone/libros')
      } else if (response.status === 429) {
        // Rate limit alcanzado en el backend
        setBloqueadoSegundos(300) // 5 minutos
        setError(data.mensaje || 'Demasiados intentos fallidos. Acceso bloqueado temporalmente por seguridad.')
      } else {
        const nuevosFallos = intentosFallidos + 1
        setIntentosFallidos(nuevosFallos)
        if (nuevosFallos >= 5) {
          setBloqueadoSegundos(60) // Cooldown de 60 segundos
          setError('Demasiados intentos consecutivos. Espera 60 segundos antes de volver a intentar.')
        } else {
          setError(data.mensaje || 'Credenciales incorrectas')
        }
      }
    } catch (err) {
      console.error(err)
      setError(`Error al conectar con el servidor backend (${authurl})`)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-2xl 
              border border-white/20 shadow-2xl 
              bg-gradient-to-r from-gray-900/80 to-gray-800/80 
              backdrop-blur-lg">

      <div className="flex flex-col items-center justify-center mb-4">
        <img 
          src={Viscardo} 
          alt="Logo Colegio" 
          className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover shadow-lg mb-2"
        />
        <h1 className="text-2xl font-bold text-center text-white">
          Inicio de Sesión
        </h1>
        <p className="text-xs text-indigo-300 font-semibold tracking-wide uppercase mt-0.5">
          Colegio J. P. Vizcardo y Guzmán
        </p>
      </div>

      <p className="text-gray-300 text-center mb-6 text-sm">
        Ingresa con tus credenciales de Administrador para gestionar los libros
      </p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-200 bg-red-900/60 border border-red-500 rounded-md text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <Label className="block mb-2 text-gray-200">Usuario</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
            disabled={bloqueadoSegundos > 0}
            className="w-full border border-gray-600 bg-gray-950/50 text-white rounded-md p-2 focus:border-indigo-400 disabled:opacity-50"
          />
        </div>

        <div>
          <Label className="block mb-2 text-gray-200">Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={bloqueadoSegundos > 0}
            className="w-full border border-gray-600 bg-gray-950/50 text-white rounded-md p-2 focus:border-indigo-400 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={cargando || bloqueadoSegundos > 0}
          className="w-full cursor-pointer py-2.5 rounded-md font-bold text-white
                     bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed
                     transition-colors shadow-lg">
          {bloqueadoSegundos > 0
            ? `Acceso temporalmente bloqueado (${bloqueadoSegundos}s)`
            : cargando
            ? 'Iniciando sesión...'
            : 'Entrar al Panel de Administración'}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
          ← Volver a la Biblioteca pública
        </button>
      </div>
    </div>
  )
}

export default FormSession
