const path = require('path');
const fs = require('fs-extra');
const log = require('./log');
const git = require('./git');
const { ERRORS } = require('./constants');
const { repository, dir } = require('./config.json');
const pkg = require(path.resolve('package.json'));

async function commit(entry) {
    log.info('[commit] start');
    const pathFrom = path.resolve(dir, entry);
    const pathTo = path.resolve(repository.dir);
    let files = await fs.readdir(pathFrom);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await fs.move(path.join(pathFrom, file), path.join(pathTo, file), {
            overwrite: true
        });
        log.info(`changing ${file}`);
    }
    await git.commit(
        repository.commitMessage,
        files.map(d => path.join(pathTo, d))
    );
    log.success('[commit] success');
}

async function init() {
    log.info('[init repository] start');
    if (pkg.name !== repository.name) {
        throw new Error(ERRORS.INVALID_USE);
    }
    const result = await git.status();
    if (!result.isClean()) {
        throw new Error(ERRORS.GIT_IS_CHANGED);
    }
    await git.checkout(repository.branch);
    await git.pull();

    if (!(await fs.pathExists(path.resolve(repository.dir)))) {
        throw new Error(ERRORS.WRONG_ICON_PATH);
    }
    log.success('[init repository] end');
}

module.exports = {
    commit,
    init
};
