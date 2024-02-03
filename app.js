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

app.get("/quote-of-the-day", async (_, res) => {
    const quotesChannel = client.channels.cache.get(process.env.QUOTES_CHANNEL_ID);
    let quote = null;

    // Fetch quote from zenquotes
    try {
        quote = await axios.get("https://zenquotes.io/api/today");
    } catch (err) {
        console.error('\n❌ - Error! Failed to fetch the quote of the day.\n');
        console.error(err);
        res.status(500).send('❌ - Error! Failed to fetch the quote of the day.\n' + err);
    }

    // Send formatted quote in quotes channel
    try {
        quotesChannel.send(formatQuote(quote));
        console.log('✅ - Success! Message sent to quotes channel!');
        res.status(200).send('✅ - Success! Message sent to quotes channel!');
    } catch(err) {
        console.error('\n❌ - Error! Failed to send message in quotes channel.\n');
        console.error(err);
        res.status(500).send('❌ - Error! Failed to send message in quotes channel.\n' + err);
    }
});

app.listen(port, () => {
    console.log('🤖 Discord Quotes Bot is running on port', port, '.');
});