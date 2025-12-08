// src/screens/RegisterScreen.js
// Pantalla "Crear seccion" - ESTILOS EXACTOS del Figma
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
import { saveUser } from '../data/UsersDB';

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
            { text: 'Iniciar Sección', onPress: () => navigation.navigate('Login') },
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
                    {/* Logo MiReceta */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Título - color #D4AD58 */}
                    <Text style={styles.mainTitle}>Crear seccion</Text>

                    {/* Card - Color #F7F7F1, borderRadius 26 */}
                    <View style={styles.card}>
                        <Text style={styles.label}>Nombre de Usuario</Text>
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

                        {/* crear cuenta - centrado */}
                        <Pressable onPress={handleRegister}>
                            <Text style={styles.crearCuenta}>crear cuenta</Text>
                        </Pressable>

                        {/* O - centrado */}
                        <Text style={styles.orText}>O</Text>

                        {/* Iniciar Sección - centrado */}
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.iniciarSeccion}>Iniciar Sección</Text>
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
    crearCuenta: {
        color: Colors.textDark,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 28,
    },
    orText: {
        color: Colors.textDark,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: 'bold',
    },
    iniciarSeccion: {
        color: Colors.textDark,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: '500',
    },
});
