import { useContext, useState } from "react"
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
import { MdDelete } from "react-icons/md"
import type { PropsDetalle } from "../assets/Data"
import { GlobalCenter } from "../context/GlobalProvider"

interface PropsBroks {
    UserChangue: PropsDetalle
    onSuccess?: () => void
}

export function DeleteDemon({ UserChangue, onSuccess }: PropsBroks) {
    const { backurl, user } = useContext(GlobalCenter)
    const [open, setOpen] = useState(false)
    const [eliminando, setEliminando] = useState(false)

    const handleDelete = async () => {
        setEliminando(true)
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('usuario_biblioteca') || '{}')?.token
            const resp = await fetch(`${backurl}/${UserChangue.id}`, {
                method: 'DELETE',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            })
            if (resp.ok) {
                setOpen(false)
                if (onSuccess) onSuccess()
            }
        } catch (error) {
            console.error('Error al eliminar libro:', error)
        } finally {
            setEliminando(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button variant="outline" size="sm" className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                    <MdDelete size={18} />
                </Button>
            } />
            <DialogContent className="sm:max-w-sm bg-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-gray-900">
                        Eliminar Libro
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        ¿Estás seguro de que deseas eliminar <strong>&quot;{UserChangue?.titulo}&quot;</strong>? Esta acción no se puede deshacer en la base de datos.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <DialogClose render={<Button type="button" variant="outline">Cancelar</Button>} />
                    <Button
                        onClick={handleDelete}
                        disabled={eliminando}
                        className="bg-red-600 hover:bg-red-700 text-white">
                        {eliminando ? 'Eliminando...' : 'Sí, Eliminar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
