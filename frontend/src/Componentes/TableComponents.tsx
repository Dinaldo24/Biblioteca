import React, { useContext, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import PaginationZone from "./PaginationZone"
import { DialogDemo } from "./Modal"
import type { PropsDetalle } from "./../assets/Data"
import { libros as librosFallback } from "./../assets/Data"
import { DeleteDemon } from "./DeleteDemon"
import { CreateDialogDemon } from "./CreateFromUser"
import { GlobalCenter } from "../context/GlobalProvider"
import { GetallBook } from "../helpers/llamada"
import { Input } from "../components/ui/input"

interface SkipPagiontion {
    inicio: number
    fin: number
}

const incioDetalle: SkipPagiontion = {
    inicio: 0,
    fin: 10
}

const TableComponents = () => {
    const { backurl } = useContext(GlobalCenter)
    const [Paginumber, setPaginatioNumber] = useState(incioDetalle)
    const [Tags, setTags] = useState(0)
    const [estado, setestado] = useState<Array<PropsDetalle>>(librosFallback)
    const [busqueda, setBusqueda] = useState("")

    let skip = 10
    const LogicaPagiantion = (numero: number) => {
        let mutli = ((numero + 1) * skip)
        setPaginatioNumber({
            fin: mutli,
            inicio: mutli - 10
        })
        setTags(numero + 1)
    }

    const getall = () => {
        try {
            GetallBook(backurl).then((data) => {
                if (data && Array.isArray(data) && data.length > 0) {
                    setestado(data)
                } else {
                    setestado(librosFallback)
                }
            }).catch(() => {
                setestado(librosFallback)
            })
        } catch (error) {
            console.error("Error al obtener libros:", error)
            setestado(librosFallback)
        }
    }

    useEffect(() => {
        getall()
    }, [backurl])

    const librosFiltrados = estado.filter(item =>
        item.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.autor?.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.genero?.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div className="p-6 w-[95%] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Gestión de Libros</h1>
                </div>
                <CreateDialogDemon onSuccess={getall} />
            </div>

            <div className="mb-4 max-w-sm">
                <Input
                    placeholder="Buscar libro por título, autor o género..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="p-2 border rounded-md bg-white shadow-sm"
                />
            </div>

            <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-16 font-bold">ID</TableHead>
                            <TableHead className="font-bold">Título</TableHead>
                            <TableHead className="font-bold">Autor</TableHead>
                            <TableHead className="font-bold">Género</TableHead>
                            <TableHead className="font-bold text-center">Año</TableHead>
                            <TableHead className="font-bold text-center">Páginas</TableHead>
                            <TableHead className="font-bold text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {librosFiltrados.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No se encontraron libros.
                                </TableCell>
                            </TableRow>
                        ) : (
                            librosFiltrados.slice(Paginumber.inicio, Paginumber.fin).map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50">
                                    <TableCell className="font-semibold text-gray-600">#{item.id}</TableCell>
                                    <TableCell className="font-medium text-gray-900">{item.titulo}</TableCell>
                                    <TableCell className="text-gray-700">{item.autor}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                                            {item.genero}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center text-gray-600">{item.anio}</TableCell>
                                    <TableCell className="text-center text-gray-600">{item.paginas}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center gap-2">
                                            <DialogDemo UserChangue={item} onSuccess={getall} />
                                            <DeleteDemon UserChangue={item} onSuccess={getall} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {librosFiltrados.length > 10 && (
                <div className="text-center mt-6">
                    <PaginationZone
                        Paginumber={Tags}
                        LogicaPagiantion={LogicaPagiantion}
                    />
                </div>
            )}
        </div>
    )
}

export default TableComponents
