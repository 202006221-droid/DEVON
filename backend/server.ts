import express from 'express';
import cors from 'cors'; 
// Importamos directamente el archivo de rutas para que Express pueda utilizarlas
import searchRoutes from './routes/searchRoutes.js'; 

const app = express();
const PORT = 3001; 
const HOST = '0.0.0.0'; 

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API: Todo lo que comience con /api será manejado por searchRoutes
app.use('/api', searchRoutes);

// Usar HOST en listen
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});