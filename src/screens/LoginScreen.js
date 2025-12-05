// src/screens/LoginScreen.js
// Pantalla de Login - ESTILOS 100% IDÉNTICOS al prototipo Figma
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
    ScrollView,
    Image
} from 'react-native';
import { validateUser } from '../data/UsersDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige/crema - Card
    inputBg: '#452121',     // Marrón - Inputs
    textLight: '#F5E6D3',   // Texto claro
    textDark: '#452121',    // Texto oscuro
    textMuted: '#888888',   // Placeholder
    accent: '#C4A35A',      // Dorado para links
};

export default function LoginScreen({ navigation }) {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!correo || !password) {
            Alert.alert('Error', 'Debes ingresar correo y contraseña');
            return;
        }

        const result = validateUser(correo, password);

        if (!result.ok) {
            if (result.reason === 'not_found') {
                Alert.alert('Error', 'No existe usuario con ese correo');
            } else {
                Alert.alert('Error', 'Contraseña incorrecta');
            }
            return;
        }

        navigation.navigate('Private', { userName: result.user.nombre, userEmail: result.user.correo });
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
                    {/* Logo circular con imagen de cubiertos */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoEmoji}>🍳</Text>
                            <Text style={styles.logoText}>MiReceta</Text>
                        </View>
                    </View>

                    {/* Título */}
                    <Text style={styles.mainTitle}>Inicia seccion</Text>

                    {/* Card beige */}
                    <View style={styles.card}>
                        {/* Icono Google */}
                        <View style={styles.googleContainer}>
                            <Text style={styles.googleIcon}>G</Text>
                        </View>

                        <Text style={styles.orText}>O</Text>

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

                        <Pressable onPress={handleLogin}>
                            <Text style={styles.forgotText}>¿olvidaste tu contraseña?</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.createAccount}>crear cuenta</Text>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingTop: 30,
        flex: 1,
    },
    googleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    googleIcon: {
        fontSize: 28,
        color: '#4285F4',
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.textDark,
        marginBottom: 20,
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
    forgotText: {
        color: Colors.textMuted,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
    },
    createAccount: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});
