// src/screens/NewSectionScreen.js
// Pantalla "Nueva Sección" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView
} from 'react-native';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    textDark: '#452121',
};

export default function NewSectionScreen({ navigation }) {
    const sections = [
        'Receta de Bizarro',
        'Cursos electrónicos',
        'Contraseña',
        'Idioma seleccionado 🌐',
        'Sesión correcta ✓',
        'Estos campos son',
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Text style={styles.logoEmoji}>🍳</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Card beige */}
                    <View style={styles.card}>
                        <Text style={styles.title}>Nueva sección</Text>

                        {sections.map((section, index) => (
                            <Pressable
                                key={index}
                                style={styles.optionButton}
                                onPress={() => navigation.navigate('CreateSection')}
                            >
                                <Text style={styles.optionText}>{section}</Text>
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
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    logoEmoji: {
        fontSize: 26,
    },
    card: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark,
        marginBottom: 16,
    },
    optionButton: {
        backgroundColor: Colors.background,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 14,
        color: Colors.cardBg,
    },
});
