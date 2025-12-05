// src/screens/HomeScreen.js
// Pantalla HOME - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Pressable,
    Image,
    SafeAreaView
} from 'react-native';
import { getAllRecipes, searchRecipes, toggleFavorite, isFavorite } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige para cards
    inputBg: '#F5E6D3',     // Beige para input
    textDark: '#452121',
    textMuted: '#666666',
};

export default function HomeScreen({ navigation, route }) {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const userEmail = route?.params?.userEmail || 'demo@email.com';

    useEffect(() => {
        loadRecipes();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadRecipes();
        });
        return unsubscribe;
    }, [navigation]);

    const loadRecipes = () => {
        const allRecipes = getAllRecipes();
        setRecipes(allRecipes);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            loadRecipes();
        } else {
            const results = searchRecipes(query);
            setRecipes(results);
        }
    };

    const handleFavorite = (recipeId) => {
        toggleFavorite(recipeId, userEmail);
        loadRecipes();
    };

    const renderRecipeCard = ({ item }) => {
        const favorite = isFavorite(item.id, userEmail);

        return (
            <Pressable
                style={styles.recipeCard}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id, userEmail })}
            >
                {/* Imagen */}
                <View style={styles.recipeImageContainer}>
                    {item.imagen ? (
                        <Image source={{ uri: item.imagen }} style={styles.recipeImage} />
                    ) : (
                        <View style={styles.recipeImagePlaceholder}>
                            <Text style={styles.placeholderEmoji}>🍽️</Text>
                        </View>
                    )}
                </View>

                {/* Info */}
                <View style={styles.recipeInfo}>
                    <Text style={styles.recipeTitle} numberOfLines={1}>{item.titulo}</Text>
                    <Text style={styles.recipeTime}>{item.tiempo} • {item.modo}</Text>
                </View>

                {/* Corazón */}
                <Pressable
                    style={styles.favoriteButton}
                    onPress={() => handleFavorite(item.id)}
                >
                    <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
                </Pressable>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header con logo y botón inglés */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Text style={styles.logoEmoji}>🍳</Text>
                    </View>
                    <Pressable style={styles.languageButton}>
                        <Text style={styles.languageText}>English</Text>
                    </Pressable>
                </View>

                {/* Barra de búsqueda */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar recetas..."
                        placeholderTextColor={Colors.textMuted}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* Lista de recetas */}
                <FlatList
                    data={recipes}
                    renderItem={renderRecipeCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.recipesList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay recetas</Text>
                        </View>
                    }
                />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.inputBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    logoEmoji: {
        fontSize: 26,
    },
    languageButton: {
        backgroundColor: Colors.inputBg,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    languageText: {
        color: Colors.textDark,
        fontWeight: '600',
        fontSize: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBg,
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.textDark,
    },
    recipesList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    recipeCard: {
        backgroundColor: Colors.cardBg,
        borderRadius: 16,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    recipeImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        overflow: 'hidden',
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    recipeImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderEmoji: {
        fontSize: 28,
    },
    recipeInfo: {
        flex: 1,
        marginLeft: 14,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textDark,
    },
    recipeTime: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 4,
    },
    favoriteButton: {
        padding: 8,
    },
    favoriteIcon: {
        fontSize: 22,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: Colors.inputBg,
        fontSize: 16,
    },
});
