const path = require('path')

module.exports = {
    // webpack 配置
    webpack: {
      // 配置别名
      alias: {
        // 约定：使用 @ 表示 ”当前根目录+src“ 所在路径
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
  