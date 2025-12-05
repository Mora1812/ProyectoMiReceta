// src/data/RecipesDB.js
// Base de datos en memoria para las recetas

// Contador para generar IDs únicos
let recipeIdCounter = 1;

// Almacén de recetas: { id: recipeObject }
const recipes = {};

// Recetas de ejemplo para mostrar en la app
const sampleRecipes = [
    {
        id: 1,
        titulo: 'Bandeja paisa',
        descripcion: 'Plato típico colombiano con frijoles, arroz, carne molida, chicharrón, huevo frito, arepa, aguacate y plátano maduro.',
        ingredientes: [
            '1 taza de frijoles',
            '1 taza de arroz blanco',
            '200g de carne molida',
            '100g de chicharrón',
            '1 huevo',
            '1 arepa',
            '1 aguacate',
            '1 plátano maduro'
        ],
        instrucciones: [
            'Cocinar los frijoles hasta que estén tiernos',
            'Preparar el arroz blanco',
            'Freír la carne molida con condimentos',
            'Freír el chicharrón hasta que esté crujiente',
            'Freír el huevo',
            'Asar la arepa',
            'Freír el plátano maduro',
            'Servir todo en un plato grande'
        ],
        tiempo: '1:30 min',
        modo: 'Medio',
        imagen: null,
        usuarioId: 'demo@email.com',
        favoritos: []
    },
    {
        id: 2,
        titulo: 'Ajiaco Santafereño',
        descripcion: 'Sopa tradicional bogotana con tres tipos de papa, pollo y guascas.',
        ingredientes: [
            '1 pollo entero',
            '500g papa criolla',
            '500g papa pastusa',
            '500g papa sabanera',
            '2 mazorcas',
            'Guascas al gusto',
            'Alcaparras',
            'Crema de leche'
        ],
        instrucciones: [
            'Cocinar el pollo en agua con sal',
            'Agregar las papas en orden según su cocción',
            'Añadir las mazorcas',
            'Agregar las guascas al final',
            'Servir con crema, alcaparras y aguacate'
        ],
        tiempo: '2:00 min',
        modo: 'Medio',
        imagen: null,
        usuarioId: 'demo@email.com',
        favoritos: []
    }
];

// Inicializar con recetas de ejemplo
sampleRecipes.forEach(recipe => {
    recipes[recipe.id] = recipe;
    recipeIdCounter = Math.max(recipeIdCounter, recipe.id + 1);
});

/**
 * Obtener todas las recetas
 */
export function getAllRecipes() {
    return Object.values(recipes);
}

/**
 * Obtener una receta por ID
 */
export function getRecipeById(id) {
    return recipes[id] || null;
}

/**
 * Obtener recetas de un usuario específico
 */
export function getRecipesByUser(usuarioId) {
    return Object.values(recipes).filter(r => r.usuarioId === usuarioId);
}

/**
 * Guardar una nueva receta
 */
export function saveRecipe(recipeData, usuarioId) {
    const id = recipeIdCounter++;
    const newRecipe = {
        id,
        ...recipeData,
        usuarioId,
        favoritos: []
    };
    recipes[id] = newRecipe;
    return newRecipe;
}

/**
 * Actualizar una receta existente
 */
export function updateRecipe(id, recipeData) {
    if (!recipes[id]) {
        return null;
    }
    recipes[id] = {
        ...recipes[id],
        ...recipeData
    };
    return recipes[id];
}

/**
 * Eliminar una receta
 */
export function deleteRecipe(id) {
    if (!recipes[id]) {
        return false;
    }
    delete recipes[id];
    return true;
}

/**
 * Agregar/quitar de favoritos
 */
export function toggleFavorite(recipeId, userId) {
    const recipe = recipes[recipeId];
    if (!recipe) return false;

    const index = recipe.favoritos.indexOf(userId);
    if (index === -1) {
        recipe.favoritos.push(userId);
    } else {
        recipe.favoritos.splice(index, 1);
    }
    return true;
}

/**
 * Verificar si es favorito
 */
export function isFavorite(recipeId, userId) {
    const recipe = recipes[recipeId];
    if (!recipe) return false;
    return recipe.favoritos.includes(userId);
}

/**
 * Buscar recetas por título
 */
export function searchRecipes(query) {
    const lowerQuery = query.toLowerCase();
    return Object.values(recipes).filter(r =>
        r.titulo.toLowerCase().includes(lowerQuery) ||
        r.descripcion.toLowerCase().includes(lowerQuery)
    );
}
