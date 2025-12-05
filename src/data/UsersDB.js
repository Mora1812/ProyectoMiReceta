// src/data/UsersDB.js
// Base de datos de usuarios en memoria

// Este será nuestro "diccionario" de usuarios en memoria
// clave: correo, valor: objeto con nombre, correo y password
const users = {};

/**
 * Guarda un usuario nuevo.
 * Si el correo ya existe, devuelve false.
 */
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
 * Devuelve:
 *  1- { ok: true, user } si está bien
 *  2- { ok: false, reason: 'not_found' } si no existe
 *  3 - { ok: false, reason: 'wrong_password' } si la contraseña no coincide
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

/**
 * Obtener un usuario por correo
 */
export function getUserByEmail(correo) {
    return users[correo] || null;
}