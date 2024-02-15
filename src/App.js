import React from 'react';
import './App.css';
import Navbard from './components/Navbard.js';

import { BrowserRouter,Route,Routes } from 'react-router-dom';

import Home from './components/Home.js'
import Depa from './components/Depa.js';
import TableUs from './components/TableUs.js';
import TableActivos from './components/TableActivos.js';
import Login from './components/Login.js';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Navbard />
     <div>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/department' element={<Depa />}/>
      <Route path='/users' element={<TableUs />} />
      <Route path='/activos' element={<TableActivos />} />
      <Route path='/Login' element={<Login />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
