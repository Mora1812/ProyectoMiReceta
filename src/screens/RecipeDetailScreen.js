// src/screens/RecipeDetailScreen.js
// Pantalla "Detalles de la Receta" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import { getRecipeById, toggleFavorite, isFavorite } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
  background: '#452121',  // MARRÓN - Fondo
  cardBg: '#F5E6D3',      // Beige
  textDark: '#452121',
  textMuted: '#666666',
};

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipeId } = route.params;
  const userEmail = route?.params?.userEmail || 'demo@email.com';
  const [recipe, setRecipe] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = () => {
    const recipeData = getRecipeById(recipeId);
    setRecipe(recipeData);
    if (recipeData) {
      setFavorite(isFavorite(recipeId, userEmail));
    }
  };

  const handleFavorite = () => {
    toggleFavorite(recipeId, userEmail);
    setFavorite(!favorite);
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

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
            <Text style={styles.headerTitle}>Detalles de la receta</Text>

            {/* Título con corazón */}
            <View style={styles.titleRow}>
              <Text style={styles.recipeTitle}>{recipe.titulo}</Text>
              <Pressable onPress={handleFavorite}>
                <Text style={styles.heartIcon}>{favorite ? '❤️' : '🤍'}</Text>
              </Pressable>
            </View>

            <Text style={styles.recipeMeta}>{recipe.tiempo} • {recipe.modo}</Text>

            {/* Imagen */}
            <View style={styles.imageContainer}>
              {recipe.imagen ? (
                <Image source={{ uri: recipe.imagen }} style={styles.recipeImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderEmoji}>🍽️</Text>
                </View>
              )}
            </View>

            {/* Ingredientes */}
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {recipe.ingredientes.map((ing, index) => (
              <Text key={index} style={styles.listItem}>{index + 1}. {ing}</Text>
            ))}

            {/* Instrucciones */}
            <Text style={styles.sectionTitle}>Instrucciones</Text>
            {recipe.instrucciones.map((inst, index) => (
              <Text key={index} style={styles.listItem}>{index + 1}. {inst}</Text>
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
  loadingText: {
    color: Colors.cardBg,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
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
    marginBottom: 30,
    borderRadius: 20,
    padding: 18,
  },
  headerTitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  heartIcon: {
    fontSize: 24,
  },
  recipeMeta: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: 14,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D4C4B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 50,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
    marginTop: 14,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 5,
    paddingLeft: 8,
  },
});
