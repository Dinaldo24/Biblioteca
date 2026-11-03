import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtecterRouter from './Componentes/ProtecterRouter.tsx'
import Layout from './Componentes/Narbar.tsx'
import SingleUser from './Componentes/SingleUser.tsx'
import { GlovalProvider } from './context/GlobalProvider.tsx'
import InicarSession from './Componentes/InicarSession.tsx'
import AdminZone from './Componentes/AdminZone.tsx'
import TableComponents from "./Componentes/TableComponents.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlovalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/user/:titulo' element={<SingleUser />} />
          </Route>
          <Route path='/login' element={<InicarSession />} />
          <Route
            path="/adminZone"
            element={
              <ProtecterRouter>
                <AdminZone />
              </ProtecterRouter>
            }
          >
            <Route index element={<TableComponents />} />
            <Route path="libros" element={<TableComponents />} />
          </Route>
        </Routes>
      </GlovalProvider>
    </BrowserRouter>
  </StrictMode>,
)
