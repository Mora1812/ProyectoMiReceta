// src/screens/RegisterScreen.js
// Pantalla de Registro - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { saveUser } from '../data/UsersDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige/crema - Card
    inputBg: '#452121',     // Marrón - Inputs
    textLight: '#F5E6D3',   // Texto claro
    textDark: '#452121',    // Texto oscuro
    textMuted: '#888888',
    accent: '#C4A35A',
};

export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (!nombre || !correo || !password) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        const ok = saveUser(nombre, correo, password);

        if (!ok) {
            Alert.alert('Error', 'Ya existe usuario con ese correo');
            return;
        }

        Alert.alert('Éxito', 'Cuenta creada correctamente', [
            { text: 'Ir a Login', onPress: () => navigation.navigate('Login') },
        ]);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoEmoji}>🍳</Text>
                            <Text style={styles.logoText}>MiReceta</Text>
                        </View>
                    </View>

                    {/* Título */}
                    <Text style={styles.mainTitle}>Crear cuenta</Text>

                    {/* Card beige */}
                    <View style={styles.card}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <Text style={styles.label}>Correo electronico</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={correo}
                            onChangeText={setCorreo}
                        />

                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Pressable style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>Registrarme</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    logoEmoji: {
        fontSize: 32,
    },
    logoText: {
        fontSize: 12,
        color: Colors.textDark,
        fontWeight: '600',
        marginTop: -2,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent,
        textAlign: 'center',
        marginBottom: 24,
        fontStyle: 'italic',
    },
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: 30,
        padding: 24,
        paddingTop: 30,
        flex: 1,
    },
    label: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 8,
    },
    input: {
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 12,
    },
    registerButton: {
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: Colors.textLight,
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        color: Colors.textDark,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
});
