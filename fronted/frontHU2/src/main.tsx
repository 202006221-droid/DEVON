// servineoReact/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// 🚨 Importamos el componente CentroDeAyuda 🚨
import CentroDeAyuda from './App.tsx'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 🚨 Renderizamos el componente de la HU 🚨 */}
    <CentroDeAyuda /> 
  </React.StrictMode>,
);