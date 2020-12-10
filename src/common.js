const { spawn } = require('child_process');

async function run(commands) {
    return new Promise((resolve, reject) => {
        const task = spawn(commands[0], commands.slice(1));
        let result = {
            code: 0,
            error: null,
            data: ''
        };
        task.stdout.on('data', data => {
            console.log(String(data));
            result.data += String(data);
        });
        task.on('error', error => {
            result.error = error;
        });
        task.on('close', code => {
            result.code = code;
            code ? reject(result) : resolve(result);
        });
    });
}

async function sleep(time = 500) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

module.exports = {
    run,
    sleep
};
