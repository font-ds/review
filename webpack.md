# Webpack

官网：[webpack](https://webpack.js.org/configuration/)

## Webpack是什么？

webpack是模块打包工具

可以识别： ES Moudule 模块引入方式    （ import Header from "header.js"     export default Header）

​					CommonJS 模块引入规范		( var Header = require('header.js' )     modules.exports = Header )

​					CMD

​					AMD

## Webpack-cli作用

使我们在命令行窗口中使用webpack命令

## Webpack的配置文件

```js
const path = require('path')
const htmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    },
    module:{
        rules:[
           //配置loader
            {
                test: /\.jpg$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({ template: 'src/index.html' })
    ],
    mode:'production' //mode可以是production(压缩) 或者development(不压缩)
}
```

## Webpack配置元素

### Loader

#### Loader是什么？

loader是打包的方案。

loader的执行顺序：从下到上、从右到左

#### 常用Loader

1. file-loader       打包任何静态资源

   ```js
   {
                   test: /\.jpg$/,
                   use: {
                       loader: 'file-loader',
                       name: '[name]_[hash].[ext]',   //打包静态资源名字和文件后缀不变 且名字后边加hash值
                       outputPath: 'images/',    //将打包后的资源放在images文件夹下
                   }
               }
   ```

2. url-loader       会将文件打包成base64的形式存在js文件中，根据limit判断打包方式

   ```js
   {
                   test: /\.(jpg|png|gif)$/,
                   use: {
                       loader: 'file-loader',
                       options: {
                           // placeholders 占位符
                           name: '[name]_[hash].[ext]',   //打包静态资源名字和文件后缀不变 且名字后边加hash值
                           outputPath: 'images/',    //将打包后的资源放在images文件夹下
                           limit:2048  //当文件小于2kb时，将文件打包成base64于js中；大于2kb时，打包成文件于dist中
                       }
                   }
               }
   ```

3. vue-loader      vue项目中打包vue结尾的文件

4. css-loader       分析css文件之间的关系，打包到一个css中

5. style-loader    将css文件内容打包到head的style中

   ```js
    //打包css文件，注意style-loader和css-loader的顺序
   {
                   test: /\.css$/,
                   use: ['style-loader', 'css-loader']
              }
   ```

   

6. sass-loader （需要和 node-sass 一起使用）     打包sass文件

   ```js
   //打包scss文件，注意三个loader的顺序
   [
                       'style-loader',
                       {
                           loader: 'css-loader',
                           options: {
                               importLoaders: 2,   //在scss中通过import引入的scss文件同样依次从最下边开始
                               modules:true    //开启css的模块化打包
                           }
                       },
                       'sass-loader',
                       'postcss-loader'
                   ]
   ```

7. postcss-loader    打包css文件中有css3新属性时，打包后会加 -webkit-  (ie兼容)前缀

   需要配置 postcss.config.js 文件

   ```js
   module.exports = {
       piugins: [
           require('autoprefixer')  //增加 -webkit- 前缀
       ]
   }
   ```

#### Loader配置

```js
 {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // placeholders 占位符
                        name: '[name]_[hash].[ext]',   //打包静态资源名字和文件后缀不变 且名字后边加hash值
                        outputPath: 'images/',    //将打包后的资源放在images文件夹下
                        limit:2048  //当文件小于2kb时，将文件打包成base64于js中；大于2kb时，打包成文件于dist中
                    }
                }
            }
```

使用loader时可以在options里对loader进行配置

### Plugin

#### Plugin是什么？

Plugin 可以在webpack运行到某一时刻的时候，帮你干某些事情。

类似于react中的生命周期函数的作用

#### 常用的Plugin

1. HtmlWebpackPlugin    会在打包结束后，自动生成一个html文件，并将打包生成的js自动引入到这个html文件中

   ```js
   const HtmlWebpackPlugin = require ('html-webpack-plugin')  //htmlWebpackPlugin 引入
   
   plugins: [
           new HtmlWebpackPlugin({ template: 'src/index.html' })
       	//template 是自己写好的html模板，放在src文件中
       ],
   ```

2. CleanWebpackPlugin    重新打包时会删除之前打包生成的dist文件夹

   ```js
   const { CleanWebpackPlugin } = require('clean-webpack-plugin') 
   
   plugins: [
           new CleanWebpackPlugin()   
       	//最新版本的CleanWebpackPlugin不需要任何参数
       ],
   ```

### Entry和Output的基本配置

```js
//打包成两个文件 main.js 和 sub.js
	//打包多个文件写法

	entry: {
        main:'./src/index.js',
        sub:'./src/index.js',
    },
    output: {
        publicPath:'http://cdn.com.cn'  //打包后所有js资源的前边会加上publicPath的内容
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
```

### SourceMap的配置

#### SourceMap是什么？

SourceMap 是一个映射关系，他知道打包后dist目录下main.js文件中的错误实际上对应的是src目录下index.js的第几行

```js
mode: 'development',
devtool: 'source-map'  //会生成一个map后缀的文件

//devtool:'inline-source-map'  使用inline-source-map时会把对应的map文件加在main.js里(base64的形式)
// devtool前边加了cheap的时候(例如：cheap-inline-source-map) 速度更快，只映射业务代码，不管第三方模块代码，如果要管第三方模块的代码，需要加module(例如：cheap-module-source-map)
//devtool:'eval'  打包速度最快

//开发过程中建议使用 devtool:'cheap-module-eval-source-map'
//如果产品已经上线不需要映射，如果需要建议使用 devtool:'cheap-module-source-map'
```

### WebpackDevServer提升开发效率

根据源代码的修改自动重新打包

1. 在package.json文件中修改  “scripts”  对象

   ```js
   "scripts": {
       "watch": "webpack --watch"   //“webpack --watch” 监听源代码
     },
   ```

2. webpack-dev-server  ( 可能存在版本不兼容的情况 )

   打包后的文件存在内存中，从而提升打包速度

   会开启一个web服务器方便发送ajax请求，不但会监听源代码修改重新打包，还会刷新浏览器内容

   在webpack.config.js中增加配置

   ```js
   devServer: {
           contentBase: './dist',   //打包生成的文件夹
           open:true,     //启动webpack-dev-server时，自动打开浏览器
           proxy:{                                  //跨域
               '/api':'http://localhost:3000'
           }
       },
   ```

   启动命令： webpack-dev-server

### Hot Module Repalcement 热模块更新

写css时方便调试css

HotModuleReplacementPlugin是webpack自带的插件

```js
//引入webpack
const webpack = require('webpack')

//先在devServer中配置 hot 和 hotOnly
devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true	//就算HMR没起作用也不刷新页面
    },
        

//再在plugins中调用HMR
        plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
```

js中

```js
if(module.hot){
    module.hot.accept('./number',()=>{           //module.hot.accept 监控number模块的变化
        document.body.removeChild(document.getElementId('number'))
        number()
    })
}
```

### babel处理ES6语法

1. 安装模块

   ```js
   npm install --save-dev babel-loader @babel/core
   npm install @babel/preset-env --save-dev
   npm install --save @babel/polyfill     //许多方法在低版本的浏览器里不存在，缺失的变量和函数的补充
   ```

2. 配置loader

   ```js
   {
                   test: /\.m?js$/,	       //打包js文件里es6语法
                   exclude: /node_modules/,    //除去node_modules里的文件
                   use: {
                       loader: "babel-loader",
                       options: {
                           presets: [['@babel/preset-env'],
                                     useBulitIns:'usage'      //根据代码补充变量和函数，不是全部补充，需要先使用@babel/polyfill
                                    ]
                       }
                   }
               }
   ```

3. 配置@babel/polyfill

   ```js
   // 在 src/index.js的顶部引入 @babel/polyfill
   import '@babel/polyfill'  //引入所有补充的变量和函数
   ```

4. presets其他配置

   ```js
   {
                   test: /\.js$/,	       //打包js文件里es6语法
                   exclude: /node_modules/,    //除去node_modules里的文件
                   use: {
                       loader: "babel-loader",
                       options: {
                           presets: [['@babel/preset-env',
                                      {targets:{
                                         chrome:'67'   //有些浏览器不需要转译es6语法
                                     },
                                     useBuiltIns:'usage'      //根据代码补充变量和函数，不是全部补充，需要先使用@babel/polyfill
                                      }]]
                       }
                   }
               }
   ```

第二种配置 （闭包形式，不会产生全局污染）

1. 安装模块

   ```js
   npm install --save-dev @babel/plugin-transform-runtime
   npm install --save @babel/runtime
   npm install --save @babel/runtime-corejs2
   ```

2. 配置loader

   ```js
   {
                   test: /\.js$/,	       //打包js文件里es6语法
                   exclude: /node_modules/,    //除去node_modules里的文件
                   use: {
                       loader: "babel-loader",
                           options：{
                       		"plugins": [[
         							"@babel/plugin-transform-runtime",
         							{
           							"absoluteRuntime": false,
           							"corejs": 2,
                                   	"helpers": true,
           							"regenerator": true,
           							"version": "7.0.0-beta.0"
         							}]]
                       }
                   }
               }
   ```

### 配置React代码的打包

1. 安装模块

   ```js
   npm install --save-dev @babel/preset-react
   ```

2. 配置loader

   ```js
   {
                   test: /\.js$/,
                   exclude: /node_modules/,
                   use: {
                       loader: "babel-loader",
                       options: {
                           presets: [["@babel/preset-env", {
                               useBuiltIns: "usage"
                           }],
                               "@babel/preset-react"    //转译react代码
                           ]
                       }
                   }
               }
   ```


## Tree Shaking

Tree Shaking 只打包在入口文件中引入的部分，没有引入的部分剔除掉不打包。

Tree Shaking 只支持 ES Module 引入模块

### Tree Shaking配置

1. 在开发环境中使用Tree Shaking：

```js
//需要在webpack.config.js中配置
	optimization:{
        usedExprots:true
    },
    mode: 'development',
```

在package-json文件中配置

```js
 //配置sideEffiect
  "name": "lesson",
  "sideEffects": false,   //如果配置了Tree Shaking，webpack只要打包模块，就会引用Tree Shaking形式打包
  "version": "1.0.0",
      
  //如果哪些不需要使用Tree Shaking形式打包,配置下列sideEffiect
  //例如 @babel/polly-fill  css文件
  "sideEffect":["@babel/polly-fill","*.css"]
```

​	2.在production环境下面不需要配置webpack.config.js文件，需要配置package-json文件

## Development和Product模式的区分打包

development 环境下开发

product 环境下生产

### 差异

1. source-map

   development 环境下对应比较全面

   product 环境下对应比较简洁

2. development 环境下代码不会被压缩

   product 环境下代码会被压缩

### 自动化切换打包环境

新建两个文件 webpack.dev.js (开发环境下使用)  和 webpack.prod.js (生产环境下使用)

在package.json文件中配置

```js
 "scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack-dev-server  --config webpack.dev.js",   //开发环境打包
    "build": "webpack --config webpack.prod.js"				//生产环境打包
  },
```

新建webpack.common.js文件，可以把webpack.dev.js   和 webpack.prod.js 文件中的公用代码写入webpack.common.js

引入合并模块 merge

```js
npm i webpack-merge -D
```

在dev和prod配置文件中配置

```js
const {merge} = require("webpack-merge")
const commonConfig = require('./webpack.common.js')


module.exports = merge(commonConfig, devConfig)        //导出common和dev合并后的模块
module.exports = merge(commonConfig, prodConfig)	   //导出common和prod合并后的模块
```

## Webpack和Code Splitting

Code Splitting 指的是代码分割（分割业务逻辑和模板库代码）

配置SplitChunksPlugin，实现代码分割

```js
//配置webpack.config.js文件

optimization: {
        spiltChunks: {
            chunks: 'all'
        },
        usedExports: true
    },
```

代码分割，和webpack无关

webpack中实现代码分割，两种方式

1. 同步代码：只需要在webpack.config.js中做optimization的配置
2. 异步代码(import)：无需做任何配置，会自动进行代码分割，放置到新的文件中





# 1. 谈谈对webpack的看法

- `webpack` 是一个模块打包的工具，可以使用 `webpack` 管理模块依赖，并编译输出模块所需要的静态文件。能够很好地管理、打包 `web` 开发中所用到地 `HTML ` 、`JavaScript` 、`css` 以及各种静态文件（图片，字体等），让开发过程更加高效。对于不同类型的资源，`webpack` 有对应的模块加载器。`webpack` 模块打包器会分析模块间的依赖关系，最后生成了优化且合并后的静态资源

