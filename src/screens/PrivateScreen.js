// src/screens/PrivateScreen.js
// Pantalla "Mi Perfil" - ESTILOS 100% IDÉNTICOS al prototipo Figma
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
    Alert,
    ScrollView
} from 'react-native';
import { getAllRecipes } from '../data/RecipesDB';

// COLORES EXACTOS del prototipo Figma
const Colors = {
    background: '#452121',  // MARRÓN - Fondo
    cardBg: '#F5E6D3',      // Beige
    textDark: '#452121',
    accent: '#C4A35A',
};

export default function PrivateScreen({ navigation, route }) {
    const { userName } = route.params || { userName: 'Jhullians forero' };
    const [userRecipes, setUserRecipes] = useState([]);
    const [activeTab, setActiveTab] = useState('favoritas');

    useEffect(() => {
        loadRecipes();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadRecipes();
        });
        return unsubscribe;
    }, [navigation]);

    const loadRecipes = () => {
        const recipes = getAllRecipes();
        setUserRecipes(recipes);
    };

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Salir', onPress: () => navigation.navigate('Login') }
        ]);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoEmoji}>🍳</Text>
                        </View>
                    </View>

                    {/* Card beige */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Mi Perfil</Text>

                        {/* Avatar */}
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarEmoji}>👤</Text>
                            </View>
                        </View>

                        <Text style={styles.userName}>{userName}</Text>

                        {/* Tabs */}
                        <View style={styles.tabsContainer}>
                            <Pressable
                                style={[styles.tab, activeTab === 'favoritas' && styles.tabActive]}
                                onPress={() => setActiveTab('favoritas')}
                            >
                                <Text style={[styles.tabText, activeTab === 'favoritas' && styles.tabTextActive]}>
                                    Recetas Favoritas
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.tab, activeTab === 'editar' && styles.tabActive]}
                                onPress={() => setActiveTab('editar')}
                            >
                                <Text style={[styles.tabText, activeTab === 'editar' && styles.tabTextActive]}>
                                    Editar modo
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.tab, activeTab === 'borrador' && styles.tabActive]}
                                onPress={() => setActiveTab('borrador')}
                            >
                                <Text style={[styles.tabText, activeTab === 'borrador' && styles.tabTextActive]}>
                                    Borrador
                                </Text>
                            </Pressable>
                        </View>

                        {/* Grid de recetas */}
                        <View style={styles.recipesGrid}>
                            {userRecipes.slice(0, 4).map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.gridItem}
                                    onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
                                >
                                    <View style={styles.gridImageContainer}>
                                        {item.imagen ? (
                                            <Image source={{ uri: item.imagen }} style={styles.gridImage} />
                                        ) : (
                                            <View style={styles.gridImagePlaceholder}>
                                                <Text style={styles.gridPlaceholderEmoji}>🍽️</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.gridTitle} numberOfLines={1}>{item.titulo}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Botón cerrar sesión */}
                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </Pressable>
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
        borderRadius: 20,
        padding: 18,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark,
        textAlign: 'center',
        marginBottom: 14,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.accent,
    },
    avatarEmoji: {
        fontSize: 30,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark,
        textAlign: 'center',
        marginBottom: 14,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 4,
        marginBottom: 14,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: Colors.cardBg,
    },
    tabText: {
        color: Colors.cardBg,
        fontSize: 10,
        fontWeight: '600',
    },
    tabTextActive: {
        color: Colors.textDark,
    },
    recipesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 10,
        backgroundColor: Colors.background,
        borderRadius: 12,
        overflow: 'hidden',
    },
    gridImageContainer: {
        width: '100%',
        height: 70,
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D4C4B0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridPlaceholderEmoji: {
        fontSize: 24,
    },
    gridTitle: {
        padding: 6,
        fontSize: 11,
        fontWeight: '600',
        color: Colors.cardBg,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: Colors.cardBg,
        marginHorizontal: 35,
        marginVertical: 16,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.textDark,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
