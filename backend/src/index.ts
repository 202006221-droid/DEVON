import express, { Request, Response } from 'express';
import cors from 'cors';

// 1. Inicializar la aplicación de Express
const app = express();
const PORT = 3001; // Puerto del backend

// --- CORRECCIÓN CLAVE: CONFIGURACIÓN EXPLÍCITA DE CORS ---
const corsOptions = {
    // Permite peticiones SÓLO desde tu frontend (Vite)
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'], // Define los métodos permitidos
    optionsSuccessStatus: 200
};

// 2. Usar Middlewares
app.use(cors(corsOptions)); // Aplica la configuración de CORS
app.use(express.json()); 

// 3. Definir la ruta (Endpoint) de la API
app.get('/api/whatsapp-link', (req: Request, res: Response) => {
    
    // Aquí es donde podrías consultar una base de datos en el futuro
    // Tu número de WhatsApp con código de país 591
    const numeroWhatsapp = '59165304860';
    
    // Mensaje opcional: &text=Hola%20necesito%20ayuda
    const link = `https://wa.me/${numeroWhatsapp}`; 

    // Respondemos al frontend con un objeto JSON
    res.json({
        whatsappUrl: link
    });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});