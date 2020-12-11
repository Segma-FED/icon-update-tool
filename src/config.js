const fs = require('fs-extra');
const path = require('path');
const { CONFIG_NAME, ERRORS } = require('./constants');

const defaultConfig = {
    // 下载图标的请求信息
    request: {
        url: '',
        params: null
    },
    // 存放下载的图标文件的目录（一般不用修改）
    dir: './temp',
    // 图标文件名称（一般不用修改）
    fileName: 'icon.zip',
    // segma-ui仓库信息（一般不用修改）
    repository: {
        name: '@segma/segma-ui',
        branch: 'dev',
        dir: './src/assets/css/segma_icon_font',
        commitMessage: 'feat(icon): update icon'
    },
    // segma-ui的打包命令（一般不用修改）
    build: 'lib',
    // segma-ui的打包物的目录（一般不用修改）
    buildDir: './lib',
    // 需要发布的npm源（一般不用修改）
    npm: 'http://npm.segma.tech/',
    // 同 npm publish 的 --dry-run 参数
    dry: false
};

function initConfig() {
    const configPath = path.resolve(CONFIG_NAME);
    if (!fs.pathExistsSync(configPath)) {
        fs.outputJSONSync(
            configPath,
            {
                request: {
                    url: '',
                    params: null
                }
            },
            {
                spaces: 4
            }
        );
        throw new Error(ERRORS.CONFIG_NOT_EXIST);
    }

    let config = require(configPath);
    config = {
        ...defaultConfig,
        ...config
    };
    if (!config.request) {
        throw new Error(ERRORS.INVALID_CONFIG);
    }
    if (!config.request.url) {
        throw new Error(ERRORS.MISSING_URL);
    }
    if (!config.request.params) {
        throw new Error(ERRORS.MISSING_PARAMS);
    }

    return config;
}

module.exports = initConfig();
