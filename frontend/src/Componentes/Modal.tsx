import { useState, useContext, useEffect } from "react"
import { Button } from "../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Field, FieldGroup } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { MdEdit } from "react-icons/md"
import type { PropsDetalle } from "../assets/Data"
import { GlobalCenter } from "../context/GlobalProvider"

interface PropsBroks {
    UserChangue: PropsDetalle
    onSuccess?: () => void
}

export function DialogDemo({ UserChangue, onSuccess }: PropsBroks) {
    const { backurl } = useContext(GlobalCenter)
    const [open, setOpen] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        titulo: UserChangue?.titulo || '',
        autor: UserChangue?.autor || '',
        genero: UserChangue?.genero || '',
        anio: UserChangue?.anio || 2000,
        paginas: UserChangue?.paginas || 100
    })

    useEffect(() => {
        if (UserChangue) {
            setForm({
                titulo: UserChangue.titulo || '',
                autor: UserChangue.autor || '',
                genero: UserChangue.genero || '',
                anio: UserChangue.anio || 2000,
                paginas: UserChangue.paginas || 100
            })
        }
    }, [UserChangue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === 'anio' || name === 'paginas' ? parseInt(value) || 0 : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setCargando(true)

        try {
            const resp = await fetch(`${backurl}/${UserChangue.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (resp.ok) {
                setOpen(false)
                if (onSuccess) onSuccess()
            } else {
                setError('Error al actualizar el libro.')
            }
        } catch (err) {
            console.error(err)
            setError('Error de conexión con el servidor.')
        } finally {
            setCargando(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button variant="outline" size="sm" className="cursor-pointer text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <MdEdit size={18} />
                </Button>
            } />
            <DialogContent className="sm:max-w-md bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Editar Libro #{UserChangue?.id}
                        </DialogTitle>
                        <DialogDescription>
                            Modifica los campos del libro y guarda los cambios en la base de datos.
                        </DialogDescription>
                    </DialogHeader>

                    {error && (
                        <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded border border-red-300">
                            {error}
                        </div>
                    )}

                    <FieldGroup className="space-y-3 my-4">
                        <Field>
                            <Label htmlFor={`titulo-${UserChangue?.id}`}>Título</Label>
                            <Input
                                id={`titulo-${UserChangue?.id}`}
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor={`autor-${UserChangue?.id}`}>Autor</Label>
                            <Input
                                id={`autor-${UserChangue?.id}`}
                                name="autor"
                                value={form.autor}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor={`genero-${UserChangue?.id}`}>Género</Label>
                            <Input
                                id={`genero-${UserChangue?.id}`}
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor={`anio-${UserChangue?.id}`}>Año</Label>
                                <Input
                                    id={`anio-${UserChangue?.id}`}
                                    name="anio"
                                    type="number"
                                    value={form.anio}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor={`paginas-${UserChangue?.id}`}>Páginas</Label>
                                <Input
                                    id={`paginas-${UserChangue?.id}`}
                                    name="paginas"
                                    type="number"
                                    value={form.paginas}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>
                    </FieldGroup>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline">Cancelar</Button>} />
                        <Button type="submit" disabled={cargando} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
