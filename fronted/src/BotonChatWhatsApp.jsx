import React, { useEffect } from 'react';
// Importa tus estilos CSS. Asegúrate de que la ruta sea correcta.
import './BotonChat.css'; // Asume que creaste src/BotonChat.css con el contenido de estilos.css

const BotonChatWhatsApp = () => {
    
    // Función para manejar el clic y la llamada al backend.
    const handleClick = async () => {
        console.log('Botón de chat clickeado. Llamando al backend...');

        try {
            // Llama a tu backend
            const response = await fetch('http://localhost:3001/api/whatsapp-link');
            
            if (!response.ok) {
                throw new Error('El servidor del backend no respondió bien. Código: ' + response.status);
            }

            const data = await response.json();
            const link = data.whatsappUrl;
            
            if (link) {
                // ÉXITO! Redirige al usuario a WhatsApp en una pestaña nueva
                console.log('Redirigiendo a:', link);
                window.open(link, '_blank');
            } else {
                console.error('El backend no devolvió una whatsappUrl en su respuesta.');
            }

        } catch (error) {
            // Captura cualquier error 
            console.error('Error al obtener el link de WhatsApp:', error);
            alert('No se pudo conectar al chat de ayuda. Asegúrate de que el servidor backend esté corriendo en "localhost:3001".');
        }
    };

    // La sintaxis JSX para la estructura del HTML
    return (
        // En React, `id` y `className` son los atributos usados.
        // El manejador de eventos es `onClick` (camelCase).
        <div id="boton-chat-whatsapp" className="chat-icon" onClick={handleClick}>
            💬
        </div>
    );
};

export default BotonChatWhatsApp;