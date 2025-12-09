// ==================================================
// src/screens/EditRecipeScreen.js
// Pantalla "Editar Receta" - ESTILOS IGUALES a AddRecipeScreen
// ==================================================

/**
 * BLOQUE: IMPORTS
 */
import React, { useState, useEffect } from 'react';
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
import { getRecipeById, updateRecipe } from '../data/RecipesDB';

/**
 * BLOQUE: COLORES
 */
// COLORES - Mismos que AddRecipeScreen
const Colors = {
    background: '#452121',
    cardBg: '#F7F7F1',
    inputBg: '#F5E8E8',      // Rosado/beige claro para inputs
    titleLight: '#F5E6D3',   // Beige claro para título
    titleGold: '#D4AD58',
    textDark: '#452121',
};

/**
 * BLOQUE: COMPONENTE EDIT RECIPE
 * Permite modificar una receta existente. Pre-carga los datos.
 */
export default function EditRecipeScreen({ navigation, route }) {
    const { recipeId } = route.params;

    // Estados del formulario
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [nivel, setNivel] = useState('');
    const [foto, setFoto] = useState(null);

    /**
     * BLOQUE: CARGA INICIAL
     * Obtiene los datos de la receta por ID y rellena los estados.
     */
    // Cargar datos de la receta al iniciar
    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = () => {
        const recipe = getRecipeById(recipeId);
        if (recipe) {
            setTitulo(recipe.titulo);
            setDescripcion(recipe.descripcion || '');
            setIngredientes(Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(', ') : recipe.ingredientes || '');
            setTiempo(recipe.tiempo);
            setNivel(recipe.modo);
            setFoto(recipe.imagen);
        }
    };

    /**
     * BLOQUE: SELECCIÓN IMAGEN
     */
    // Seleccionar imagen
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    /**
     * BLOQUE: ACTUALIZAR
     * Guarda los cambios en la receta.
     */
    // Guardar cambios
    const handleGuardar = () => {
        if (!titulo.trim()) {
            Alert.alert('Error', 'El título es obligatorio');
            return;
        }

        const updatedRecipe = {
            titulo: titulo,
            descripcion: descripcion,
            ingredientes: ingredientes.split(',').map(i => i.trim()).filter(i => i !== ''),
            instrucciones: [descripcion],
            tiempo: tiempo || '30 min',
            modo: nivel || 'Medio',
            imagen: foto,
        };

        updateRecipe(recipeId, updatedRecipe);
        Alert.alert('Éxito', 'Receta actualizada', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>

                    {/* Título "Editar Receta" */}
                    <Text style={styles.mainTitle}>Editar Receta</Text>

                    {/* Card del formulario */}
                    <View style={styles.formCard}>
                        {/* Titulo */}
                        <Text style={styles.label}>Titulo</Text>
                        <TextInput
                            style={styles.input}
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        {/* Descripcion */}
                        <Text style={styles.label}>Descripcion</Text>
                        <TextInput
                            style={styles.input}
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />

                        {/* Ingredientes */}
                        <Text style={styles.label}>Ingredientes</Text>
                        <TextInput
                            style={styles.input}
                            value={ingredientes}
                            onChangeText={setIngredientes}
                        />

                        {/* Tiempo */}
                        <Text style={styles.label}>Tiempo</Text>
                        <TextInput
                            style={styles.input}
                            value={tiempo}
                            onChangeText={setTiempo}
                        />

                        {/* Nivel */}
                        <Text style={styles.label}>Nivel</Text>
                        <TextInput
                            style={styles.input}
                            value={nivel}
                            onChangeText={setNivel}
                        />

                        {/* Subir foto */}
                        <View style={styles.subirFotoContainer}>
                            <Text style={styles.subirFotoText}>Subir foto</Text>
                            <Pressable style={styles.cameraButton} onPress={pickImage}>
                                <Image
                                    source={require('../../assets/camera_icon.png')}
                                    style={styles.cameraIcon}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>

                        {foto && typeof foto === 'string' && foto.startsWith('file') && (
                            <Image source={{ uri: foto }} style={styles.previewImage} />
                        )}
                    </View>

                    {/* Botón Actualizar Receta */}
                    <Pressable style={styles.guardarButton} onPress={handleGuardar}>
                        <Text style={styles.guardarText}>Actualizar Receta</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// ESTILOS - Iguales a AddRecipeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    logoContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',  // Blanco
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'italic',
    },
    formCard: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 20,
        borderRadius: 26,
        paddingVertical: 24,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    label: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.inputBg,  // Rosado/beige claro
        borderRadius: 0,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: Colors.textDark,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.textDark,
    },
    subirFotoContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    subirFotoText: {
        color: Colors.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    cameraButton: {
        alignSelf: 'center',
    },
    cameraIcon: {
        width: 50,
        height: 40,
    },
    previewImage: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        marginTop: 10,
    },
    guardarButton: {
        backgroundColor: Colors.titleGold,  // Fondo DORADO
        marginHorizontal: 50,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    guardarText: {
        color: Colors.textDark,  // Texto MARRÓN
        fontSize: 18,
        fontWeight: 'bold',
    },
});
