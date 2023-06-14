module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;
  
        //Check if the user is inside the channel.
        if(interaction.commandName !== client.config.commands["command-help"].name && interaction.member.voice.channel === null){
            interaction.reply({ embeds: [ client.buildEmbed(client.config.messages["must-be-inside-channel"]) ], ephemeral: true });
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};