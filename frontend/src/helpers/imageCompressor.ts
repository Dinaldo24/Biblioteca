/**
 * Comprime y convierte una imagen seleccionada por el usuario en Base64
 * optimizada para almacenamiento directo en PostgreSQL (TEXT).
 */
export const procesarImagenArchivo = (
  file: File,
  maxWidth = 800,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo seleccionado no es una imagen válida.'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Redimensionar manteniendo proporción si excede el tamaño máximo
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(e.target?.result as string)
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Convertir a JPEG comprimido
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl)
      }

      img.onerror = () => reject(new Error('Error al decodificar la imagen.'))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error('Error al leer el archivo desde el disco.'))
    reader.readAsDataURL(file)
  })
}
