import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { CardDemo } from './Componentes/Card'
import type { PropsDetalle } from './assets/Data'
import { libros } from "./assets/Data"
import { GlobalCenter } from "./context/GlobalProvider"
import { ComboboxBasic } from './Componentes/Selected'
import { FiltroPaginas } from './components/Filtros/SliderFilter'
import { IoGrid } from "react-icons/io5"
import { GetallBook } from './helpers/llamada'

function App() {  
  const [Libro, setLibro] = useState<PropsDetalle[]>(libros)
  const { setVariableGlobal, backurl } = useContext(GlobalCenter)
  const [input, setinput] = useState('')
  const [filtroImagnes, setFiltroImages] = useState('')
  const [sliderFilter, setSliderFilter] = useState<number[]>([])

  const handleChanuge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value)
  }

  const NumeroTodoAstro = (item: PropsDetalle) => {
    setVariableGlobal(item)
  }

  const listaActual = Array.isArray(Libro) ? Libro : []

  const FilterUser = listaActual.length > 0 ?
    listaActual.filter((item) => item.titulo?.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    : listaActual

  const filtroPorGenero = filtroImagnes !== '' ? FilterUser.filter((item) => {
    if (filtroImagnes === 'todos') {
      return true
    }
    return item.genero === filtroImagnes
  }) : FilterUser

  const hanldeChanngueComboxBox = (value: string) => {
    setFiltroImages(value)
  }

  const changueSliderFilter = (value: number[]) => {
    setSliderFilter(value)
  }

  const CangueGrid = () => {
    // grid toggle
  }

  const handleChanugeSlider = () => {
    if (!sliderFilter || sliderFilter.length === 0) {
      return filtroPorGenero
    }

    const [min, max] = sliderFilter
    if (min > 0 && max > 0) {
      return filtroPorGenero.filter((item) => item.paginas >= min && item.paginas <= max)
    }

    return filtroPorGenero
  }  

  const EfectoDetalle = async () => {
    try {
      const data = await GetallBook(backurl)
      if (Array.isArray(data) && data.length > 0) {
        setLibro(data)
      } else {
        setLibro(libros)
      }
    } catch (error) {
      console.log('Error conectando al backend, usando datos locales:', error)
      setLibro(libros)
    } 
  }

  useEffect(() => { 
    EfectoDetalle()
  }, [backurl])

  const librosMostrados = handleChanugeSlider()

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='w-[80%] md:w-container mx-auto pt-6 p-1'>
        <Input 
          onChange={handleChanuge} 
          className='p-2 mt-3 shadow-md bg-white border-slate-300' 
          placeholder='Buscar libro por título...' 
        />
        <div className='flex flex-wrap items-center gap-3 mt-5'>
          <Button onClick={CangueGrid} variant={'outline'} className='cursor-pointer'>
            <IoGrid />
          </Button>
          <ComboboxBasic changue={hanldeChanngueComboxBox} />
          <FiltroPaginas onChange={changueSliderFilter} />
        </div>
      </div>
      <hr className='my-4 border-slate-200' />
      <div className='w-[90vw] flex items-center justify-center mx-auto pb-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6'>
          {librosMostrados.length > 0 ? (
            librosMostrados.map((item, index) => (
              <CardDemo key={item.id ?? index} NumeroTodoAstro={NumeroTodoAstro} item={item} />
            ))
          ) : (
            <p className='font-bold text-slate-500 py-10 col-span-3 text-center'>
              No se encontraron resultados
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
