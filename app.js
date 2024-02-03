import axios from "axios";
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { formatQuote } from "./src/utils.js";
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.once(Events.ClientReady, (c) => {
    console.log('🤖 Discord Quotes Bot is running...');

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