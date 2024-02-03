import axios from "axios";
import dotenv from 'dotenv';
import express from 'express';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { formatQuote } from "./src/utils.js";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (_, res) => {
    res.send('🤖 Discord Quotes Bot is running...');
});

app.get("/quote-of-the-day", (_, res) => {

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
        ],
    });

    client.login(process.env.DISCORD_TOKEN);

    client.once(Events.ClientReady, async (c) => {

        // Cache quotes channel
        const quotesChannel = client.channels.cache.get(process.env.QUOTES_CHANNEL_ID);
        if (!quotesChannel) {
            console.error('\n❌ - Error! Failed to find quotes channel.');
            return res.status(500).send('❌ - Error! Failed to find quotes channel.');
        }

        let quote = null;

        // Fetch quote from zenquotes
        try {
            quote = await axios.get("https://zenquotes.io/api/today");
        } catch (err) {
            console.error('\n❌ - Error! Failed to fetch the quote of the day.\n');
            console.error(err);
            return res.status(500).send('❌ - Error! Failed to fetch the quote of the day.\n' + err);
        }

        // Send formatted quote in quotes channel
        try {
            quotesChannel.send(formatQuote(quote));
            console.log('✅ - Success! Message sent to quotes channel!');
            return res.status(200).send('✅ - Success! Message sent to quotes channel!');
        } catch (err) {
            console.error('\n❌ - Error! Failed to send message in quotes channel.\n');
            console.error(err);
            return res.status(500).send('❌ - Error! Failed to send message in quotes channel.\n' + err);
        }
    });

});

app.listen(port, () => {
    console.log('🤖 Discord Quotes Bot is running on port', port, '.');
});