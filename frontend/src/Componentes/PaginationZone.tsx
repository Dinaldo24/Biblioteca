import React, { useEffect } from 'react'
import { libros } from '../assets/Data'
import { Button } from '../components/ui/button'

interface Props {

    Paginumber: number
    LogicaPagiantion: (numero: number) => void

} 
 

function PaginationZone({ LogicaPagiantion, Paginumber }: Props) {
    let skip = 10
    let totalPages = libros.length / skip
    useEffect(() => {
        console.log(Paginumber)
    })
    return (
        <>
            {
                Array.from({ length: totalPages }).map((_, index) => <Button 

                    variant={Paginumber === index+1  && "default" }
                    onClick={() => LogicaPagiantion(index)} className='mx-2        min-w-[25px]'>{index + 1}</Button>)
            }

        </>


    )
}

export default PaginationZone