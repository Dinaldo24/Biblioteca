import React, { createContext, useState } from "react"
import type { PropsDetalle } from "../../src/assets/Data"

export interface UserSession {
    id?: number
    username?: string
    nombre?: string
    rol?: string
    token?: string
}

export interface PropsDetllae {
    variable: PropsDetalle
    setVariableGlobal: React.Dispatch<React.SetStateAction<PropsDetalle>>
    backurl: string
    authurl: string
    totalPages: number
    setTotalPages: (number: number) => void
    user: UserSession | null
    setUser: (user: UserSession | null) => void
    logout: () => void
    filtroBusqueda: string
    setFiltroBusqueda: (s: string) => void
    filtroGenero: string
    setFiltroGenero: (s: string) => void
    limpiarFiltros: () => void
}

export const GlobalCenter = createContext<PropsDetllae>({} as PropsDetllae)

interface ChildrenNOde {
    children: React.ReactNode
}

export const GlovalProvider = ({ children }: ChildrenNOde) => {
    const [variable, setVariableGlobal] = useState({} as PropsDetalle)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [filtroBusqueda, setFiltroBusqueda] = useState<string>('')
    const [filtroGenero, setFiltroGenero] = useState<string>('')

    const [user, setUser] = useState<UserSession | null>(() => {
        try {
            const saved = localStorage.getItem('usuario_biblioteca')
            return saved ? JSON.parse(saved) : null
        } catch {
            return null
        }
    })

    const logout = () => {
        localStorage.removeItem('usuario_biblioteca')
        setUser(null)
    }

    const limpiarFiltros = () => {
        setFiltroBusqueda('')
        setFiltroGenero('')
    }

    const backendBase = import.meta.env.VITE_APP_BACKEND_BASE || 'https://biblioteca-xbi5.onrender.com'

    return (
        <GlobalCenter.Provider value={{
            variable,
            setVariableGlobal,
            backurl: `${backendBase}/libros`,
            authurl: `${backendBase}/auth`,
            totalPages,
            setTotalPages,
            user,
            setUser,
            logout,
            filtroBusqueda,
            setFiltroBusqueda,
            filtroGenero,
            setFiltroGenero,
            limpiarFiltros
        }}>
            {children}
        </GlobalCenter.Provider>
    )
}
