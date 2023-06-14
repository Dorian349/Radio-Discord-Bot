const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-pause"].name)
        .setDescription(config.commands["command-pause"].description)
        .setDMPermission(false),
    async execute(interaction, client) {

        client.player.get(interaction.guild.id).pause();
        interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["radio-paused"]) ], ephemeral: true })

    }
};