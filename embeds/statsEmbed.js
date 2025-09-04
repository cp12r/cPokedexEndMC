import { EmbedBuilder } from 'discord.js';
import { progressBar } from '../utils/progressBar.js';

/**
 * Crée un embed avec les statistiques du Pokémon
 * @param {Object} data Données du Pokémon
 * @returns {EmbedBuilder}
 */
export function createStatsEmbed(data) {
  const maxStat = 255; // Valeur max pour la barre
  const stats = data.stats ?? [];

  const fields = stats.length > 0
    ? stats.map(stat => ({
        name: stat.stat?.name?.toUpperCase() || 'STAT',
        value: `${stat.base_stat ?? 0} ${progressBar(stat.base_stat ?? 0, maxStat)}`,
        inline: false
      }))
    : [{ name: 'Statistiques', value: 'Aucune statistique disponible', inline: false }];

  return new EmbedBuilder()
    .setTitle(`Statistiques de ${data.name?.toUpperCase() || 'INCONNU'}`)
    .addFields(fields)
    .setColor('#00AAFF');
}