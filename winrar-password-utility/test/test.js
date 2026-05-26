const { crackPassword } = require('../src/cracker');
const fs = require('fs');
const path = require('path');

async function testBruteForce() {
  console.log('Testing brute-force with a known password...');
  // This test expects a small RAR file with password 'abc' (not included)
  // For real testing, create a test archive with password 'abc'
  const testArchive = path.join(__dirname, 'test.rar');
  if (!fs.existsSync(testArchive)) {
    console.log('Skipping test: test.rar not found. Create a RAR with password "abc".');
    return;
  }
  const result = await crackPassword({ file: testArchive, method: 'brute', maxLength: 3 });
  if (result === 'abc') {
    console.log('PASS: Brute-force found correct password.');
  } else {
    console.log('FAIL: Brute-force did not find password.');
  }
}

async function testDictionary() {
  console.log('Testing dictionary attack...');
  const testArchive = path.join(__dirname, 'test.rar');
  const wordlist = path.join(__dirname, 'test_words.txt');
  if (!fs.existsSync(testArchive) || !fs.existsSync(wordlist)) {
    console.log('Skipping test: test files missing.');
    return;
  }
  const result = await crackPassword({ file: testArchive, method: 'dictionary', dict: wordlist });
  if (result === 'abc') {
    console.log('PASS: Dictionary attack found correct password.');
  } else {
    console.log('FAIL: Dictionary attack did not find password.');
  }
}

(async () => {
  await testBruteForce();
  await testDictionary();
})();