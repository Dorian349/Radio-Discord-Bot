const { REST, Routes, ActivityType } = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const path = require('path');
const icy = require('icy');

const commands = [];
const commandsPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.settings.token);

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Discord Radio bot has started with ${client.users.cache.size} users, in ${client.channels.cache.size} channels.`);
        getICY(client, config.settings["radio-url"]);

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

            console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
}

function getICY(client, url) {
    const icyReader = icy.get(url, function (i) {
        i.on('metadata', function (metadata) {
            let icyData = icy.parse(metadata);
            if (icyData.StreamTitle) changeActivity(client, icyData.StreamTitle);
        });
        i.resume();
    });
}

function changeActivity(client, message) {
    client.user.setPresence({
        activities: [{ name: message, type: ActivityType.Listening }]
    });
	    }
