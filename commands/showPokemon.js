import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { fetchPokemonData } from '../services/pokeAPI.js';
import { createInfoEmbed } from '../embeds/infoPokeEmbed.js';
import { createStatsEmbed } from '../embeds/statsEmbed.js';
import { createTalentsEmbed } from '../embeds/talentsEmbed.js';

// Constantes pour les IDs des boutons
const BUTTON_IDS = {
  BASIC: 'view_basic',
  STATS: 'view_stats',
  ABILITIES: 'view_talents'
};

/**
 * Crée la définition de la commande slash /pokedex
 * @returns {SlashCommandBuilder}
 */
export function createPokedexCommand() {
  return new SlashCommandBuilder()
    .setName('pokedex')
    .setDescription('Obtenir des informations sur un Pokémon par nom ou ID')
    .addStringOption(option =>
      option.setName('pokemon')
        .setDescription('Nom ou ID du Pokémon (exemple : pikachu ou 25)')
        .setRequired(true));
}

/**
 * Crée la rangée de boutons pour la navigation entre les vues
 * @returns {ActionRowBuilder}
 */
function createNavigationButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(BUTTON_IDS.BASIC)
      .setLabel('Infos de base')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(BUTTON_IDS.STATS)
      .setLabel('Statistiques')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(BUTTON_IDS.ABILITIES)
      .setLabel('Capacités')
      .setStyle(ButtonStyle.Success)
  );
}

/**
 * Gère l'interaction de la commande /pokedex
 * @param {CommandInteraction} interaction
 */
export async function handlePokedexCommand(interaction) {
  const pokemonInput = interaction.options.getString('pokemon');

  await interaction.deferReply();

  try {
    const pokemonData = await fetchPokemonData(pokemonInput);

    const embeds = {
      [BUTTON_IDS.BASIC]: createInfoEmbed(pokemonData),
      [BUTTON_IDS.STATS]: createStatsEmbed(pokemonData),
      [BUTTON_IDS.ABILITIES]: createTalentsEmbed(pokemonData)
    };

    const buttons = createNavigationButtons();

    const message = await interaction.editReply({
      embeds: [embeds[BUTTON_IDS.BASIC]],
      components: [buttons]
    });

    const filter = i => i.user.id === interaction.user.id;

    const collector = message.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async buttonInteraction => {
      await buttonInteraction.deferUpdate();

      const selectedView = buttonInteraction.customId;

      if (embeds[selectedView]) {
        await buttonInteraction.editReply({
          embeds: [embeds[selectedView]],
          components: [buttons]
        });
      }
    });

    collector.on('end', async () => {
      const disabledButtons = new ActionRowBuilder().addComponents(
        buttons.components.map(button => button.setDisabled(true))
      );
      await message.edit({ components: [disabledButtons] });
    });

  } catch (error) {
    await interaction.editReply({
      content: `❌ Erreur : ${error.message}`,
      ephemeral: true
    });
  }
}