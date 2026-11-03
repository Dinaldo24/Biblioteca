"use client"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Button } from "../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { AvatarDemo } from "./AvatarZone"
import { GlobalCenter } from "../context/GlobalProvider"

export function DropdownMenuDemo() {
    const navigate = useNavigate()
    const { user, logout } = useContext(GlobalCenter)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="outline" className="cursor-pointer">
                    {user?.username ? `Admin: ${user.username}` : 'Perfil'}
                </Button>
            } />
            <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Mi Cuenta ({user?.username})</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate('/adminZone/dashboard')}>
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/adminZone/libros')}>
                        Gestión de Libros
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/')}>
                        Ver Catálogo Web
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                        Cerrar Sesión
                        <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
