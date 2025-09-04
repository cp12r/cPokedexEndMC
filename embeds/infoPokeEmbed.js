import { EmbedBuilder } from 'discord.js';
/**
 * Crée un embed avec les infos basiques du Pokémon
 * @param {Object} data Données du Pokémon
 * @returns {EmbedBuilder}
 */
export function createInfoEmbed(data) {
  const types = data.types?.map(t => t.type.name).join(', ') || 'Aucun type';
  return new EmbedBuilder()
    .setTitle(`${data.name.toUpperCase()} (#${data.id})`)
    .setThumbnail(data.sprites?.front_default || null)
    .addFields(
      { name: 'Types', value: types, inline: true },
      { name: 'Taille', value: data.height ? `${data.height / 10} m` : 'Inconnu', inline: true },
      { name: 'Poids', value: data.weight ? `${data.weight / 10} kg` : 'Inconnu', inline: true },
      { name: 'Expérience de base', value: data.base_experience?.toString() || 'Inconnue', inline: true }
    )
    .setColor('#FF0000');
}