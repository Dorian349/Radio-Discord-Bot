# Radio-Discord-Bot
A simple Discord bot to play any radio URL inside a voice channel.

## Getting Started

Follow the Prerequisites & Installation section.

## Preview

* Commands<br />
![Commands](https://media.discordapp.net/attachments/1060944605488611410/1118455885732270150/Capture_decran_du_2023-06-14_10-24-05.png)

* Voice Channel<br />
![Voice Channel](https://media.discordapp.net/attachments/1060944605488611410/1118455886243971113/Capture_decran_du_2023-06-14_10-24-11.png)

### Prerequisites

* A NodeJS running environment (Version >= 16.9 to support discord.js v14).
* A discord bot with all intents enabled and invited with the application.commands parameter (for slash command usage).

### Installation

* Clone the repository and edit the config.json file.
* Install all the required npm packages using `npm i`.
* Then run the index.js file using `node index.js`.

## Usage

```
$ Once your bot has started, view all commands with `/help`. You can play the radio using `/play`.
```

## Additional Documentation and Acknowledgments

* Default config.json file.
<details>
  <summary>Preview</summary>

  ```
  {
    "settings": {
      "token": "Discord Bot Token",
      "radio-url": "Radio URL"
    },
    "commands": {
      "command-help": {
        "name": "help",
        "description": "Show the list of commands."
      },
      "command-play": {
        "name": "play",
        "description": "Join the voice channel and play the radio with the bot."
      },
      "command-stop": {
        "name": "stop",
        "description": "Stop the radio inside the voice channel."
      },
      "command-pause": {
        "name": "pause",
        "description": "Pause the radio inside the voice channel."
      },
      "command-resume": {
        "name": "resume",
        "description": "Resume the radio inside the voice channel."
      },
      "command-volume": {
        "name": "volume",
        "description": "Edit the volume of the radio.",
        "option": {
          "volume-percent": "percentage",
          "volume-percent-description": "Select the volume percentage of the radio."
        }
      }
    },
    "messages": {
      "must-be-inside-channel": "You must be inside a voice channel to use this command.",
      "not-in-channel": "You aren't inside a voice channel.",
      "radio-started": "The radio player has started.",
      "radio-stopped": "The radio player has stopped.",
      "radio-paused": "The radio is now on pause.",
      "radio-resumed": "The radio is now playing again.",
      "radio-volume": "The volume is now $percent$%"
    }
  }
  ```

</details>

If you find any issue, make sure to create a pull request or release an issue!
