// 1. Espera a que todo el HTML esté cargado antes de ejecutar código
document.addEventListener('DOMContentLoaded', () => {

  console.log('Frontend cargado. app.js está listo.');

  // 2. Busca el botón de chat por su ID
  const botonChat = document.getElementById('boton-chat-whatsapp');

  // 3. Verifica si el botón realmente existe en la página
  if (botonChat) {
    
    // 4. Se prepara para reaccionar al 'clic' del usuario
    botonChat.addEventListener('click', async () => {
      console.log('Botón de chat clickeado. Llamando al backend...');
      
      try {
        // 5. Llama a tu backend (que debe estar corriendo en localhost:3001)
        const response = await fetch('http://localhost:3001/api/whatsapp-link');
        
        if (!response.ok) {
          // Si el backend falló (ej. error 500)
          throw new Error('El servidor del backend no respondió bien. Código: ' + response.status);
        }

        // 6. Convierte la respuesta (el JSON) en un objeto de JavaScript
        const data = await response.json();
        
        // 7. Obtiene la URL que el backend nos envió
        const link = data.whatsappUrl;
        
        if (link) {
          // 8. ¡ÉXITO! Redirige al usuario a WhatsApp en una pestaña nueva
          console.log('Redirigiendo a:', link);
          window.open(link, '_blank');
        } else {
          console.error('El backend no devolvió una whatsappUrl en su respuesta.');
        }

      } catch (error) {
        // 9. Captura cualquier error (ej. el backend está apagado o hay error de red)
        console.error('Error al obtener el link de WhatsApp:', error);
        alert('No se pudo conectar al chat de ayuda. Asegúrate de que el servidor backend esté corriendo en "localhost:3001".');
      }
    });
  } else {
    console.error('No se pudo encontrar el elemento con ID "boton-chat-whatsapp"');
  }
});