import axios from "axios";
import dotenv from 'dotenv';
import express from 'express';
import schedule from 'node-schedule';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { formatQuote } from "./src/utils.js";
dotenv.config();

// Server

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('🤖 Discord Quotes Bot is running on port ', port, '.');
});

app.get("/", (_, res) => {
  res.send('🤖 Discord Quotes Bot is running on port ', port, '.');
});

// Discord Bot

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.once(Events.ClientReady, (c) => {
    console.log('🤖 Discord Quotes Bot is client ready...');

    const quotesChannel = client.channels.cache.get(process.env.QUOTES_CHANNEL_ID);

    // Quote of the Day Job (9:30 AM)
    schedule.scheduleJob('* * * * *', function () {
        try {
            axios.get("https://zenquotes.io/api/today")
                .then((quote) => {
                    quotesChannel.send(formatQuote(quote));
                    console.log('✅ - Success! Message sent to quotes channel!');
                })
                .catch((err) => {
                    console.error('\n❌ - Error! Failed to fetch quote of the day (https://zenquotes.io/api/today).\n');
                    console.error(err);
                    console.error();
                });
        } catch (err) {
            console.error('\n❌ - Error! Failed to send message to quotes channel.');
            console.error(err);
            console.error();
        }
    });

});

client.login(process.env.DISCORD_TOKEN);