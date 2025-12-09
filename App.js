// ==================================================
// App.js
// Configuración de navegación principal
// Requisitos del profesor:
// 1. Autenticación (Login/Register)
// 2. Vista privada (solo usuarios autenticados)
// 3. CRUD de recetas (Crear, Leer, Actualizar, Eliminar)
// ==================================================

/**
 * BLOQUE: IMPORTS
 * - NavigationContainer: Contenedor principal de navegación.
 * - createNativeStackNavigator: Gestor de pila para pantallas.
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * BLOQUE: IMPORTS DE PANTALLAS
 */
// Vista pública (antes de login)
import WelcomeScreen from './src/screens/WelcomeScreen';

// Autenticación
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Vista privada (después de login)
import HomeScreen from './src/screens/HomeScreen';
import PrivateScreen from './src/screens/PrivateScreen';

// CRUD de recetas
import AddRecipeScreen from './src/screens/AddRecipeScreen';       // CREATE
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'; // READ
import EditRecipeScreen from './src/screens/EditRecipeScreen';     // UPDATE
import DeleteRecipeScreen from './src/screens/DeleteRecipeScreen'; // DELETE

/**
 * BLOQUE: CONFIGURACIÓN
 * - Colors: Colores globales para el navegador.
 * - Stack: Instancia del navegador.
 */
// COLORES
const Colors = {
  background: '#452121',   // Marrón - Fondo principal
  cardBg: '#F7F7F1',       // Beige - Cards
};

// NAVEGACIÓN
const Stack = createNativeStackNavigator();

/**
 * BLOQUE: COMPONENTE APP
 * Define la estructura de navegación de toda la aplicación.
 * initialRouteName="Welcome": Inicia en la pantalla de bienvenida.
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        {/* ========== VISTA PÚBLICA ========== */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* ========== AUTENTICACIÓN ========== */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* ========== VISTA PRIVADA ========== */}
        {/* Solo accesible después de login */}
        <Stack.Screen name="Private" component={HomeScreen} />
        <Stack.Screen name="Profile" component={PrivateScreen} />

        {/* ========== CRUD DE RECETAS ========== */}
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
        <Stack.Screen name="DeleteRecipe" component={DeleteRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}