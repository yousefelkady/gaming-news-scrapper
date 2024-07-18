function findSourceWebsite(inputString) {
  const startIndex = inputString.indexOf(".");
  if (startIndex === -1) {
    // Start character not found
    return null;
  }

  const endIndex = inputString.indexOf(".", startIndex + 1);
  if (endIndex === -1) {
    // End character not found
    return null;
  }

  return inputString.substring(startIndex + 1, endIndex);
}

module.exports = findSourceWebsite;
