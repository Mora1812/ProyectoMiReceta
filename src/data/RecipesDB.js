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
            'Frijoles',
            'Arroz',
            'Carne molida',
            'Chicharrón',
            'Huevo frito',
            'Chorizo',
            'Plátano maduro',
            'Aguacate',
            'Arepa'
        ],
        instrucciones: 'Cocina los frijoles con verduras para espesar; prepara el hogao (tomate y cebolla); fríe el chicharrón, los chorizos, y la carne molida con hogao. Fríe el huevo y las tajadas de plátano, y luego sirve todos los componentes junto al arroz, aguacate y arepa en una sola bandeja.',
        tiempo: '60 min',
        modo: 'Medio',
        imagen: 'bandeja_paisa', // Referencia a asset
        usuarioId: 'demo@email.com',
        rating: 5,
        favoritos: []
    },
    {
        id: 2,
        titulo: 'Ajiaco Santafereño',
        descripcion: 'Sopa tradicional bogotana con tres tipos de papa, pollo y guascas.',
        ingredientes: [
            'Pollo entero',
            'Papa criolla',
            'Papa pastusa',
            'Papa sabanera',
            'Mazorcas',
            'Guascas',
            'Alcaparras',
            'Crema de leche'
        ],
        instrucciones: 'Cocinar el pollo en agua con sal. Agregar las papas en orden según su cocción. Añadir las mazorcas. Agregar las guascas al final. Servir con crema, alcaparras y aguacate.',
        tiempo: '2 horas',
        modo: 'Medio',
        imagen: 'pollo',  // Usar imagen de pollo
        usuarioId: 'demo@email.com',
        rating: 4,
        favoritos: []
    },
    // ===== RECETAS DE EJEMPLO PARA EL USUARIO "MARIA" =====
    {
        id: 3,
        titulo: 'Tacos Mexicanos',
        descripcion: 'Deliciosos tacos caseros con carne sazonada, cilantro y cebolla.',
        ingredientes: [
            'Tortillas de maíz',
            'Carne de res',
            'Cebolla',
            'Cilantro',
            'Limón',
            'Salsa verde',
            'Aguacate'
        ],
        instrucciones: 'Cocina la carne con especias mexicanas. Calienta las tortillas en comal. Sirve la carne en las tortillas con cebolla, cilantro, salsa y limón al gusto.',
        tiempo: '30 min',
        modo: 'facil',
        imagen: 'tacos', // Referencia a asset
        usuarioId: 'maria@email.com',
        rating: 4,
        favoritos: []
    },
    {
        id: 4,
        titulo: 'Postre de Chocolate',
        descripcion: 'Delicioso postre de chocolate cremoso para cualquier ocasión.',
        ingredientes: [
            'Chocolate oscuro',
            'Crema de leche',
            'Azúcar',
            'Huevos',
            'Mantequilla',
            'Galletas'
        ],
        instrucciones: 'Derrite el chocolate con la mantequilla. Mezcla con la crema y los huevos batidos. Añade azúcar al gusto. Vierte sobre base de galletas. Refrigera por 4 horas.',
        tiempo: '4 horas',
        modo: 'Medio',
        imagen: 'postres', // Referencia a asset
        usuarioId: 'maria@email.com',
        rating: 5,
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
