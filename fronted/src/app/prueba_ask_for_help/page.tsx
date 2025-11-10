import React from 'react';
import BotonesFlotantes from '@/components/ask_for_help/contenedor';
export default function PaginaDePrueba() {
  
 

  return (
    // Usamos Tailwind para centrar el contenido y darle un fondo
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      
      {/* Contenido principal de la página de prueba */}
      <div className="max-w-lg w-full bg-white p-10 rounded-xl shadow-lg">
        
        <header className="border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Esta es una Página de Prueba
          </h1>
        </header>
        
        <main>
          <p className="text-gray-600 mb-4">
            no me juzgues solo es una página de pruebas proveniente de:
            <code className="bg-gray-200 text-red-500 px-2 py-1 rounded mx-1">
              src/app/prueba/page.tsx
            </code>.
          </p>
        </main>
        
        <footer className="mt-6 pt-6 border-t-2">
          <p className="text-sm text-gray-500">
            El botón de WhatsApp y centro de ayuda aparecerá en la esquina inferior.
          </p>
        </footer>

      </div>
        <BotonesFlotantes
        />
      </div>
  );
}