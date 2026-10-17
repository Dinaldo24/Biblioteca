import React, { createContext, useState, useEffect } from "react"
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
    setVariableGlobal: React.Dispatch<React.SetStateAction<PropsDetalle>>;
    backurl: string
    authurl: string
    totalPages: number
    setTotalPages: (number: number) => void
    user: UserSession | null
    setUser: (user: UserSession | null) => void
    logout: () => void
}

export const GlobalCenter = createContext<PropsDetllae>({} as PropsDetllae)

interface ChildrenNOde {
    children: React.ReactNode
}

export const GlovalProvider = ({ children }: ChildrenNOde) => {
    const [variable, setVariableGlobal] = useState({} as PropsDetalle)
    const [totalPages, setTotalPages] = useState<number>(0)
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

    return (
        <GlobalCenter.Provider value={{
            variable,
            setVariableGlobal,
            backurl: 'http://localhost:3001/libros',
            authurl: 'http://localhost:3001/auth',
            totalPages,
            setTotalPages,
            user,
            setUser,
            logout
        }}>
            {children}
        </GlobalCenter.Provider>
    )
}