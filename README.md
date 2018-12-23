# 项目基础架构

基于 `react + antd`

## 初始化
```js
/*
 * 运行npm run web 必须dev-server.ignore.js文件
 * 示例
 */
const testEnv = 'front.terminus.io';
const stagingEnv = 'staging.terminus.io';
const devBranchEnv = 'dev.terminus.io';
const prodEnv = 'prod.terminus.io';

const backendUrl = testEnv;
const frontUrl = 'local.terminus.io'; // local与对应环境根域名一致
const port = 8080;

module.exports = {
  backendUrl,
  frontUrl,
  port,
};
```

## Run

- `npm i`
- `npm run dll && npm run web` // 初次启动
- `npm run web ` 再次启动 (起devServer, 有热加载，实时刷新)

## VSCode配置说明
* 必须安装eslint、tslint、stylelint、prettier、scss-lint
* 推荐安装 CSS Modules、colorize、scss intelliSense
* 请使用VScode->Preferences->setting，设置

```shell
"eslint.autoFixOnSave": true,
"tslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "vue-html",
      "autoFix": true
    },
    "html",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
"prettier.stylelintIntegration": true,
"[css]": {
    "editor.formatOnSave": true
  },
"[scss]": {
    "editor.formatOnSave": true
  },
```

## interface 和 services 的更新

1、 全局安装Jarvis

```shell
npm i -g @terminus/jarvis
```

2、 进入指定工程下，使用 jarvis init

   > 将会生成一份 .jarvis.yml配置文件

3、 启用监听， 使用 jarvis

   > 如果工程下有.jarvis.yml 配置文件则只监听工程的swagger.json的改动
   >
   > 如果没有则监听全局。
   
## 注意事项
1、lodash

  因为 lodash 用模块的方式不能用chain，所以我们统一用 flow 代替。

  chain 是这么写的：
  `chain(historyObj.users).map(user => user.name).join(', ').value()`

  可以改写成

  `flow([(value) => map(value, user => user.name), (value) => join(value, '，')])`

  value 是上一个方法返回的值


