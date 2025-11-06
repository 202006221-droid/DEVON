import express, { Request, Response } from 'express';
import cors from 'cors';

// 1. Inicializar la aplicación de Express
const app = express();
const PORT = 3001; // Usamos 3001 para no chocar con el frontend (que suele usar 3000)

// 2. Usar Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON

// 3. Definir la ruta (Endpoint) de la API
app.get('/api/whatsapp-link', (req: Request, res: Response) => {
  
  // Aquí es donde podrías consultar una base de datos en el futuro
  // Por ahora, lo dejamos "quemado" en el backend
  const numeroWhatsapp = '59165304860';
  const mensajePredeterminado = 'Hola, necesito ayuda con un problema.';

  const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensajePredeterminado)}`;

  // Respondemos al frontend con un objeto JSON
  res.json({
    whatsappUrl: link
  });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});