### 修改webpack等配置
1. 运行 npm run eject 暴露配置文件
2. 配置postcss
* 安装postcss-load-config
* 删除 "./config/webpack.config.dev.js" 和 "./config/webpack.config.prod.js" 中 postcss-loader 的 option 选项
* 根目录新建.postcssrc.js文件，配置postcss
* 安装precss(基本可以使用sass,less的主要功能。注释：本来是有打算用sass，但是webpack配置里面用的是webpackServer，导致sass在开发环境中生成对应的css文件，而且precss能完成sass大多数功能，用precss的缺点是css不能复用，即不能当普通的css使用，脱离了precss会产生错误)
3. 开启css Modules 在css-loader的option中设置 "modules:  true "，同上两个webpack文件都要设置
4. 安装react-css-modules, 对类名进行赋值的时候只用一个类名，复用css使用继承
5. 添加路径简称src

### 学习
1. react-router，redux 学习
2. 使用react-router
3. 尝试redux中
4. react中事件方法传递参数
```html
<button onClick={this.handleClick.bind(this, props0, props1, ...}></button>

handleClick(porps0, props1, ..., event) {
    // your code here
}
```

### 组件完成
1. header (基本完成)
2. todolist (美化)

### 规范

一个todo对象
```json
{
    text: '标题',
    describe: '具体的描述' || null,
    createDate: '创建时间', // timestamp
    startDate: '开始时间' || null, // 什么时候开始任务，什么时候结束任务
    endDate: '结束时间' || null,
    completed: Boolean, // 任务是否完成
}
```
