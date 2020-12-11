# @segma/icon-update-tool

## 简介

semga-ui 更新图标的自动化工具。

## 仓库地址

```
https://github.com/Segma-FED/icon-update-tool
```

## 快速开始

### 使用条件

本工具作为开发依赖集成于 segma-ui 库中，自身暴露 `segma-icon-update` 命令来执行更新图标的全自动化流程。
使用时请将本地 segma-ui 仓库更新到最新状态，并要求本地拥有 git 和 node 环境。

### 配置文件

工具会尝试获取当前工作路径下的`icon-update.json`作为本地配置文件，并与默认配置合并，配置文件格式如下：

```json
// 默认配置信息
{
    // 下载图标的请求信息
    "request": {
        "url": "",
        "params": null
    },
    // 存放下载的图标文件的目录（一般不用修改）
    "dir": "./temp",
    // 图标文件名称（一般不用修改）
    "fileName": "icon.zip",
    // segma-ui仓库信息（一般不用修改）
    "repository": {
        "name": "@segma/segma-ui",
        "branch": "dev",
        "dir": "./src/assets/css/segma_icon_font",
        "commitMessage": "feat(icon): update icon"
    },
    // segma-ui的打包命令（一般不用修改）
    "build": "lib",
    // segma-ui的打包物的目录（一般不用修改）
    "buildDir": "./lib",
    // 需要发布的npm源（一般不用修改）
    "npm": "http://npm.segma.tech/",
    // 同 npm publish 的 --dry-run 参数
    "dry": false
}
```

### 如何获取请求信息

-   登录 iconfont 网站并进入 segma-icon 项目
    ![](https://satious.oss-accelerate.aliyuncs.com/img/20201210165606.png)
-   打开网页的控制台（F12）并切换到 Network 标签页
    ![](https://satious.oss-accelerate.aliyuncs.com/img/20201210165811.png)
-   点击下载至本地按钮
    ![](https://satious.oss-accelerate.aliyuncs.com/img/20201210165902.png)
-   在 Network 标签页中寻找以 download.zip 开头的请求
    ![](https://satious.oss-accelerate.aliyuncs.com/img/20201210170034.png)
-   右键该请求按下图复制请求信息（Copy -> Copy as Node.js fetch）
    ![](https://satious.oss-accelerate.aliyuncs.com/img/20201210170200.png)
-   得到类似下面的代码

```javascript
fetch('https://www.iconfont.cn/api/project/download.zip?xxxxx=xxx', {
    headers: { ... },
    referrer: 'xxx',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors'
});
```

-   fetch 函数的第一个参数为`url`， 第二个参数为`params`
