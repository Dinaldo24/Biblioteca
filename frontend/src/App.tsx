import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import google from "./assets/google.png"
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "./components/ui/card"
import { CardDemo } from './Componentes/Card'
import type { PropsDetalle } from './assets/Data'
import { libros } from "./assets/Data"
import { Spinner } from "../src/components/ui/spinner"
import { GlobalCenter } from "./context/GlobalProvider"
import { ComboboxBasic } from './Componentes/Selected'
import { FiltroPaginas } from './components/Filtros/SliderFilter'
import { IoGrid } from "react-icons/io5";
import { PosiblesEnum } from './assets/TypesGrid'
import { GetallBook } from './helpers/llamada'


function App() {  


  const [Libro, setLibro] = useState<PropsDetalle[]>([])
  const { variable, setVariableGlobal   ,  backurl , setTotalPages,totalPages } = useContext(GlobalCenter)
  const [input, setinput] = useState('')
  const [filtroImagnes, setFiltroImages] = useState('')
  const [sliderFilter, setSliderFilter] = useState<number[]>([])
  const [Numbero, setNumero] = useState(2)  


  const handleChanuge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value)
  }
  const NumeroTodoAstro = (item: PropsDetalle) => {
    setVariableGlobal(item)
  }
  const FilterUser = Libro.length > 0 ?
    Libro.filter((item, idx) => item.titulo.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    : Libro

  const filtroPorGenero = filtroImagnes != '' ? FilterUser.filter((item, index) => {
    if (filtroImagnes === 'todos') {
      return FilterUser
    }
    return item.genero === filtroImagnes

  }
  ) : FilterUser
  const hanldeChanngueComboxBox = (value: string) => {
    setFiltroImages(value)
  }
  const changueSliderFilter = (value: number[]) => {
    setSliderFilter(value)

  }

  const CangueGrid = () => {

    setNumero(4)

  }

  const handleChanugeSlider = () => {

    if (!sliderFilter || sliderFilter.length === 0) {
      return filtroPorGenero
    }

    const [min, max] = sliderFilter
    if (min > 0 && max > 0) {
      let filtroPages = filtroPorGenero.filter((item, index) => item.paginas >= min && item.paginas <= max)
      console.log(filtroImagnes)
      return filtroPages
    }

    return filtroPorGenero
  }  
  const EfectoDetalle = async  () =>{
         try {
             GetallBook(backurl).then((data)=>{
                  setLibro(data)
             })

            } catch (error) {
             console.log( error)
         } 
  }
  useEffect(() => { 
    EfectoDetalle()     
    console.log( libros.length)

  }, [])
  return (
    <>
      <div className='border min-h-full h-screen '>
        <div className='w-[80%]   md:w-container  mx-auto mt-2 p-1 '>
          <Input onChange={handleChanuge} className='p-2 mt-3 shadow-2xl ' placeholder='buscar libro' ></Input>
          <div className='flex   items-center mt-5 '>
            <Button onClick={CangueGrid} variant={'outline'} className='cursor-pointer mx-2'>

              <IoGrid></IoGrid>

            </Button>
            <ComboboxBasic changue={hanldeChanngueComboxBox} ></ComboboxBasic>
            <FiltroPaginas onChange={changueSliderFilter}></FiltroPaginas>
            <p className='float-end mx-2'>Total {handleChanugeSlider().length}</p>

          </div>
        </div>
        <hr></hr>
        <div className=' mt-4 w-[90vw]  flex items-center justify-center   mx-auto gap-3.5'>
          <div className={`grid   grid-cols-1   sm:grid-cols-2  lg:grid-cols-3  mt-10  xl:grid-cols-3 gap-5`}>
            {
              handleChanugeSlider().length != 0 ?
                handleChanugeSlider().slice(0, 10).map((item, index) => (
                  <CardDemo key={item.id ?? index} NumeroTodoAstro={NumeroTodoAstro} item={item} />
                ))

                : <p className='font-black font-bold'>Sin Resultado</p>
            }
          </div>

        </div>
      </div>

    </>
  )

}
export default App
