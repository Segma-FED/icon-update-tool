const fs = require('fs-extra');
const path = require('path');
const config = require('./config');
const log = require('./log');

async function clean() {
    log.info('[clean] start');
    await fs.remove(path.resolve(config.dir));
    log.success('[clean] end');
}

module.exports = clean;
