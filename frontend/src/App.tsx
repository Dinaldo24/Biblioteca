import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { CardDemo } from './Componentes/Card'
import type { PropsDetalle } from './assets/Data'
import { libros as librosEstaticos } from "./assets/Data"
import { GlobalCenter } from "./context/GlobalProvider"
import { ComboboxBasic } from './Componentes/Selected'
import { FiltroPaginas } from './components/Filtros/SliderFilter'
import { IoGrid, IoCloseCircleOutline } from "react-icons/io5"
import { GetallBook } from './helpers/llamada'

function App() {  
  const [Libro, setLibro] = useState<PropsDetalle[]>(librosEstaticos)
  const { 
    setVariableGlobal, 
    backurl, 
    filtroBusqueda, 
    setFiltroBusqueda, 
    filtroGenero, 
    setFiltroGenero, 
    limpiarFiltros 
  } = useContext(GlobalCenter)

  const [sliderFilter, setSliderFilter] = useState<number[]>([])

  const NumeroTodoAstro = (item: PropsDetalle) => {
    setVariableGlobal(item)
  }

  const listaActual = Array.isArray(Libro) && Libro.length > 0 ? Libro : librosEstaticos

  // Obtener categorías dinámicas únicas
  const categorias = Array.from(
    new Set(listaActual.map((item) => item.genero).filter(Boolean))
  ).sort()

  const normalizar = (str: string) =>
    (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()

  // Filtrado inteligente que tolera acentos, mayúsculas y coincidencias parciales
  const librosMostrados = listaActual.filter((item) => {
    // 1. Filtro por texto en el buscador
    const texto = normalizar(filtroBusqueda)
    const coincideTexto =
      !texto ||
      normalizar(item.titulo).includes(texto) ||
      normalizar(item.autor).includes(texto) ||
      normalizar(item.genero).includes(texto)

    // 2. Filtro por categoría seleccionada
    const cat = normalizar(filtroGenero)
    const coincideGenero =
      !cat ||
      cat === 'todos' ||
      normalizar(item.genero).includes(cat) ||
      cat.includes(normalizar(item.genero))

    // 3. Filtro por páginas (slider)
    let coincidePaginas = true
    if (sliderFilter && sliderFilter.length === 2 && sliderFilter[0] > 0 && sliderFilter[1] > 0) {
      coincidePaginas = item.paginas >= sliderFilter[0] && item.paginas <= sliderFilter[1]
    }

    return coincideTexto && coincideGenero && coincidePaginas
  })

  const EfectoDetalle = async () => {
    try {
      const data = await GetallBook(backurl)
      if (Array.isArray(data) && data.length > 0) {
        setLibro(data)
      } else {
        setLibro(librosEstaticos)
      }
    } catch (error) {
      console.log('Error conectando al backend, usando datos locales:', error)
      setLibro(librosEstaticos)
    } 
  }

  useEffect(() => { 
    EfectoDetalle()
  }, [backurl])

  const hayFiltrosActivos = Boolean(filtroBusqueda || filtroGenero || (sliderFilter.length === 2 && sliderFilter[0] > 0))

  const handleLimpiarTodo = () => {
    limpiarFiltros()
    setSliderFilter([])
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='w-[85%] md:w-container mx-auto pt-6 p-1'>
        {/* Barra de búsqueda por texto */}
        <Input 
          value={filtroBusqueda}
          onChange={(e) => setFiltroBusqueda(e.target.value)} 
          className='p-3 mt-3 shadow-sm bg-white border-slate-300 rounded-xl text-sm' 
          placeholder='Buscar libro por título, autor o tema...' 
        />

        {/* Barra de controles y filtros */}
        <div className='flex flex-wrap items-center gap-3 mt-4'>
          <ComboboxBasic 
            valor={filtroGenero} 
            onChange={setFiltroGenero} 
            categorias={categorias} 
          />
          <FiltroPaginas onChange={setSliderFilter} />

          {hayFiltrosActivos && (
            <button
              onClick={handleLimpiarTodo}
              className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer'
            >
              <IoCloseCircleOutline className="text-base" /> Limpiar Filtros
            </button>
          )}
        </div>
      </div>

      <hr className='my-4 border-slate-200' />

      <div className='w-[90vw] flex items-center justify-center mx-auto pb-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-4 w-full max-w-7xl'>
          {librosMostrados.length > 0 ? (
            librosMostrados.map((item, index) => (
              <CardDemo key={item.id ?? index} NumeroTodoAstro={NumeroTodoAstro} item={item} />
            ))
          ) : (
            <div className='col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm my-6'>
              <p className='text-xl font-bold text-slate-800 mb-2'>
                No se encontraron libros con los filtros seleccionados
              </p>
              <p className='text-sm text-slate-500 mb-6'>
                Prueba buscando otro título o seleccionando otra categoría.
              </p>
              <button
                onClick={handleLimpiarTodo}
                className='px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition shadow cursor-pointer'
              >
                Ver Todos los Libros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
