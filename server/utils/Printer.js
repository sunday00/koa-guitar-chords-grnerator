class Printer {
  static info(msg) {
    process.stdout.write(`\x1b[36m${msg}\x1b[0m`);
  }

  static success(msg) {
    process.stdout.write(`\x1b[32m${msg}\x1b[0m`);
  }

  static light(msg) {
    process.stdout.write(`\x1b[1m${msg}\x1b[0m`);
  }
}

module.exports = Printer;
