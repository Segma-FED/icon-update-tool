const download = require('./download');
const extract = require('./extract');

async function update() {
    await download();
    await extract();
}

update();
