// src/screens/LoginScreen.js
// Pantalla "Inicia seccion" - ESTILOS EXACTOS del Figma
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

// COLORES EXACTOS del Figma
const Colors = {
    background: '#452121',  // Marrón fondo
    cardBg: '#F7F7F1',      // Blanco/beige claro - CARD
    inputBg: '#452121',     // Marrón inputs
    titleGold: '#D4AD58',   // Dorado título
    textDark: '#452121',    // Texto oscuro
    textLight: '#F5E6D3',   // Texto claro
    textMuted: '#888888',
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
                    {/* Logo MiReceta */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Título - Fuente JejuHallasan, 24px, color #D4AD58 */}
                    <Text style={styles.mainTitle}>Inicia seccion</Text>

                    {/* Card - Color #F7F7F1, borderRadius 26 */}
                    <View style={styles.card}>
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

                        {/* Iniciar Sección - centrado */}
                        <Pressable onPress={handleLogin}>
                            <Text style={styles.iniciarSeccion}>Iniciar Sección</Text>
                        </Pressable>

                        {/* ¿olvidaste tu contraseña? - centrado */}
                        <Pressable>
                            <Text style={styles.forgotText}>¿olvidaste tu contraseña?</Text>
                        </Pressable>

                        {/* crear cuenta - alineado a la izquierda */}
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.crearCuenta}>crear cuenta</Text>
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
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '400',
        color: Colors.titleGold,
        textAlign: 'center',
        marginBottom: 28,
        fontStyle: 'italic',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'serif',
    },
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: 26,
        paddingHorizontal: 28,
        paddingVertical: 28,
    },
    label: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 16,
    },
    input: {
        backgroundColor: Colors.inputBg,
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 14,
        color: Colors.textLight,
    },
    iniciarSeccion: {
        color: Colors.textDark,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
        fontWeight: '500',
    },
    forgotText: {
        color: Colors.textMuted,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
    crearCuenta: {
        color: Colors.textDark,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
    },
});
