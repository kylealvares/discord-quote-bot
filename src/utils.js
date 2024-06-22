/**
 * Takes a response from the zenquotes api and formats it
 * @param {object} res 
 * @returns formatted quote
 */
export const formatQuote = (res) => {
  if (!res || !res.data || !res.data[0]) {
    throw new Error('❌ Invalid response format');
  }
  
  const text = `"${res.data[0].q}"`;
  const author = `~ ${res.data[0].a}`;
  return `**${text}**\n*${author}*`;
};