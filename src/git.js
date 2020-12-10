const { gitP: SimpleGit } = require('simple-git');
const git = SimpleGit({
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6
});

module.exports = git;
