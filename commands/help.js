const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-help"].name)
        .setDescription(config.commands["command-help"].description)
        .setDMPermission(false),
    async execute(interaction, client) {

        interaction.reply({ embeds: [ client.buildEmbed(Object.keys(config.commands).map(command => "**/" + client.config.commands[command].name + "** - " + client.config.commands[command].description).join("\n")) ], ephemeral: false });

    }
};