import { Router } from 'express';
// Importamos las funciones getSearch y getSuggestions
import { getSearch, getSuggestions } from '../controllers/searchController.js'; 

const router = Router();

// RUTA PRINCIPAL DE BÚSQUEDA (La que llama el frontend con axios)
router.get('/search', getSearch);

// Ruta para el autocompletado/sugerencias
router.get('/suggest', getSuggestions);

export default router;