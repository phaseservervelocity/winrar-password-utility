function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--file':
        args.file = argv[++i];
        break;
      case '--method':
        args.method = argv[++i];
        break;
      case '--dict':
        args.dict = argv[++i];
        break;
      case '--max-length':
        args.maxLength = parseInt(argv[++i], 10);
        break;
    }
  }
  return args;
}

module.exports = { parseArgs };