# 🤖 Discord Quotes Bot

## Description 
This Discord bot allows users to retrieve quotes within a Discord server. 

## Features
- [x] **Quote of the Day**: A quote of the day **job** is sent to the `#💬-quotes` channel in a discord server everyday at **7:51 A.M. EST**.
- [ ] **Random Quote**: The bot can retrieve a random quote from the database.

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

The app is currently deployed using a **[Github Actions Workflow](.github/workflows/quote-of-the-day.yml)**

### Cron Jobs

> **⚠️  Note:** There are other reasons why a schedule might not trigger, **the schedule event can be delayed during periods of high loads of GitHub Actions** workflow runs. 

The app is set to run at 12:51 UTC every day (7:51 AM EST).

```yml
on:
  schedule:
    # Runs at 12:51 UTC every day (7:51 AM EST)
    - cron: "51 12 * * *"
```
