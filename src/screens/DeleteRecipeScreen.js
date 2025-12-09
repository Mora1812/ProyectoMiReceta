// ==================================================
// src/screens/DeleteRecipeScreen.js
// Pantalla para confirmar eliminación de receta
// Estilo basado en el Figma
// ==================================================

/**
 * BLOQUE: IMPORTS
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    Image,
    Alert
} from 'react-native';
import { deleteRecipe } from '../data/RecipesDB';

/**
 * BLOQUE: COLORES
 */
// ==================================================
// COLORES
// ==================================================
const Colors = {
    background: '#452121',  // Marrón oscuro
    cardBg: '#F7F7F1',      // Beige claro
    titleGold: '#D4AD58',   // Dorado
    textDark: '#452121',    // Texto oscuro
    buttonGold: '#D4AD58',  // Botón dorado
};

/**
 * BLOQUE: COMPONENTE DELETE
 * Confirmación antes de borrar permanentemente.
 */
// ==================================================
// COMPONENTE PRINCIPAL
// ==================================================
export default function DeleteRecipeScreen({ navigation, route }) {
    // Obtener el ID de la receta a eliminar y datos de usuario
    const { recipeId, userEmail, userName } = route.params;

    /**
     * BLOQUE: ELIMINACIÓN
     * Llama a la DB para borrar y navega al perfil.
     */
    // Función para eliminar la receta
    const handleDelete = () => {
        deleteRecipe(recipeId);
        Alert.alert('Receta eliminada', 'La receta fue eliminada correctamente', [
            { text: 'OK', onPress: () => navigation.navigate('Private', { userEmail, userName }) }
        ]);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                {/* ========== LOGO (volver atrás) ========== */}
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
                <Text style={styles.title}>Eliminar Receta</Text>

                {/* ========== CARD DE CONFIRMACIÓN ========== */}
                <View style={styles.card}>
                    <Text style={styles.question}>
                        ¿Seguro que quieres{'\n'}eliminar esta receta?
                    </Text>

                    {/* Botón Eliminar */}
                    <Pressable style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>Eliminar Receta</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </View>
    );
}

// ==================================================
// ESTILOS
// ==================================================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
    },

    // ----- LOGO -----
    logoContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    // ----- TÍTULO -----
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FFFFFF',  // Blanco
        marginBottom: 40,
    },

    // ----- CARD -----
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: 20,
        padding: 30,
        marginHorizontal: 30,
        alignItems: 'center',
        width: '80%',
    },
    question: {
        fontSize: 16,
        color: Colors.textDark,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },

    // ----- BOTÓN ELIMINAR -----
    deleteButton: {
        backgroundColor: Colors.buttonGold,
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 40,
        width: '100%',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
