const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const Discord = require('discord.js');
const { Client, Collection, Intents, GatewayIntentBits, ActivityType, Routes, REST, SlashCommandBuilder, EmbedBuilder, ApplicationCommandOptionType } = Discord;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates
    ],
});

client.player = new Map();
client.resource = new Map();

client.config = config;

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.buildEmbed = function buildEmbed(description){
    return new EmbedBuilder().setDescription(description).setColor("Aqua");
}

client.login(client.config.settings.token);