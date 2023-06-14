const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-volume"].name)
        .setDescription(config.commands["command-volume"].description)
        .addIntegerOption(option =>
            option.setName(config.commands["command-volume"].option["volume-percent"])
                .setDescription(config.commands["command-volume"].option["volume-percent-description"])
                .setMinValue(1)
                .setMaxValue(200)
                .setRequired(true)
        )
        .setDMPermission(false),
    async execute(interaction, client) {

        let percent = interaction.options.getInteger(client.config.commands["command-volume"].option["volume-percent"]);

        client.resource.get(interaction.guild.id).volume.setVolume(percent / 100.0);
        interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["radio-volume"].replace("$percent$", percent)) ], ephemeral: true })

    }
};