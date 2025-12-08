// src/screens/WelcomeScreen.js
// Vista Pública - ESTILOS EXACTOS del Figma
import React, { useState } from 'react';
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

// COLORES EXACTOS del Figma
const Colors = {
    background: '#452121',  // Marrón fondo
    cardBg: '#F7F7F1',      // Blanco/beige claro
    inputBg: '#F7F7F1',     // Input beige
    titleGold: '#D4AD58',   // Dorado
    textDark: '#452121',    // Texto oscuro
    textMuted: '#888888',
};

// Categorías de recetas
const categories = [
    { id: 1, name: 'Recetas\ncon pollo', image: require('../../assets/pollo.png') },
    { id: 2, name: 'Recetas con\ncarne de res', image: require('../../assets/carne_res.png') },
    { id: 3, name: 'Recetas con\ncarne de cerdo', image: require('../../assets/cerdo.png') },
    { id: 4, name: 'Recetas para\npostres', image: require('../../assets/postres.png') },
];

// Recetas de ejemplo
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

export default function WelcomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Recetas');

    const tabs = ['Recetas', 'Calendario', 'Libros', 'Blog'];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header: Logo + Login */}
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Pressable
                            style={styles.loginButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </Pressable>
                    </View>

                    {/* Barra de búsqueda */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar recetas.."
                            placeholderTextColor={Colors.textMuted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Tabs: Recetas, Calendario, Libros, Blog */}
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

                    {/* Categorías con círculos */}
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

                    {/* Card de recetas destacadas */}
                    <View style={styles.recipesCard}>
                        {featuredRecipes.map((recipe) => (
                            <Pressable
                                key={recipe.id}
                                style={styles.recipeItem}
                                onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
                            >
                                <View style={styles.recipeImageContainer}>
                                    <Image source={recipe.image} style={styles.recipeImage} />
                                </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
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
    loginButton: {
        backgroundColor: '#682929',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 25,
    },
    loginText: {
        color: Colors.titleGold,
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'italic',
    },
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
        color: Colors.cardBg,
        fontSize: 10,
        textAlign: 'center',
        lineHeight: 14,
    },
    recipesCard: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 20,
        borderRadius: 26,
        padding: 16,
        marginBottom: 30,
    },
    recipeItem: {
        marginBottom: 16,
    },
    recipeImageContainer: {
        width: '100%',
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.textDark,
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    recipeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 4,
    },
    recipeName: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    starCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.titleGold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star: {
        color: '#FFFFFF',
        fontSize: 12,
    },
});
