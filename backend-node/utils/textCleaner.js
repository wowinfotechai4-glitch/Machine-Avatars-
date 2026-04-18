module.exports = function cleanText(text) {
  return text
    .toLowerCase()                       // lowercase
    .replace(/[^a-z0-9\s]/g, " ")        // remove symbols/emojis
    .replace(/\s+/g, " ")                // remove extra spaces
    .trim();
};