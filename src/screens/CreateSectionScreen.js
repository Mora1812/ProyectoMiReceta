// src/screens/CreateSectionScreen.js
// Pantalla "Crear Sección" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    inputBg: '#452121',     // Marrón
    textDark: '#452121',
    textLight: '#F5E6D3',
    textMuted: '#888888',
};

export default function CreateSectionScreen({ navigation }) {
    const [bizarro, setBizarro] = useState('');
    const [cursos, setCursos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [idioma, setIdioma] = useState('');
    const [sesion, setSesion] = useState('');
    const [campos, setCampos] = useState('');

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
                        <Text style={styles.title}>Crear seccion</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Receta de Bizarro"
                            placeholderTextColor={Colors.textLight}
                            value={bizarro}
                            onChangeText={setBizarro}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Cursos electrónicos"
                            placeholderTextColor={Colors.textLight}
                            value={cursos}
                            onChangeText={setCursos}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor={Colors.textLight}
                            secureTextEntry
                            value={contrasena}
                            onChangeText={setContrasena}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Idioma seleccionado 🌐"
                            placeholderTextColor={Colors.textLight}
                            value={idioma}
                            onChangeText={setIdioma}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Sesión correcta ✓"
                            placeholderTextColor={Colors.textLight}
                            value={sesion}
                            onChangeText={setSesion}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Estos campos son"
                            placeholderTextColor={Colors.textLight}
                            value={campos}
                            onChangeText={setCampos}
                        />
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
    input: {
        backgroundColor: Colors.inputBg,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        fontSize: 14,
        color: Colors.textLight,
    },
});
