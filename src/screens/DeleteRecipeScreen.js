// src/screens/DeleteRecipeScreen.js
// Pantalla "Eliminar Receta" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView
} from 'react-native';
import { getRecipeById, deleteRecipe } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    inputBg: '#452121',     // Marrón
    textLight: '#F5E6D3',
    textDark: '#452121',
};

export default function DeleteRecipeScreen({ navigation, route }) {
    const { recipeId } = route.params;
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const recipeData = getRecipeById(recipeId);
        setRecipe(recipeData);
    }, []);

    const handleDelete = () => {
        deleteRecipe(recipeId);
        navigation.navigate('MyRecipes');
    };

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Text style={styles.logoEmoji}>🍳</Text>
                    </View>
                </View>

                {/* Card beige */}
                <View style={styles.card}>
                    <Text style={styles.title}>Eliminar Receta</Text>

                    <View style={styles.messageBox}>
                        <Text style={styles.messageText}>¿Seguro que quieres</Text>
                        <Text style={styles.messageText}>eliminar esta receta?</Text>
                    </View>

                    <Pressable style={styles.button} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Eliminar Receta</Text>
                    </Pressable>
                </View>
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
    loadingText: {
        color: Colors.cardBg,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 100,
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    logoEmoji: {
        fontSize: 30,
    },
    card: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 24,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textDark,
        marginBottom: 20,
    },
    messageBox: {
        backgroundColor: Colors.inputBg,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    messageText: {
        fontSize: 15,
        color: Colors.textLight,
        textAlign: 'center',
    },
    button: {
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.textLight,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
