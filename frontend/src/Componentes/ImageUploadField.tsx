import React, { useRef, useState } from 'react'
import { procesarImagenArchivo } from '../helpers/imageCompressor'
import { FaCloudUploadAlt, FaLink, FaTrashAlt, FaImage } from 'react-icons/fa'

interface ImageUploadFieldProps {
  value: string
  onChange: (nuevaPortada: string) => void
  label?: string
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Portada del Libro'
}) => {
  const [modo, setModo] = useState<'archivo' | 'url'>('archivo')
  const [procesando, setProcesando] = useState(false)
  const [errorLocal, setErrorLocal] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setErrorLocal(null)
    setProcesando(true)

    try {
      const base64Comprimido = await procesarImagenArchivo(file, 800, 0.82)
      onChange(base64Comprimido)
    } catch (err: any) {
      console.error(err)
      setErrorLocal(err.message || 'Error al procesar la imagen seleccionada')
    } finally {
      setProcesando(false)
      // Reset input para permitir volver a seleccionar el mismo archivo si se desea
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleEliminarPortada = () => {
    onChange('')
    setErrorLocal(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase">
          {label}
        </label>
        {/* Pestañas modo archivo vs URL */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setModo('archivo')}
            className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
              modo === 'archivo'
                ? 'bg-white text-blue-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FaCloudUploadAlt /> Subir foto (PC)
          </button>
          <button
            type="button"
            onClick={() => setModo('url')}
            className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
              modo === 'url'
                ? 'bg-white text-blue-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FaLink /> Enlace URL
          </button>
        </div>
      </div>

      {errorLocal && (
        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-lg">
          {errorLocal}
        </p>
      )}

      {/* Modo 1: Subir desde Archivo / Dispositivo */}
      {modo === 'archivo' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload-input"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 flex items-center justify-center text-lg transition">
              <FaCloudUploadAlt />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                {procesando ? 'Procesando y optimizando imagen...' : 'Haz clic para elegir una foto desde tu equipo'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Formatos: JPG, PNG, WEBP (se optimiza automáticamente)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modo 2: Pegar Enlace URL */}
      {modo === 'url' && (
        <div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://ejemplo.com/portada.jpg"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Pega el enlace web directo de la foto del libro.
          </p>
        </div>
      )}

      {/* Vista Previa de la Portada si existe */}
      {value && (
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl mt-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={value}
              alt="Vista previa de portada"
              className="w-12 h-16 object-cover rounded-md shadow-sm border border-slate-300 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
              }}
            />
            <div className="overflow-hidden text-left">
              <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <FaImage className="text-blue-600" /> Portada lista
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                {value.startsWith('data:') ? 'Foto cargada desde archivo local' : value}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEliminarPortada}
            className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition font-medium flex items-center gap-1 cursor-pointer"
            title="Quitar portada"
          >
            <FaTrashAlt /> Quitar
          </button>
        </div>
      )}
    </div>
  )
}
