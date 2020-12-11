#!/usr/bin/env node

const download = require('./download');
const extract = require('./extract');
const repo = require('./repo');
const clean = require('./clean');
const publish = require('./publish');
const log = require('./log');
async function update() {
    try {
        await download();
        const entry = await extract();
        await repo.init();
        await repo.commit(entry);
        await publish();
    } catch (error) {
        // todo
        log.error(error);
    } finally {
        await clean();
    }
}

update();
