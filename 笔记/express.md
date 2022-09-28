# express

原生的http在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更高度统一。

在node中有很多web开发框架，以学习`express`为主。

- express官网：http://expressjs.com/

### 起步

安装：

```shell
npm install express
```

### hello world

```js
var express = require('express')

var app = express()

app.get('./',function(req,res){
    res.send('hello world')
})

app.listen(3000,function(){
    console.log('running···')
})
```

### 基本路由

路由器：

- 请求方法
- 请求路径
- 请求处理函数

get：

```js
//当你以GET方法请求 / 的时候，执行对应的处理函数
app.get('./',function(req,res){
    res.send('hello world')
})
```

post:

```js
//当你以POST方法请求 / 的时候，执行对应的处理函数
app.post('./',function(req,res){
    res.send('Got a POST request')
})
```

### 静态服务

```js
// /public资源
app.use(express.static('public'))

// /files资源
app.use(express.static('files'))

// /public/xxx
app.use('/public',express.static('public'))

// /static/xxx
app.use('/static',express.static('public'))

app.use('/static',express.static(path.join(__dirname,'public')))
```

## art-template

### 在express中配置使用art-template模板引擎

- [art-template-Github仓库](http://github.com/aui/art-template)
- [art-template 官方文档](https://aui.github.io/art-template)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```js
app.engine('art',require('express-art-template'))
```

使用：

```js
app.get('/',function(req,res){
    //express默认会去项目中的views目录找index.html
    res.render('index.html'，{
               title:'hello world'
               })
})
```

如果希望修改默认的`views`视图渲染存储目录，可以

```js
// 注意：第一个参数 views 千万不要写错
app.set('views',目录路径)
```



## body-parser

### 在express中获取表单post请求体数据

在express中没有内置获取表单post请求体的API，需要使用第三方包：`body-parser`

安装：

```shell
npm install body-parser
```

配置：

```js
var express = require('express')
//引包
var bodyParser = require('body-parser')

var app = express()

//配置body-parser
//加入这个配置，则在req请求对象上会多出来一个属性：body
//可以用req.body获取表单post请求体数据
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

```

使用：

```js
app.use(function (req,res){
    res.setHeader('Content-Type','text/plain')
    res.write('you posted:\n')
    //可以通过req.body来获取表单post请求体数据
    res.end(JSON.stringify(req.body,null,2))
})
```



### 在express中获取表单GET请求参数

express内置了一个API，可以直接通过`req.query`来获取

```js
req.query
```



# 其他

### 文件操作路径和模块路径

文件操作路径：

```js
//在文件操作的相对路径中
//  ./data/a.txt 相当于当前目录
//  data/a.txt   相当于当前目录
//  /data/a.txt	 绝对路径，当前文件模块所处磁盘根目录
//  c:/xx/xx...  绝对路径
//  fs.readFile('./data/a.txt',function(err,data){
//		if(err){
//			console.log(err)
//			return console.log('读取失败')
//		}
//		console.log(data.toString())	
//	})
```

模块操作路径：

```js
//这里如果忽略了 . 则也是磁盘根目录
require('/data/foo.js')

//相对路径
require('./data/foo.js')

//模块加载的路径中的相对路径不能省略 ./
```

### 修改完代码自动重启服务器

我们这里可以使用一个第三方工具：`nodemon`来帮我们解决频繁修改代码重启服务器问题。

`nodemon`是一个基于node.js开发的一个第三封命令行工具，我们使用的时候需要独立安装：

```shell
# 在任意目录执行该命令都可以
npm install --global nodemon
```

安装完毕之后，使用：

```shell
# 使用 nodemon
nodemon app.js
```

只要是通过`nodemon app.js`启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器。

### path路径操作模块

- path.basename
  - 获取一个路径的文件名（默认包含扩展名）
- path.dirname
  - 获取一个路径中的目录部分
- path.extname
  - 获取一个路径中的扩展名部分
- path.parse
  - 把一个路径转为对象
    - root 根路径
    - dir 目录
    - base 包含后缀名的文件名
    - ext 后缀名
    - name 包含不后缀名的文件名
- path.join
  - 当你需要用路径拼接的时候，推荐使用这种方法
- path.isAbsolute
  - 判断一个路径是否是绝对路径

