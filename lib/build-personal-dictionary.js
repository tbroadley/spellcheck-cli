const fs = require('fs-extra');
const concat = require('lodash/concat');
const path = require('path');

async function readPersonalDictionary(filePath) {
  if (path.extname(filePath).toLowerCase() === '.js') {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(path.join(process.cwd(), filePath)).map((entry) => {
      if (entry instanceof RegExp) {
        return entry;
      }
      return new RegExp(`^${entry}$`);
    });
  }

  const fileContents = await fs.readFile(filePath);
  return fileContents
    .toString()
    .trim()
    .split('\n')
    .map(entry => new RegExp(`^${entry}$`));
}

exports.buildPersonalDictionary = async (dictionaryPaths) => {
  if (dictionaryPaths.length > 0) {
    const personalDictionaries = await Promise.all(dictionaryPaths.map(readPersonalDictionary));
    return concat(...personalDictionaries);
  }
  return '';
};