import { useState } from 'react'
import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Login from './components/Login/Login'; // Import the Login component
import './App.css';
import Home from './components/Home/Home';

import { PrivateRoutes } from './components/PrivateRoutes/PrivateRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} /> 

        <Route element={<PrivateRoutes />}>
          <Route 
            path='/Home' 
            element={
              <>
                <Home />
              </>
            } 
          />
        </Route>  
      </Routes>
    </>
  )
}

export default App;
