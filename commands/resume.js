const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-resume"].name)
        .setDescription(config.commands["command-resume"].description)
        .setDMPermission(false),
    async execute(interaction, client) {
        
        client.player.get(interaction.guild.id).unpause();
        interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["radio-resumed"]) ], ephemeral: true })

    }
};