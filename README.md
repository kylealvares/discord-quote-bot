# 🤖 Discord Quote Bot

## Description 
This Discord bot allows users to retrieve quotes within a Discord server. 

## Features
- **Quote of the Day**: A quote of the day is sent to the `#💬-quotes` channel in a discord server everyday at **10:00 A.M. EST**.
- **Random Quote**: The bot can retrieve a random quote from the database.

## Usage
1. [Invite the bot to your Discord server](https://discord.com/api/oauth2/authorize?client_id=1203143696590307428&permissions=2147485696&scope=bot).

## Installation
To host your own instance of the bot, follow these steps:
```bash
$ git clone https://github.com/kylealvares/discord-quote-bot.git
$ cd discord-quote-bot
$ npm install
$ # Create the .env file
$ # Add DISCORD_TOKEN to the .env file
$ # Add QUOTES_CHANNEL_ID to the .env file
$ node app.js
```

## Deployment

The app is currently deployed on [cyclic.sh](https://www.cyclic.sh/), with the following details:

- **Deployment URL**: [bewildered-ray-hem.cyclic.app](https://bewildered-ray-hem.cyclic.app)
- **Quote of the Day Route**: [bewildered-ray-hem.cyclic.app/quote-of-the-day](https://bewildered-ray-hem.cyclic.app/quote-of-the-day)

### Cron Jobs

The app has the following cron jobs set up:
| Task              | Schedule   | Route               |
| ----------------- | ---------- | ------------------- |
| Spin up the app   | `58 9 * * *`| `/`                |
| Send a quote      | `0 10 * * *`| `/quote-of-the-day`|