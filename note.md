### 修改webpack等配置
1. 运行 npm run eject 暴露配置文件
2. 配置postcss
* 安装postcss-load-config
* 删除 "./config/webpack.config.dev.js" 和 "./config/webpack.config.prod.js" 中 postcss-loader 的 option 选项
* 根目录新建.postcssrc.js文件，配置postcss
* 安装precss(基本可以使用sass,less的主要功能。注释：本来是有打算用sass，但是webpack配置里面用的是webpackServer，导致sass在开发环境中生成对应的css文件，而且precss能完成sass大多数功能，用precss的缺点是css不能复用，即不能当普通的css使用，脱离了precss会产生错误)
3. 开启css Modules 在css-loader的option中设置 "modules:  true "，同上两个webpack文件都要设置
4. 安装react-css-modules, 对类名进行赋值的时候只用一个类名，复用css使用继承

