// App.js
// Configuración de navegación - ESTILOS EXACTOS del prototipo Figma
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

// Importamos las pantallas
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import PrivateScreen from './src/screens/PrivateScreen';
import HomeScreen from './src/screens/HomeScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import EditRecipeScreen from './src/screens/EditRecipeScreen';
import DeleteRecipeScreen from './src/screens/DeleteRecipeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import NewSectionScreen from './src/screens/NewSectionScreen';
import CreateSectionScreen from './src/screens/CreateSectionScreen';

// COLORES EXACTOS del prototipo Figma
const Colors = {
  background: '#452121',   // MARRÓN - Fondo principal
  cardBg: '#F5E6D3',       // Beige/crema - Cards
  tabBar: '#452121',       // Marrón - Tab bar
  tabBarActive: '#F5E6D3', // Beige para tab activo
  tabBarInactive: '#A89080', // Marrón claro para tabs inactivos
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de Tabs (pantallas principales)
function MainTabs({ route }) {
  const { userName, userEmail } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarIcon: ({ focused, color }) => {
          let icon;
          if (route.name === 'Home') icon = '🏠';
          else if (route.name === 'MyRecipes') icon = '📖';
          else if (route.name === 'AddRecipe') icon = '➕';
          else if (route.name === 'Sections') icon = '📁';
          else if (route.name === 'Profile') icon = '👤';

          return (
            <Text style={{ fontSize: focused ? 22 : 18 }}>{icon}</Text>
          );
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
        initialParams={{ userName, userEmail }}
      />
      <Tab.Screen
        name="MyRecipes"
        component={MyRecipesScreen}
        options={{ tabBarLabel: 'Mis Recetas' }}
        initialParams={{ userName, userEmail }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{ tabBarLabel: 'Agregar' }}
        initialParams={{ userName, userEmail }}
      />
      <Tab.Screen
        name="Sections"
        component={NewSectionScreen}
        options={{ tabBarLabel: 'Secciones' }}
      />
      <Tab.Screen
        name="Profile"
        component={PrivateScreen}
        options={{ tabBarLabel: 'Perfil' }}
        initialParams={{ userName, userEmail }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        {/* Pantallas de autenticación */}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Pantalla principal con tabs */}
        <Stack.Screen name="Private" component={MainTabs} />

        {/* Pantallas de recetas (sin tabs) */}
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
        <Stack.Screen name="DeleteRecipe" component={DeleteRecipeScreen} />

        {/* Pantallas de secciones */}
        <Stack.Screen name="CreateSection" component={CreateSectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}