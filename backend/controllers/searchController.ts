import { Request, Response } from 'express';

// Simulación de tu fuente de datos (e.g., datos cargados de una DB)
const helpArticles = [
    // Se han modificado los títulos para asegurar que 'cam' y otras letras clave funcionen.
    { id: 1, title: "Ayuda y Preguntas Frecuentes sobre Servineo", url: "/help/faqs" },
    // Este artículo SÍ DEBE COINCIDIR con "cam"
    { id: 2, title: "Cómo cambiar mi contraseña", url: "/help/password-reset" },
    { id: 3, title: "Promoción Sweet de Servineo", url: "/help/sweet-promo" },
    { id: 4, title: "Solución de problemas de inicio de sesión", url: "/help/login-troubleshoot" },
];

/**
 * Lógica de búsqueda principal para GET /api/search?q=query
 */
export const getSearch = (req: Request, res: Response) => {
    // Para la búsqueda final, simplemente devolvemos las sugerencias (simulado)
    return getSuggestions(req, res);
};

/**
 * Lógica para autocompletado o sugerencias.
 * Usado internamente por getSearch y directamente por /api/suggest
 */
export const getSuggestions = (req: Request, res: Response) => {
    // Obtener el término de búsqueda del query parameter 'q'
    const searchTerm = (req.query.q as string || '').toLowerCase().trim();
    console.log(`[Controller] Procesando búsqueda/sugerencia para: "${searchTerm}"`);

    if (!searchTerm) {
        // Si no hay término, devolver artículos populares o vacíos
        return res.json({
            message: "Artículos populares/sin filtro",
            results: helpArticles.slice(0, 3)
        });
    }

    // Filtrar los artículos que contienen el término de búsqueda
    const suggestions = helpArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm)
    ).slice(0, 5); // Limitar a 5 sugerencias

    // Devolver los resultados. El frontend espera un objeto con la propiedad 'results'.
    return res.json({
        message: `Resultados encontrados para: "${searchTerm}"`,
        results: suggestions
    });
};