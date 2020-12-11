const config = require('./config');
const log = require('./log');
const fs = require('fs-extra');
const path = require('path');
const git = require('./git');
const { run } = require('./common');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

async function init() {
    const dir = path.resolve(config.buildDir);
    await fs.remove(dir);
    await fs.ensureDir(dir);
}

async function updateVersion() {
    log.info('[update version] start');
    await run([npm, 'version', 'patch', '--git-tag-version=false']);

    let { version } = require(path.resolve('package.json'));
    version = version.split('.').map(d => Number(d));
    version[version.length - 1] += 1;
    await git.commit(`feat(version): ${version.join('.')}`, [path.resolve('package.json'), path.resolve('package-lock.json')]);
    log.success('[update version] end');
}

async function publish() {
    log.info('[publish] start');
    await init();

    await run([npm, 'run', config.build]);
    log.success('build completed');

    await updateVersion();

    const { data: oldRegistry } = await run([npm, 'config', 'get', 'registry']);
    await run([npm, 'config', 'set', 'registry', config.npm]);
    try {
        const params = [npm, 'publish'];
        if (config.dry) {
            params.push('--dry-run');
        }
        await run(params);

        if (!config.dry) {
            await git.push();
        }
    } catch (error) {
        // todo
    } finally {
        await run([npm, 'config', 'set', 'registry', oldRegistry]);
    }

    log.success('[publish] end');
}

module.exports = publish;
