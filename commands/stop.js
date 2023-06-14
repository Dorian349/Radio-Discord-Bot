const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-stop"].name)
        .setDescription(config.commands["command-stop"].description)
        .setDMPermission(false),
    async execute(interaction, client) {

        const connection = getVoiceConnection(interaction.guild.id)
        if(!connection) return interaction.reply({ embeds: [ buildEmbed(client.config.messages["not-in-channel"]) ], ephemeral: true })

        connection.destroy()
        client.player.get(interaction.guild.id).stop();

        interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["radio-stopped"]) ], ephemeral: true })
    }
};