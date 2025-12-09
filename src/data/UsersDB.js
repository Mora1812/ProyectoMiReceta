// ==================================================
// src/data/UsersDB.js
// Base de datos de usuarios en memoria
// ==================================================

/**
 * BLOQUE: ALMACÉN DE USUARIOS
 * Diccionario para almacenar usuarios por correo electrónico.
 * Clave: correo, Valor: objeto usuario (nombre, correo, password).
 */
// Este será nuestro "diccionario" de usuarios en memoria
const users = {};

/**
 * BLOQUE: GESTIÓN DE USUARIOS
 * Funciones para registrar y autenticar usuarios.
 */

// Guarda un usuario nuevo
export function saveUser(nombre, correo, password) {
    if (users[correo]) {
        // ya existe un usuario con ese correo
        return false;
    }

    users[correo] = { nombre, correo, password };
    return true;
}

/**
 * Valida un usuario al hacer login.
 * Retorna objeto con estado { ok, reason, user }
 */
export function validateUser(correo, password) {
    const user = users[correo];

    if (!user) {
        return { ok: false, reason: 'not_found' };
    }

    if (user.password !== password) {
        return { ok: false, reason: 'wrong_password' };
    }

    return { ok: true, user };
}

// Obtener un usuario por correo
export function getUserByEmail(correo) {
    return users[correo] || null;
}