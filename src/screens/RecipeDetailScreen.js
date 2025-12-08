// src/screens/RecipeDetailScreen.js
// Vista de Detalles de Receta - ESTILOS EXACTOS del Figma
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  Alert
} from 'react-native';
import { getRecipeById, isFavorite, toggleFavorite, deleteRecipe } from '../data/RecipesDB';

// COLORES EXACTOS del Figma
const Colors = {
  background: '#452121',
  cardBg: '#F7F7F1',
  titleWhite: '#FFFFFF',
  textDark: '#452121',
  heartRed: '#8B2635',
  heartOutline: '#452121',
};

// Imágenes de assets disponibles
const assetImages = {
  'bandeja_paisa': require('../../assets/bandeja_paisa.png'),
  'tacos': require('../../assets/tacos.png'),
  'postres': require('../../assets/postres.png'),
  'pollo': require('../../assets/pollo.png'),
  'cerdo': require('../../assets/cerdo.png'),
  'carne_res': require('../../assets/carne_res.png'),
};

// Función para obtener la imagen correcta
const getImageSource = (imagen) => {
  if (!imagen) return null;
  if (typeof imagen === 'string' && assetImages[imagen]) {
    return assetImages[imagen];
  }
  if (typeof imagen === 'string') {
    return { uri: imagen };
  }
  return imagen;
};

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipeId, userEmail } = route.params || { recipeId: 1, userEmail: '' };

  // Estado para manejar favoritos
  const [isFav, setIsFav] = useState(false);

  // Verificar si la receta es favorita al cargar
  useEffect(() => {
    if (userEmail && recipeId) {
      setIsFav(isFavorite(recipeId, userEmail));
    }
  }, [recipeId, userEmail]);

  // Función para alternar favorito
  const handleToggleFavorite = () => {
    if (userEmail) {
      toggleFavorite(recipeId, userEmail);
      setIsFav(!isFav);
    }
  };

  // Función para ir a la pantalla de eliminar
  const handleDelete = () => {
    navigation.navigate('DeleteRecipe', { recipeId });
  };

  // Obtener la receta desde la base de datos real
  const recipeFromDB = getRecipeById(recipeId);

  // Si no se encuentra la receta, mostrar un mensaje
  if (!recipeFromDB) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.headerTitle}>Receta no{'\n'}encontrada</Text>
          </View>
          <View style={[styles.mainCard, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={styles.recipeName}>Esta receta no existe</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Preparar los datos de la receta para mostrar
  const recipe = {
    id: recipeFromDB.id,
    name: recipeFromDB.titulo,
    image: getImageSource(recipeFromDB.imagen),
    rating: recipeFromDB.rating || 3,
    time: recipeFromDB.tiempo || '30',
    level: recipeFromDB.modo || 'Fácil',
    // Formatear ingredientes con números si no los tienen
    ingredients: Array.isArray(recipeFromDB.ingredientes)
      ? recipeFromDB.ingredientes.map((ing, i) =>
        ing.match(/^\d+\./) ? ing : `${i + 1}. ${ing}`
      )
      : (recipeFromDB.ingredientes || '').split('\n').filter(i => i.trim()).map((ing, i) =>
        ing.match(/^\d+\./) ? ing : `${i + 1}. ${ing}`
      ),
    // Formatear instrucciones
    instructions: Array.isArray(recipeFromDB.instrucciones)
      ? recipeFromDB.instrucciones.join(' ')
      : recipeFromDB.instrucciones || 'Sin instrucciones disponibles.',
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header: Logo + Título */}
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.headerTitle}>Detalles de la{'\n'}receta</Text>
          </View>

          {/* Card principal */}
          <View style={styles.mainCard}>
            {/* Imagen de la receta */}
            <View style={styles.imageContainer}>
              {recipe.image ? (
                typeof recipe.image === 'string' ? (
                  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                ) : (
                  <Image source={recipe.image} style={styles.recipeImage} />
                )
              ) : (
                <View style={[styles.recipeImage, { backgroundColor: '#ddd' }]} />
              )}
            </View>

            {/* Nombre y rating */}
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(recipe.rating)].map((_, i) => (
                    <View key={i} style={styles.starCircle}>
                      <Text style={styles.star}>★</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Pressable
                style={[styles.heartButton, !isFav && styles.heartButtonOutline]}
                onPress={handleToggleFavorite}
              >
                <Text style={[styles.heartIcon, !isFav && styles.heartIconOutline]}>
                  {isFav ? '♥' : '♡'}
                </Text>
              </Pressable>
            </View>

            {/* Tiempo y Nivel */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Tiempo: {recipe.time}</Text>
              <Text style={styles.infoText}>Nivel: {recipe.level}</Text>
            </View>
          </View>

          {/* Card de ingredientes e instrucciones */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            {recipe.ingredients.map((ing, index) => (
              <Text key={index} style={styles.ingredientText}>{ing}</Text>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Instrucciones</Text>
            <Text style={styles.instructionsText}>{recipe.instructions}</Text>
          </View>

          {/* Botones de Editar y Eliminar - Solo si el usuario es el dueño */}
          {recipeFromDB.usuarioId === userEmail && (
            <View style={styles.actionButtonsContainer}>
              <Pressable
                style={styles.editButton}
                onPress={() => navigation.navigate('EditRecipe', { recipeId, userEmail })}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  headerTitle: {
    color: Colors.titleWhite,
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 32,
  },
  mainCard: {
    backgroundColor: Colors.cardBg,
    marginHorizontal: 20,
    borderRadius: 26,
    padding: 16,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeName: {
    color: '#000000',  // Negro
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  starCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.titleGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  heartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.heartRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.heartOutline,
  },
  heartIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  heartIconOutline: {
    color: Colors.heartOutline,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 8,
  },
  infoText: {
    color: '#000000',  // Negro
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: Colors.cardBg,
    marginHorizontal: 20,
    borderRadius: 26,
    padding: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#000000',  // Negro
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  ingredientText: {
    color: '#000000',  // Negro
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  instructionsText: {
    color: '#000000',  // Negro
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: '#D4AD58',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  editButtonText: {
    color: Colors.textDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'rgba(69, 33, 33, 1)',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'rgba(213, 180, 111, 1)',
    // Sombra según Figma
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // Para Android
  },
  deleteButtonText: {
    color: 'rgba(213, 180, 111, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
