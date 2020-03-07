/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql:{
        // 单数据库信息配置
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'blog',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    },
    security : {
      csrf : {
        enable: false,// 自定义请求头
      }
    }
};

 
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573888919592_1884';

  // add your middleware config here
  config.middleware = [];


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  
  return {
    ...config,
    ...userConfig,
    middleware: [
      'publicProxy'
    ],
    static:{
      prefix: '/public/', 
      dir: path.join(appInfo.baseDir, '/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    }
  };
};
