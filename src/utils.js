/**
 * Takes a response from the zenquotes api and formats it
 * @param {object} res 
 * @returns formatted quote
 */
export const formatQuote = (res) => {
  if (!res || !res.data || !res.data[0]) {
    throw new Error('❌ Invalid response format');
  }
  
  const quote = `"${res.data[0].q}"`;
  const author = `~ ${res.data[0].a}`;
  return `**${quote}**\n*${author}*`;
};