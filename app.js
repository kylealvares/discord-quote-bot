import axios from 'axios';
import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { formatQuote } from './src/utils.js';
dotenv.config();

async function invokeQuoteOfTheDay() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ],
  });

  try {
    await client.login(process.env.DISCORD_TOKEN);
    console.log('✅ Bot logged in');
  } catch (err) {
    console.error('\n❌ Error! Failed to login to Discord.\n', err);
    process.exit(1);
  }

  client.once(Events.ClientReady, async () => {
    console.log('✅ Bot is ready');
    const quotesChannel = client.channels.cache.get(process.env.QUOTES_CHANNEL_ID);
    if (!quotesChannel) {
      console.error('\n❌ Error! Failed to find quotes channel.');
      await client.destroy();
      process.exit(1);
    }

    console.log('✅ Quotes channel found');

    let quote = null;

    try {
      const response = await axios.get('https://zenquotes.io/api/today');
      console.log('💬 Quote API response:', response.data); // Log the response to see its structure
      quote = response; // Pass the entire response to formatQuote
      console.log('ℹ️ Formatted quote:', formatQuote(quote)); // Log the formatted quote
    } catch (err) {
      console.error('\n❌ Error! Failed to fetch the quote of the day.\n', err);
      await client.destroy();
      process.exit(1);
    }

    console.log('✅ Quote fetched');

    try {
      await quotesChannel.send(formatQuote(quote));
      console.log('✅ Success! Message sent to quotes channel!');
      await client.destroy();
      process.exit(0);
    } catch (err) {
      console.error('\n❌ Error! Failed to send message in quotes channel.\n', err);
      await client.destroy();
      process.exit(1);
    }
  });
}

invokeQuoteOfTheDay();
