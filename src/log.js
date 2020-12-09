const chalk = require('chalk');
const log = console.log;
function info(...text) {
    log(chalk.gray(...text));
}

function success(...text) {
    log(chalk.green(...text));
}

function warn(...text) {
    log(chalk.yellow(...text));
}

function error(...text) {
    log(chalk.red(...text));
}

module.exports = {
    info,
    success,
    warn,
    error
};
