# 🤖 Discord Quote Bot

## Description 
This Discord bot allows users to retrieve quotes within a Discord server. 

## Features
- **Quote of the Day**: A quote of the day is sent to the `#💬-quotes` channel in a discord server everyday at **9:30 A.M. EST**.
- **Random Quote**: The bot can retrieve a random quote from the database.

## Usage
1. [Invite the bot to your Discord server](https://discord.com/api/oauth2/authorize?client_id=1203143696590307428&permissions=2147485696&scope=bot).

## Installation
To host your own instance of the bot, follow these steps:
```bash
$ git clone https://github.com/kylealvares/discord-quote-bot.git
$ cd discord-quote-bot
$ npm install
$ # Add your bot token to the .env file
$ node app.js
```

## Deployment

Currently the app is deployed on <https://www.cyclic.sh/>.

- **Deployment URL**: <https://bewildered-ray-hem.cyclic.app>
- **Quote of the Day Route**: <https://bewildered-ray-hem.cyclic.app/quote-of-the-day>