const fetch = require('node-fetch').default;
const fs = require('fs-extra');
const path = require('path');
const log = require('./log');
const { sleep } = require('./common');

const { url, params, dir, fileName } = require('./config.json');

async function download() {
    try {
        await init();
        log.info('[download icon] start');
        let result = await fetch(url, params);
        const stream = fs.createWriteStream(path.resolve(dir, fileName));
        result.body.pipe(stream);
        await new Promise((resolve, reject) => {
            stream.on('error', error => {
                reject(error);
            });
            stream.on('close', () => {
                resolve();
            });
        });
        log.success('[download icon] end');
    } catch (error) {
        log.error(error);
    }
}

async function init() {
    log.info('[init workplace] start');
    const place = path.resolve(dir);
    await fs.remove(place);
    // 避免前后2次文件操作过快导致报错
    await sleep(100);
    await fs.ensureDir(place);
    log.success('[init workplace] end');
}

module.exports = download;
