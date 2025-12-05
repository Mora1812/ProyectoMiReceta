// src/screens/MyRecipesScreen.js
// Pantalla "Tus Recetas" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    Image,
    SafeAreaView
} from 'react-native';
import { getAllRecipes } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    textDark: '#452121',
    textMuted: '#666666',
};

export default function MyRecipesScreen({ navigation, route }) {
    const [recipes, setRecipes] = useState([]);

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

    const renderRecipeCard = ({ item }) => (
        <View style={styles.card}>
            {/* Header con logo */}
            <View style={styles.cardHeader}>
                <View style={styles.logoSmall}>
                    <Text style={styles.logoEmoji}>🍳</Text>
                </View>
                <Text style={styles.headerTitle}>Tus Recetas</Text>
            </View>

            {/* Imagen */}
            <View style={styles.imageContainer}>
                {item.imagen ? (
                    <Image source={{ uri: item.imagen }} style={styles.recipeImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderEmoji}>🍽️</Text>
                    </View>
                )}
            </View>

            {/* Título y tiempo */}
            <Text style={styles.recipeTitle}>{item.titulo}</Text>
            <Text style={styles.recipeTime}>{item.tiempo} • {item.modo}</Text>

            {/* Ingredientes */}
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {item.ingredientes.slice(0, 4).map((ing, index) => (
                <Text key={index} style={styles.listItem}>• {ing}</Text>
            ))}

            {/* Instrucciones */}
            <Text style={styles.sectionTitle}>Instrucciones</Text>
            {item.instrucciones.slice(0, 2).map((inst, index) => (
                <Text key={index} style={styles.listItem} numberOfLines={1}>
                    {index + 1}. {inst}
                </Text>
            ))}

            {/* Botones */}
            <View style={styles.buttonsRow}>
                <Pressable
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('EditRecipe', { recipeId: item.id })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </Pressable>
                <Pressable
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('DeleteRecipe', { recipeId: item.id })}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={recipes}
                    renderItem={renderRecipeCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No tienes recetas</Text>
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
    listContainer: {
        padding: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: 20,
        padding: 18,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    logoSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.background,
        marginRight: 12,
    },
    logoEmoji: {
        fontSize: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textDark,
    },
    imageContainer: {
        width: '100%',
        height: 140,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 14,
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D4C4B0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderEmoji: {
        fontSize: 40,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark,
    },
    recipeTime: {
        fontSize: 13,
        color: Colors.textMuted,
        marginTop: 4,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.background,
        marginTop: 10,
        marginBottom: 6,
    },
    listItem: {
        fontSize: 13,
        color: Colors.textDark,
        marginLeft: 8,
        marginBottom: 3,
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.cardBg,
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: Colors.cardBg,
        fontSize: 16,
    },
});
