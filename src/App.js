import React, { useState, useEffect } from 'react';
import './App.css';
import Navbard from './components/Navbard.js';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import Depa from './components/Depa.js';
import TableUs from './components/TableUs.js';
import TableActivos from './components/TableActivos.js';
import Login from './components/Login.js';
import Home from './components/Home.js';

import axios from 'axios';
import Opap from './components/Opap.js';
import Rdav from './components/Rdav.js';
import Index from './admin/Index.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true'); // Load from storage

    axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
          setName(res.data.name);
          setEmail(res.data.email);
          setPosition(res.data.position);
        } else {
          setIsLoggedIn(false);
          setMessage(res.data.err);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        setIsLoggedIn(false);
        setName('');
        setEmail('');
        setPosition('');
        localStorage.removeItem('isLoggedIn'); // Clear storage
        // Función para actualizar el estado de la sesión
        updateSessionStatus('closed');
      })
      .catch(err => console.error(err));
  };

  // Función para actualizar el estado de la sesión
  const updateSessionStatus = (status) => {
    if (status === 'closed') {
      localStorage.removeItem('isLoggedIn');
      // Actualizar el estado de la sesión en la aplicación
      // ...
    } else {
      // Manejar el error
      console.error('Error al actualizar el estado de la sesión');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta inicial: Login */}
        <Route path="/" element={<Login />} />
        {/* Renderizado condicional del Navbard basado en el estado de la sesión */}
        <Route path="/navbard" element={ isLoggedIn ? ( <Navbard name={{name, email, position}} handleLogout={handleLogout} /> ) : (<Navigate to="/" replace /> )}/>
        {/* Rutas protegidas accesibles solo después de iniciar sesión correctamente */}
        <Route path="/department" element={ isLoggedIn ? ( <Depa /> ) : (<Navigate to="/" replace /> )}/>
        <Route path="/users" element={ isLoggedIn ? ( <TableUs /> ) : ( <Navigate to="/" replace /> )}/>
        <Route path="/activos" element={ isLoggedIn ? ( <TableActivos /> ) : ( <Navigate to="/" replace /> )}/>
        <Route path="/Acciones_en_Proceso" element={ isLoggedIn ? ( <Opap />) : (<Navigate to="/" replace /> )}/>
        <Route path="/Relacion_de_archivos_vigentes" element={ isLoggedIn ? ( <Rdav /> ) : ( <Navigate to="/" replace /> )}/>


        <Route path="/admin" element={ isLoggedIn ? ( <Index /> ) : ( <Navigate to="/" replace /> )}/>
        {/* Ruta de inicio, accesible independientemente del estado de la sesión */}
        <Route path="/home" element={ isLoggedIn ? ( <Home /> ) : ( <Navigate to="/" replace /> )}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
