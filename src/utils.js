/**
 * Takes a response from the zenquotes api and formats it
 * @param {string} res 
 * @returns formatted quote
 */
export const formatQuote = (res) => {
    const text = `"${res.data[0].q}"`;
    const author = `~ ${res.data[0].a}`;
    return `**${text}**\n*${author}*`;
  };
  