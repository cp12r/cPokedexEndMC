/**
 * Génère une barre de progression sous forme "d'icones"
 * @param {number} value Valeur actuelle
 * @param {number} max Valeur maximale
 * @param {number} length Longueur de la barre (en cara)
 * @returns {string} Barre de progression (ex: █████░░░░░)
 */

export function progressBar(value, max, length = 20) {
    const fullyLength = Math.round((value / max) * length);
    return '█'.repeat(fullyLength) + '░'.repeat(length - fullyLength);
};