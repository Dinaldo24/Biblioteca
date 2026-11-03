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
        anio: UserChangue?.anio || 2020,
        paginas: UserChangue?.paginas || 100,
        portada: UserChangue?.portada || ''
    })

    useEffect(() => {
        if (UserChangue) {
            setForm({
                titulo: UserChangue.titulo || '',
                autor: UserChangue.autor || '',
                genero: UserChangue.genero || '',
                anio: UserChangue.anio || 2020,
                paginas: UserChangue.paginas || 100,
                portada: UserChangue.portada || ''
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
            <DialogContent className="sm:max-w-lg bg-white max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Editar Libro #{UserChangue?.id}
                        </DialogTitle>
                        <DialogDescription>
                            Modifica los campos del libro o actualiza el enlace de su portada.
                        </DialogDescription>
                    </DialogHeader>

                    {error && (
                        <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded border border-red-300">
                            {error}
                        </div>
                    )}

                    <FieldGroup className="space-y-3 my-4">
                        <Field>
                            <Label htmlFor={`titulo-${UserChangue?.id}`}>Título del Libro</Label>
                            <Input
                                id={`titulo-${UserChangue?.id}`}
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor={`autor-${UserChangue?.id}`}>Autor / Editorial</Label>
                            <Input
                                id={`autor-${UserChangue?.id}`}
                                name="autor"
                                value={form.autor}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor={`genero-${UserChangue?.id}`}>Área / Género / Colección</Label>
                            <Input
                                id={`genero-${UserChangue?.id}`}
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                placeholder="Ej: Atlas y Geografía del Perú, CTA, Matemática..."
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

                        <Field>
                            <Label htmlFor={`portada-${UserChangue?.id}`}>Enlace de la Portada (URL)</Label>
                            <Input
                                id={`portada-${UserChangue?.id}`}
                                name="portada"
                                value={form.portada}
                                onChange={handleChange}
                                placeholder="https://ejemplo.com/portada.jpg"
                            />
                            <p className="text-[11px] text-gray-500 mt-1">
                                Pega aquí el enlace de la imagen o foto del libro.
                            </p>
                        </Field>

                        {form.portada && (
                            <div className="flex items-center gap-3 p-2 bg-slate-50 border rounded-lg">
                                <img 
                                    src={form.portada} 
                                    alt="Vista previa" 
                                    className="w-12 h-16 object-cover rounded shadow-sm border"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
                                    }}
                                />
                                <div className="text-xs text-gray-600">
                                    <p className="font-semibold">Vista previa de la portada</p>
                                    <p className="text-[10px] text-gray-400 truncate max-w-xs">{form.portada}</p>
                                </div>
                            </div>
                        )}
                    </FieldGroup>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline">Cancelar</Button>} />
                        <Button type="submit" disabled={cargando} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
