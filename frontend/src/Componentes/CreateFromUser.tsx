import { useState, useContext } from "react"
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
import { FaPlus } from "react-icons/fa"
import { GlobalCenter } from "../context/GlobalProvider"
import { ImageUploadField } from "./ImageUploadField"

interface PropsCreate {
    onSuccess?: () => void
}

export function CreateDialogDemon({ onSuccess }: PropsCreate) {
    const { backurl } = useContext(GlobalCenter)
    const [open, setOpen] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        titulo: '',
        autor: '',
        genero: '',
        anio: new Date().getFullYear(),
        paginas: 100,
        portada: ''
    })

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

        if (!form.titulo || !form.autor || !form.genero) {
            setError('Por favor completa los campos obligatorios.')
            return
        }

        setCargando(true)
        try {
            const resp = await fetch(backurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (resp.ok) {
                setForm({
                    titulo: '',
                    autor: '',
                    genero: '',
                    anio: new Date().getFullYear(),
                    paginas: 100,
                    portada: ''
                })
                setOpen(false)
                if (onSuccess) onSuccess()
            } else {
                setError('Error al registrar el libro.')
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
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 cursor-pointer shadow-sm">
                    <FaPlus /> Subir Nuevo Libro
                </Button>
            } />
            <DialogContent className="sm:max-w-lg bg-white max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Añadir Nuevo Libro
                        </DialogTitle>
                        <DialogDescription>
                            Completa los datos del libro y sube la foto de su portada desde tu equipo o URL.
                        </DialogDescription>
                    </DialogHeader>

                    {error && (
                        <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded border border-red-300">
                            {error}
                        </div>
                    )}

                    <FieldGroup className="space-y-3.5 my-4">
                        <Field>
                            <Label htmlFor="titulo">Título del Libro *</Label>
                            <Input
                                id="titulo"
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                placeholder="Ej: Atlas Regional del Perú - Cuzco"
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="autor">Autor / Editorial *</Label>
                            <Input
                                id="autor"
                                name="autor"
                                value={form.autor}
                                onChange={handleChange}
                                placeholder="Ej: Editorial Santillana / MINEDU"
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="genero">Área / Género / Colección *</Label>
                            <Input
                                id="genero"
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                placeholder="Ej: Atlas y Geografía del Perú, CTA, Matemática..."
                                required
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="anio">Año</Label>
                                <Input
                                    id="anio"
                                    name="anio"
                                    type="number"
                                    value={form.anio}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="paginas">Páginas</Label>
                                <Input
                                    id="paginas"
                                    name="paginas"
                                    type="number"
                                    value={form.paginas}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>

                        {/* Selector de Portada: Archivo Local o URL */}
                        <ImageUploadField
                            label="Foto de Portada"
                            value={form.portada}
                            onChange={(nuevaPortada) => setForm(prev => ({ ...prev, portada: nuevaPortada }))}
                        />
                    </FieldGroup>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline">Cancelar</Button>} />
                        <Button type="submit" disabled={cargando} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                            {cargando ? 'Guardando...' : 'Guardar Libro'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
