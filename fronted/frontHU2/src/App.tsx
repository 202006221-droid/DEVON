import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, User, Search, Star, HelpCircle } from 'lucide-react'; // Importamos iconos

// Definición de tipos para las sugerencias recibidas del backend
interface Suggestion {
    id: number;
    title: string;
    url: string;
}

// Tipo de respuesta del backend para las sugerencias
interface SuggestionResponse {
    message: string;
    results: Suggestion[];
}

// Configuración de la URL de la API (Usa la variable de entorno para el puerto 3001)
const API_BASE_URL = typeof __port_3001 !== 'undefined'
    ? `http://${window.location.hostname}:${__port_3001}/api`
    : `http://localhost:3001/api`;

const API_URL_SUGGEST = `${API_BASE_URL}/suggest`; // Endpoint correcto para sugerencias
const API_URL_SEARCH = `${API_BASE_URL}/search`;   // Endpoint correcto para búsqueda principal

// Componente principal del Centro de Ayuda
const CentroDeAyuda: React.FC = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Función para mostrar mensajes temporales
    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 5000);
    };

    // Lógica para realizar la llamada a la API de sugerencias con debounce
    useEffect(() => {
        const query = searchTerm.trim();
        
        // Criterio para NO ejecutar la búsqueda
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        // 1. Limpia cualquier timeout anterior
        const handler = setTimeout(async () => {
            setIsLoading(true);
            console.log(`[DEBUG] Enviando petición (Axios) a: ${API_URL_SUGGEST}?q=${query}`); 
            
            try {
                // Notamos que el backend devuelve { message, results: [...] }
                const response = await axios.get<SuggestionResponse>(`${API_URL_SUGGEST}?q=${query}`);
                
                // CRUCIAL: Extraer el array 'results' de la respuesta del backend
                const receivedSuggestions = response.data.results || [];

                setSuggestions(receivedSuggestions);

                if (receivedSuggestions.length > 0) {
                     console.log(`[EFFECT - ÉXITO] Sugerencias encontradas: ${receivedSuggestions.length}`);
                }
            } catch (error) {
                console.error('[EFFECT - ERROR] Error al obtener sugerencias (Axios):', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms de debounce

        // 2. Cleanup: Cancela el timeout si el componente se desmonta o searchTerm cambia
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]); // Dependencia: Se ejecuta cada vez que searchTerm cambia


    // --- Funcionalidades de Redirección (Mantenidas) ---
    const handleRedirect = (target: string, url: string | null = null) => {
        const finalUrl = url || `/${target.toLowerCase().replace(/\s/g, '-')}`;
        showMessage(`Redirigiendo a: ${target} (URL: ${finalUrl})`);
        console.log(`Navegando a: ${finalUrl}`);
    };
    
    const handleSuggestionClick = (suggestion: Suggestion) => {
        handleRedirect(suggestion.title, suggestion.url);
        setSearchTerm(suggestion.title); // Establece el título de la sugerencia en el campo
        setSuggestions([]); // Cierra el dropdown
    };
    
    const handleSearchSubmit = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if ('preventDefault' in event) event.preventDefault(); 
        
        const query = searchTerm.trim();
        if (query.length > 0) {
            if (suggestions.length > 0) {
                // Si hay sugerencias, navega a la primera o pide seleccionar (simulación)
                handleRedirect(suggestions[0].title, suggestions[0].url);
                setSuggestions([]);
            } else {
                // Simulación de búsqueda principal (Llamada al endpoint /search en una app real)
                showMessage(`Búsqueda principal ejecutada para: "${query}". (En una app real, esto iría a ${API_URL_SEARCH})`);
                handleRedirect(`Resultados de Búsqueda para "${query}"`);
            }
        } else {
            showMessage('Por favor, ingresa un término de búsqueda.');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
            <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden md:mt-10">
                
                {/* 1. Encabezado / Barra de Navegación Superior */}
                <header className="flex items-center justify-between p-4 bg-blue-700 text-white shadow-md">
                    <div 
                        className="cursor-pointer p-1 rounded-full hover:bg-blue-800 transition"
                        onClick={() => handleRedirect('Home')}
                    >
                        <Home className="h-6 w-6" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Centro de Ayuda</h1>
                    <div 
                        className="cursor-pointer p-1 rounded-full hover:bg-blue-800 transition"
                        onClick={() => handleRedirect('Perfil')}
                    >
                        <User className="h-6 w-6" />
                    </div>
                </header>

                {/* 2. Sección de Búsqueda y Resultados */}
                <section className="p-6 relative">
                    <div className="search-box relative">
                        {/* Ícono de Búsqueda */}
                        <div 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={handleSearchSubmit}
                        >
                             {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <Search className="h-5 w-5 hover:text-blue-600 transition" />
                            )}
                        </div>
                        
                        {/* Campo de Input */}
                        <input 
                            type="text" 
                            placeholder="Buscar ayuda en Servineo..." 
                            aria-label="Buscador de ayuda"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter') handleSearchSubmit(e);
                            }}
                            className="w-full pl-10 pr-4 py-3 text-gray-800 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-inner"
                        />
                    </div>
                    
                    {/* 3. Dropdown de Sugerencias (Autocomplete) */}
                    {/* Mostrar solo si el término es > 1 y hay sugerencias */}
                    {searchTerm.length >= 2 && suggestions.length > 0 && (
                        <div className="absolute z-10 w-[calc(100%-3rem)] mt-2 left-6 right-6"> 
                            <ul className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                {suggestions.map((suggestion) => (
                                    <li 
                                        key={suggestion.id} 
                                        className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition duration-150 border-b last:border-b-0"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <p className="font-semibold">{suggestion.title}</p>
                                        <p className="text-xs text-gray-400">{suggestion.url}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                {/* Mensaje de Feedback */}
                {message && (
                    <div className="mx-6 mb-4 p-3 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-sm font-medium transition-opacity duration-300">
                        {message}
                    </div>
                )}
                
                {/* 4. Contenido Principal: Opciones de Ayuda */}
                <main className="main-content p-6 pt-0">
                    {/* Solo mostramos las tarjetas si no estamos buscando o no hay sugerencias */}
                    {(searchTerm.length < 2 && suggestions.length === 0) && (
                        <div className="space-y-4">
                            {/* Tarjeta 1: Publicaciones Populares */}
                            <button 
                                className="w-full flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg transform hover:scale-[1.01] duration-200 text-left" 
                                onClick={() => handleRedirect('Publicaciones Populares')}
                            >
                                <div className="p-3 mr-4 rounded-full bg-blue-100 text-blue-600">
                                    <Star className="h-6 w-6" />
                                </div>
                                <div className="card-text">
                                    <h2 className="text-lg font-semibold text-gray-800">Publicaciones Populares</h2>
                                    <p className="text-sm text-gray-500">Publicaciones populares de Servineo</p>
                                </div>
                            </button>

                            {/* Tarjeta 2: Preguntas Frecuentes */}
                            <button 
                                className="w-full flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg transform hover:scale-[1.01] duration-200 text-left" 
                                onClick={() => handleRedirect('Preguntas Frecuentes sobre Servineo')}
                            >
                                <div className="p-3 mr-4 rounded-full bg-blue-100 text-blue-600">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <div className="card-text">
                                    <h2 className="text-lg font-semibold text-gray-800">Preguntas frecuentes</h2>
                                    <p className="text-sm text-gray-500">Preguntas frecuentes sobre Servineo</p>
                                </div>
                            </button>
                        </div>
                    )}
                </main>
            </div>
            
            {/* Carga de Tailwind CSS */}
            <script src="https://cdn.tailwindcss.com"></script>
        </div>
    );
};

// Componente principal para envolver
const App = () => (
    <div id="root">
        <CentroDeAyuda />
    </div>
);

export default App;