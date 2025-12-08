// ==================================================
// src/screens/PrivateScreen.js
// Vista de Perfil de Usuario
// Basado en el estilo del profesor - WelcomeScreen.js
// ==================================================

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    SafeAreaView
} from 'react-native';
import { getRecipesByUser } from '../data/RecipesDB';

// ==================================================
// COLORES - Paleta de colores del Figma
// ==================================================
const Colors = {
    background: '#452121',  // Marrón oscuro - Fondo principal
    cardBg: '#F7F7F1',      // Beige claro - Fondo de cards
    titleGold: '#D4AD58',   // Dorado - Títulos y acentos
    textDark: '#452121',    // Marrón oscuro - Texto
};

// ==================================================
// DATOS - Recetas de ejemplo (si el usuario no tiene)
// ==================================================
const defaultRecipes = [
    {
        id: 1,
        titulo: 'Bandeja paisa',
        imagen: require('../../assets/bandeja_paisa.png'),
        modo: 'Medio',
        rating: 5,
    },
    {
        id: 2,
        titulo: 'Tacos mexicanos',
        imagen: require('../../assets/tacos.png'),
        modo: 'Fácil',
        rating: 3,
    },
];

// ==================================================
// COMPONENTE PRINCIPAL - PrivateScreen
// ==================================================
export default function PrivateScreen({ navigation, route }) {
    // Obtener datos del usuario desde la navegación
    const { userName, userEmail } = route.params || { userName: 'Usuario', userEmail: '' };

    // Estados del componente
    const [activeTab, setActiveTab] = useState('Ver receta');
    const [userRecipes, setUserRecipes] = useState([]);

    // Tabs de navegación del perfil
    const tabs = ['Me gusta', 'Favoritos', 'Subir receta', 'Ver receta'];

    // Cargar recetas del usuario al entrar
    useEffect(() => {
        loadUserRecipes();
    }, []);

    // Recargar recetas cuando vuelva a la pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserRecipes();
        });
        return unsubscribe;
    }, [navigation]);

    // Función para cargar recetas del usuario
    const loadUserRecipes = () => {
        const recipes = getRecipesByUser(userEmail);
        if (recipes.length > 0) {
            setUserRecipes(recipes);
        } else {
            // Si no tiene recetas, mostrar las de ejemplo
            setUserRecipes(defaultRecipes);
        }
    };

    // Manejar cambio de tab
    const handleTabPress = (tab) => {
        setActiveTab(tab);
        if (tab === 'Subir receta') {
            navigation.navigate('AddRecipe', { userName, userEmail });
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* ========== LOGO ========== */}
                    <View style={styles.logoContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>

                    {/* ========== TÍTULO ========== */}
                    <Text style={styles.mainTitle}>Mi Perfil</Text>

                    {/* ========== CARD DE PERFIL ========== */}
                    <View style={styles.profileCard}>

                        {/* Icono de usuario */}
                        <View style={styles.userIconContainer}>
                            <View style={styles.userIconOuter}>
                                <View style={styles.userIconHead} />
                                <View style={styles.userIconBody} />
                            </View>
                        </View>

                        {/* Nombre del usuario */}
                        <Text style={styles.userName}>{userName}</Text>

                        {/* Tabs del perfil */}
                        <View style={styles.tabsContainer}>
                            {tabs.map((tab) => (
                                <Pressable
                                    key={tab}
                                    style={styles.tabButton}
                                    onPress={() => handleTabPress(tab)}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        activeTab === tab && styles.tabTextActive
                                    ]}>
                                        {tab}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* ========== RECETAS DEL USUARIO ========== */}
                    <View style={styles.recipesContainer}>
                        {userRecipes.map((recipe) => (
                            <Pressable
                                key={recipe.id}
                                style={styles.recipeCard}
                                onPress={() => navigation.navigate('RecipeDetail', {
                                    recipeId: recipe.id,
                                    userEmail
                                })}
                            >
                                {/* Imagen */}
                                <View style={styles.recipeImageContainer}>
                                    <Image
                                        source={recipe.imagen}
                                        style={styles.recipeImage}
                                    />
                                </View>

                                {/* Info: Nombre + Nivel + Estrellas */}
                                <View style={styles.recipeInfo}>
                                    <View>
                                        <Text style={styles.recipeName}>{recipe.titulo}</Text>
                                        <Text style={styles.recipeLevel}>Nivel: {recipe.modo}</Text>
                                    </View>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(recipe.rating || 3)].map((_, i) => (
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

// ==================================================
// ESTILOS - StyleSheet
// ==================================================
const styles = StyleSheet.create({
    // ----- CONTENEDOR PRINCIPAL -----
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },

    // ----- LOGO -----
    logoContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    // ----- TÍTULO -----
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FFFFFF',  // Blanco
        textAlign: 'center',
        marginVertical: 16,
    },

    // ----- CARD DE PERFIL -----
    profileCard: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
    },

    // ----- ICONO DE USUARIO -----
    userIconContainer: {
        marginBottom: 12,
    },
    userIconOuter: {
        alignItems: 'center',
    },
    userIconHead: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.textDark,
        backgroundColor: 'transparent',
    },
    userIconBody: {
        width: 30,
        height: 18,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: Colors.textDark,
        backgroundColor: 'transparent',
        marginTop: -2,
    },

    // ----- NOMBRE DE USUARIO -----
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textDark,
        fontStyle: 'italic',
        marginBottom: 24,
    },

    // ----- TABS DEL PERFIL -----
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',  // Gris claro como en Figma
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 6,
    },
    tabButton: {
        paddingHorizontal: 4,
    },
    tabText: {
        color: Colors.textDark,
        fontSize: 11,
        fontWeight: '500',
    },
    tabTextActive: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
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
    recipeLevel: {
        color: Colors.textDark,
        fontSize: 11,
        marginTop: 2,
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
