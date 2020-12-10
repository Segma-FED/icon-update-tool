const path = require('path');
const zip = require('extract-zip');
const log = require('./log');
const fs = require('fs-extra');

const { dir, fileName } = require('./config.json');

async function extract() {
    log.info('[extract] start');
    await zip(path.resolve(dir, fileName), {
        dir: path.resolve(dir)
    });
    const list = await fs.readdir(path.resolve(dir));
    const entry = list.find(d => d !== fileName);

    const stat = await fs.stat(path.resolve(dir, entry));
    if (!stat.isDirectory()) {
        throw new Error('invalid icon file');
    }
    log.success('[extract] end');
    return entry;
}

module.exports = extract;
