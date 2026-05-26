const { createExtractorFromFile } = require('node-unrar-js');

async function tryPassword(archivePath, password) {
  try {
    const extractor = await createExtractorFromFile({ filepath: archivePath, password });
    const list = extractor.getFileList();
    if (list.fileHeaders.length > 0) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function bruteForceCrack(archivePath, maxLength = 4) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const totalChars = chars.length;

  function* generatePasswords(length) {
    const indices = new Array(length).fill(0);
    while (true) {
      let password = indices.map(i => chars[i]).join('');
      yield password;
      let i = length - 1;
      while (i >= 0 && ++indices[i] === totalChars) {
        indices[i] = 0;
        i--;
      }
      if (i < 0) break;
    }
  }

  for (let len = 1; len <= maxLength; len++) {
    for (const password of generatePasswords(len)) {
      if (await tryPassword(archivePath, password)) {
        return password;
      }
    }
  }
  return null;
}

async function dictionaryCrack(archivePath, wordlistPath) {
  const fs = require('fs');
  const readline = require('readline');

  const fileStream = fs.createReadStream(wordlistPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    const password = line.trim();
    if (password && await tryPassword(archivePath, password)) {
      return password;
    }
  }
  return null;
}

async function crackPassword(args) {
  if (args.method === 'brute') {
    return await bruteForceCrack(args.file, args.maxLength || 4);
  } else if (args.method === 'dictionary') {
    if (!args.dict) {
      throw new Error('Dictionary file required for dictionary method.');
    }
    return await dictionaryCrack(args.file, args.dict);
  } else {
    throw new Error('Invalid method. Use "brute" or "dictionary".');
  }
}

module.exports = { crackPassword };