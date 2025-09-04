import { Client, GatewayIntentBits, InteractionType } from 'discord.js';
import { config } from './config.js';
import { createPokedexCommand, handlePokedexCommand } from './commands/showPokemon.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', async () => {
  console.log(`Connecté en tant que ${client.user.tag} `);

  try {
    await client.application.commands.create(createPokedexCommand());
    console.log('Commande /pokedex 🟢');
  } catch (error) {
    console.error('Erreur lors de l’enregistrement de la commande :', error);
  }
});
