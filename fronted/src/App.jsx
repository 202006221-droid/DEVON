import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
// RUTA CORREGIDA (debe funcionar)
import BotonChatWhatsApp from "./BotonChatWhatsApp.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1>Página de Home (React)</h1>
      <p>Este es el contenido principal de la página, como en tu mockup.</p>
      <p>El botón de chat aparecerá flotando abajo a la derecha.</p>
      
      {/* 4. Coloca tu componente aquí */}
      <BotonChatWhatsApp /> 
    </>
  )
}



export default App;
