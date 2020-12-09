const fetch = require('node-fetch').default;
const fs = require('fs-extra');
const path = require('path');
const log = require('./log');

const { url, params, dir, fileName } = require('./config.json');

async function download() {
    try {
        await init();
        let result = await fetch(url, params);
        const stream = fs.createWriteStream(path.resolve(dir, fileName));
        result.body.pipe(stream);
        console.log(result);
    } catch (error) {
        log.error(error);
    }
}

async function init() {
    log.info('init workplace');
    const place = path.resolve(dir);
    await fs.remove(place);
    await fs.ensureDir(place);
    log.success(`${place} created`);
}

module.exports = download;
