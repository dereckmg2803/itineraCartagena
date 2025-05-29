import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home, Login, Dashboard, Register, Turistas } from './pages'
import { Routes, Route } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/turistas" element={<Turistas />} />
      </Routes>
    </>
  )
}

export default App