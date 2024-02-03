import axios from "axios";
import dotenv from 'dotenv';
import express from 'express';
import { Client,  GatewayIntentBits } from 'discord.js';
import { formatQuote } from "./src/utils.js";
dotenv.config();

const port = process.env.PORT || 3000;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.login(process.env.DISCORD_TOKEN);

const app = express();

app.get("/", (_, res) => {
    res.send('🤖 Discord Quotes Bot is running...');
});

app.get("/quote-of-the-day", (_, res) => {
    const quotesChannel = client.channels.cache.get(process.env.QUOTES_CHANNEL_ID);
    try {
        axios.get("https://zenquotes.io/api/today")
            .then((quote) => {
                quotesChannel.send(formatQuote(quote));
                console.log('✅ - Success! Message sent to quotes channel!');
                res.send('✅ - Success! Message sent to quotes channel!');
            })
            .catch((err) => {
                console.error('\n❌ - Error! Failed to fetch quote of the day (https://zenquotes.io/api/today).\n');
                console.error(err);
                console.error();
                res.status(500).send('❌ - Error! Failed to fetch quote of the day (https://zenquotes.io/api/today).\n', err);
            });
    } catch (err) {
        console.error('\n❌ - Error! Failed to send message to quotes channel.');
        console.error(err);
        res.send('\n❌ - Error! Failed to send message to quotes channel.', err);
    }
});


app.listen(port, () => {
    console.log('🤖 Discord Quotes Bot is running on port', port, '.');
});