#!/usr/bin/env node

const download = require('./download');
const extract = require('./extract');
const repo = require('./repo');
const clean = require('./clean');
const publish = require('./publish');

async function update() {
    try {
        await download();
        const entry = await extract();
        await repo.init();
        await repo.commit(entry);
        await publish();
    } catch (error) {
        // todo
    } finally {
        await clean();
    }
}

update();
