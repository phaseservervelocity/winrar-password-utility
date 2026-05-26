const { crackPassword } = require('./cracker');
const { parseArgs } = require('./cli');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file || !args.method) {
    console.error('Usage: node src/index.js --file <archive.rar> --method <brute|dictionary> [--dict <wordlist.txt>]');
    process.exit(1);
  }

  try {
    const password = await crackPassword(args);
    if (password) {
      console.log(`Password found: ${password}`);
    } else {
      console.log('Password not found.');
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();