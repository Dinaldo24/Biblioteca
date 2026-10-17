import React, { useContext, useState } from 'react'
import { Input } from "../components/ui/input"
import { Label } from '../components/ui/label'
import { useNavigate } from 'react-router-dom'
import { GlobalCenter } from '../context/GlobalProvider'

const FormSession = () => {
  const navigate = useNavigate()
  const { authurl, setUser } = useContext(GlobalCenter)

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setCargando(true)

    try {
      const response = await fetch(`${authurl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

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
        navigate('/adminZone/libros')
      } else {
        setError(data.mensaje || 'Credenciales incorrectas')
      }
    } catch (err) {
      console.error(err)
      setError('Error al conectar con el servidor backend en http://localhost:3001')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-2xl 
              border border-white/20 shadow-2xl 
              bg-gradient-to-r from-gray-900/80 to-gray-800/80 
              backdrop-blur-lg">

      <h1 className="text-3xl font-bold text-center text-white mb-2">
        Inicio de Sesión
      </h1>

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
            placeholder="admin"
            required
            className="w-full border border-gray-600 bg-gray-950/50 text-white rounded-md p-2 focus:border-indigo-400"
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
            className="w-full border border-gray-600 bg-gray-950/50 text-white rounded-md p-2 focus:border-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full cursor-pointer py-2.5 rounded-md font-bold text-white
                     bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600
                     transition-colors shadow-lg">
          {cargando ? 'Iniciando sesión...' : 'Entrar al Panel de Administración'}
        </button>
      </form>

      <div className="mt-6 p-3 bg-indigo-950/40 border border-indigo-700/50 rounded-lg text-xs text-indigo-200 text-center">
        💡 <strong>Credenciales por defecto:</strong> Usuario: <code className="bg-black/40 px-1 py-0.5 rounded">admin</code> | Clave: <code className="bg-black/40 px-1 py-0.5 rounded">123</code>
      </div>

      <div className="text-center mt-4">
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