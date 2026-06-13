const fs = require('fs/promises');

async function readJson(filePath, defaultValue = []) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    if (!raw.trim()) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultValue;
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  const serialized = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, `${serialized}\n`, 'utf8');
}

function nextId(collection) {
  const maxId = collection.reduce((max, item) => {
    if (typeof item.id === 'number' && item.id > max) {
      return item.id;
    }
    return max;
  }, 0);
  return maxId + 1;
}

module.exports = {
  readJson,
  writeJson,
  nextId,
};
