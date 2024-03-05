React
import React from 'react';
import ReactDOM from 'react-dom';
import RegistrarProducto from './componentes/RegistrarProducto.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegistrarProducto />
  </React.StrictMode>,
);


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import { App } from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
)
>>>>>>> origin/dev
