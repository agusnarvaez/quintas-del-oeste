import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

const Home = lazy(()=>import("./components/Home/Home"))
const Admin = lazy(()=>import("./components/Admin/Admin"))

export default function App() {
  return (
    <Suspense fallback={<div className="loading">Cargando...</div>}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </BrowserRouter>
    </Suspense>
  )
}


