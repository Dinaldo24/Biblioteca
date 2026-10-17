import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DasboardProfile from './Componentes/DasboardProfile.tsx'
import ProtecterRouter from './Componentes/ProtecterRouter.tsx'
import Dashboard from './Componentes/Dashboard.tsx'
import Layout from './Componentes/Narbar.tsx'
import SingleUser from './Componentes/SingleUser.tsx'
import { GlovalProvider } from './context/GlobalProvider.tsx'
import InicarSession from './Componentes/InicarSession.tsx'
import AdminZone from './Componentes/AdminZone.tsx'
import TableComponents from "./Componentes/TableComponents.tsx"
import { ChartExample } from './Componentes/DashboardBook.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlovalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} ></Route>
            <Route path='/user/:titulo' element={<SingleUser />} ></Route>
          </Route>
          <Route path='/login' element={<InicarSession></InicarSession>} ></Route>
          <Route
            path="/adminZone"
            element={
              <ProtecterRouter>
                <AdminZone />
              </ProtecterRouter>
            }
          >
            <Route path="libros" element={<TableComponents />} />
            <Route path="dashboard" element={<ChartExample />} />
          </Route>
        </Routes>
      </GlovalProvider>
    </BrowserRouter>

  </StrictMode>,
)
