// src/screens/AddRecipeScreen.js
// Pantalla "Agregar Receta" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveRecipe } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    inputBg: '#452121',     // Marrón para inputs
    textLight: '#F5E6D3',
    textDark: '#452121',
    textMuted: '#888888',
};

export default function AddRecipeScreen({ navigation, route }) {
    const userEmail = route?.params?.userEmail || 'demo@email.com';

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [modo, setModo] = useState('');
    const [imagen, setImagen] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setImagen(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setImagen(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert('Subir foto', 'Elige una opción', [
            { text: 'Cámara', onPress: takePhoto },
            { text: 'Galería', onPress: pickImage },
            { text: 'Cancelar', style: 'cancel' },
        ]);
    };

    const handleSave = () => {
        if (!titulo) {
            Alert.alert('Error', 'El título es obligatorio');
            return;
        }

        const newRecipe = {
            titulo,
            descripcion,
            ingredientes: ingredientes.split('\n').filter(i => i.trim() !== ''),
            instrucciones: [],
            tiempo: tiempo || '30 min',
            modo: modo || 'Medio',
            imagen,
        };

        saveRecipe(newRecipe, userEmail);
        Alert.alert('Éxito', 'Receta guardada', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

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
                        <Text style={styles.cardTitle}>Agregar Receta</Text>

                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />

                        <Text style={styles.label}>Ingredientes</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholderTextColor={Colors.textMuted}
                            multiline
                            textAlignVertical="top"
                            value={ingredientes}
                            onChangeText={setIngredientes}
                        />

                        <Text style={styles.label}>Tiempo</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            value={tiempo}
                            onChangeText={setTiempo}
                        />

                        <Text style={styles.label}>Modo</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.textMuted}
                            value={modo}
                            onChangeText={setModo}
                        />

                        {/* Subir foto */}
                        <Pressable style={styles.photoButton} onPress={showImageOptions}>
                            {imagen ? (
                                <Image source={{ uri: imagen }} style={styles.previewImage} />
                            ) : (
                                <>
                                    <Text style={styles.photoIcon}>📷</Text>
                                    <Text style={styles.photoText}>Subir foto</Text>
                                </>
                            )}
                        </Pressable>

                        {/* Botón Guardar */}
                        <Pressable style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Guardar Receta</Text>
                        </Pressable>
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
        paddingVertical: 14,
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
        marginBottom: 30,
        borderRadius: 20,
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark,
        marginBottom: 14,
    },
    label: {
        color: Colors.textDark,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: Colors.inputBg,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: Colors.textLight,
    },
    textArea: {
        minHeight: 80,
        paddingTop: 14,
    },
    photoButton: {
        backgroundColor: Colors.inputBg,
        borderRadius: 20,
        height: 100,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    photoIcon: {
        fontSize: 30,
    },
    photoText: {
        color: Colors.textLight,
        fontSize: 13,
        marginTop: 4,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    saveButton: {
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: Colors.textLight,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
