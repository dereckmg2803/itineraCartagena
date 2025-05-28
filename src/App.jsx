import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home, Login, Dashboard } from './pages'
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App