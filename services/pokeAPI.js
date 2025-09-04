import fetch from 'node-fetch';
/**
 * Récupère les données d'un Poké depuis l'API PokéAPI.
 * Le paramètre peut être un nom (string) ou un ID (nombre).
 *
 * Exemples d'utilisation :
 * - fetchPokemonData('pikachu')  // par nom
 * - fetchPokemonData('25')       // par ID sous forme de chaîne
 * - fetchPokemonData(25)         // par ID sous forme de nombre
 *
 * @param {string|number} identifier Nom ou ID du Pokémon
 * @returns {Promise<Object>} Données JSON du Pokémon
 * @throws {Error} Si le Pokémon n'est pas trouvé ou en cas d'erreur réseau
 */
export async function fetchPokemonData(identifier) {
  const idOrName = encodeURIComponent(String(identifier).toLowerCase());
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pokémon "${identifier}" non trouvé.`);
  }
  return response.json();
}