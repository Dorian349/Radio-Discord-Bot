const { SlashCommandBuilder } = require("discord.js");
const config = require('../config.json');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands["command-play"].name)
        .setDescription(config.commands["command-play"].description)
        .setDMPermission(false),
    async execute(interaction, client) {

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });


        client.resource.set(interaction.guild.id, createAudioResource(client.config.settings["radio-url"], {
            inlineVolume: true
        }));

        client.player.set(interaction.guild.id, createAudioPlayer());
        connection.subscribe(client.player.get(interaction.guild.id))
        client.player.get(interaction.guild.id).play(client.resource.get(interaction.guild.id))

        interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["radio-started"]) ], ephemeral: true })

    }
};