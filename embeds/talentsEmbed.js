import { EmbedBuilder } from 'discord.js';
/**
 * Crée un embed avec les talents (abilities) du Pokémon
 * @param {Object} data Données du Pokémon
 * @returns {EmbedBuilder}
 */
export function createTalentsEmbed(data) {
  const talents = data.abilities ?? [];
  const talentsList = talents.length > 0
    ? talents.map(talent => {
        const hidden = talent.is_hidden ? '(Cachée)' : '';
        return `- ${talent.ability?.name || 'Inconnu'} ${hidden}`;
      }).join('\n')
    : 'Aucun talent disponible';
  return new EmbedBuilder()
    .setTitle(`Talents de ${data.name?.toUpperCase() || 'INCONNU'}`)
    .setDescription(talentsList)
    .setColor('#00FF00');
}