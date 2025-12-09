// ==================================================
// src/screens/HomeScreen.js
// Vista Principal Privada (después de login)
// Basado en el estilo del profesor - WelcomeScreen.js
// ==================================================

/**
 * BLOQUE: IMPORTS
 * Dependencias visuales de React Native y acceso a recetas.
 */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    SafeAreaView
} from 'react-native';
import { getAllRecipes } from '../data/RecipesDB';

/**
 * BLOQUE: CONFIGURACIÓN DE COLORES
 */
// COLORES - Paleta de colores del Figma
const Colors = {
    background: '#452121',  // Marrón oscuro - Fondo principal
    cardBg: '#F7F7F1',      // Beige claro - Fondo de cards
    inputBg: '#F7F7F1',     // Beige claro - Input de búsqueda
    titleGold: '#D4AD58',   // Dorado - Títulos y acentos
    textDark: '#452121',    // Marrón oscuro - Texto
    textMuted: '#888888',   // Gris - Placeholder
};

/**
 * BLOQUE: DATOS ESTÁTICOS
 * Categorías y recetas destacadas por defecto.
 */
// Categorías de recetas (círculos)
const categories = [
    { id: 1, name: 'Recetas\ncon pollo', image: require('../../assets/pollo.png') },
    { id: 2, name: 'Recetas con\ncarne de res', image: require('../../assets/carne_res.png') },
    { id: 3, name: 'Recetas con\ncarne de cerdo', image: require('../../assets/cerdo.png') },
    { id: 4, name: 'Recetas para\npostres', image: require('../../assets/postres.png') },
];

// Recetas destacadas (cards principales)
const featuredRecipes = [
    {
        id: 1,
        name: 'Bandeja paisa',
        image: require('../../assets/bandeja_paisa.png'),
        rating: 5
    },
    {
        id: 2,
        name: 'Tacos mexicanos',
        image: require('../../assets/tacos.png'),
        rating: 3
    },
];

/**
 * BLOQUE: COMPONENTE HOMESCREEN
 * Pantalla principal donde se listan todas las recetas y categorías.
 */
export default function HomeScreen({ navigation, route }) {
    // Obtener datos del usuario desde la navegación
    const { userName, userEmail } = route.params || { userName: 'Usuario', userEmail: '' };

    // Estados del componente
    const [searchQuery, setSearchQuery] = useState('');    // Búsqueda
    const [activeTab, setActiveTab] = useState('Recetas'); // Tab activo
    const [recipes, setRecipes] = useState(featuredRecipes); // Recetas a mostrar

    /**
     * BLOQUE: CARGA DE RECETAS
     * Se ejecuta al montar y al recibir foco para actualizar la lista.
     */
    // Cargar recetas de la base de datos
    useEffect(() => {
        loadRecipes();
    }, []);

    // Recargar cuando la pantalla recibe foco
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadRecipes();
        });
        return unsubscribe;
    }, [navigation]);

    // Mapa de imágenes de assets
    const assetImages = {
        'bandeja_paisa': require('../../assets/bandeja_paisa.png'),
        'tacos': require('../../assets/tacos.png'),
        'postres': require('../../assets/postres.png'),
        'pollo': require('../../assets/pollo.png'),
        'carne_res': require('../../assets/carne_res.png'),
        'cerdo': require('../../assets/cerdo.png'),
        'ajiaco': require('../../assets/pollo.png'),  // Ajiaco usa imagen de pollo
    };

    // Imagen por defecto si no existe
    const defaultImage = require('../../assets/postres.png');

    // Función para cargar recetas
    const loadRecipes = () => {
        const allRecipes = getAllRecipes();
        if (allRecipes.length > 0) {
            const mapped = allRecipes.map(r => ({
                id: r.id,
                name: r.titulo,
                // Convertir nombre de imagen a require() o usar imagen por defecto
                image: assetImages[r.imagen] || defaultImage,
                rating: r.rating || 3
            }));
            setRecipes(mapped);
        } else {
            setRecipes(featuredRecipes);
        }
    };

    /**
     * BLOQUE: FILTRADO
     * Filtra la lista según el texto de búsqueda.
     */
    // Filtrar recetas según búsqueda
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tabs de navegación
    const tabs = ['Recetas', 'Calendario', 'Libros', 'Blog'];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* ========== HEADER ========== */}
                    {/* Logo a la izquierda, botón Perfil a la derecha */}
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Pressable
                            style={styles.perfilButton}
                            onPress={() => navigation.navigate('Profile', { userName, userEmail })}
                        >
                            <Text style={styles.perfilText}>perfil</Text>
                        </Pressable>
                    </View>

                    {/* ========== BARRA DE BÚSQUEDA ========== */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar recetas.."
                            placeholderTextColor={Colors.textMuted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* ========== TABS DE NAVEGACIÓN ========== */}
                    {/* Recetas, Calendario, Libros, Blog */}
                    <View style={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <Pressable
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.tabActive]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                    {tab}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* ========== CATEGORÍAS (CÍRCULOS) ========== */}
                    {/* Pollo, Res, Cerdo, Postres */}
                    <View style={styles.categoriesContainer}>
                        {categories.map((cat) => (
                            <View key={cat.id} style={styles.categoryItem}>
                                <View style={styles.categoryCircle}>
                                    <Image source={cat.image} style={styles.categoryImage} />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* ========== RECETAS DESTACADAS ========== */}
                    {/* Cards individuales con borde café */}
                    <View style={styles.recipesContainer}>
                        {filteredRecipes.map((recipe) => (
                            <Pressable
                                key={recipe.id}
                                style={styles.recipeCard}
                                onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id, userEmail, userName })}
                            >
                                {/* Imagen de la receta */}
                                <View style={styles.recipeImageContainer}>
                                    <Image
                                        source={typeof recipe.image === 'string' ? { uri: recipe.image } : recipe.image}
                                        style={styles.recipeImage}
                                    />
                                </View>

                                {/* Info: Nombre + Estrellas */}
                                <View style={styles.recipeInfo}>
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(recipe.rating)].map((_, i) => (
                                            <View key={i} style={styles.starCircle}>
                                                <Text style={styles.star}>★</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

/**
 * BLOQUE: ESTILOS
 */
const styles = StyleSheet.create({
    // ----- CONTENEDOR PRINCIPAL -----
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },

    // ----- HEADER -----
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    perfilButton: {
        backgroundColor: '#682929',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 25,
    },
    perfilText: {
        color: Colors.titleGold,
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'italic',
    },

    // ----- BARRA DE BÚSQUEDA -----
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: Colors.inputBg,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        color: Colors.textDark,
        borderWidth: 2,
        borderColor: Colors.textDark,
    },

    // ----- TABS -----
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        gap: 8,
    },
    tab: {
        backgroundColor: '#682929',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    tabActive: {
        backgroundColor: '#682929',
    },
    tabText: {
        color: Colors.titleGold,
        fontSize: 12,
        fontWeight: '600',
    },
    tabTextActive: {
        color: Colors.titleGold,
    },

    // ----- CATEGORÍAS -----
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    categoryItem: {
        alignItems: 'center',
        width: '23%',
    },
    categoryCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: Colors.cardBg,
        overflow: 'hidden',
        marginBottom: 8,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        color: Colors.titleGold,  // Texto dorado
        fontSize: 10,
        textAlign: 'center',
        lineHeight: 14,
    },

    // ----- CONTENEDOR DE RECETAS -----
    recipesContainer: {
        // Sin fondo - las tarjetas van directamente sobre el fondo oscuro
        marginHorizontal: 20,
        marginBottom: 30,
    },

    // ----- CARD DE RECETA (bloque individual) -----
    recipeCard: {
        backgroundColor: '#F7F7F1',  // Beige claro
        borderRadius: 16,
        borderWidth: 3,              // Borde café
        borderColor: '#452121',      // Marrón oscuro
        marginBottom: 20,
        padding: 10,                 // Padding interno
    },
    recipeImageContainer: {
        width: '100%',
        height: 140,
        borderRadius: 12,
        borderWidth: 3,              // Borde marrón en la imagen
        borderColor: '#452121',
        overflow: 'hidden',
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    recipeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 4,
    },
    recipeName: {
        color: '#000000',  // Negro
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    // ----- ESTRELLAS DE RATING -----
    ratingContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    starCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.titleGold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});
