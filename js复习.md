

# 1. 数据类型

js中有8种数据类型

基础类型：number	string	boolen	null	undifiend    symbol

引用类型：object	function	

**js几种类型的值**

- 栈：原始数据类型（`Undefined`，`Null`，`Boolean`，`Number`、`String`）
- 堆：引用数据类型（对象、数组和函数）
- 两种类型的区别是：存储位置不同；
- 原始数据类型直接存储在栈(`stack`)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆(`heap`)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其
- 在栈中的地址，取得地址后从堆中获得实体

# 2. 对象深浅克隆（头条）

**浅克隆**：只是把对象第一层克隆下来

- ~~~js
  let obj = {
      a : 100,
      b : [10,10,10,10],
      c : {
          x : 10
      },
      d : /^\d+$/
  }
  
  // 下边两种方式都是浅克隆
  
  // 方式一
   let obj2 = {
       ...obj
   }
   
  // 方式二
  let obj2 = {}
  for(let key in obj){
      if(!obj.hasOwnProperty(key)) break;
      obj2[key] = obj[key]
  }
  ~~~



![image-20220319205526982](C:\Users\HUAWEI\AppData\Roaming\Typora\typora-user-images\image-20220319205526982.png)

**深克隆**

- ~~~js
  let obj = {
      a : 100,
      b : [10,10,10,10],
      c : {
          x : 10
      },
      d : /^\d+$/
  }
  
  
  // 下列方式实现深克隆
  
  // 方式一  双JSON转换
  let obj2 = JSON.stringify(obj)    // JSOn.stringify 会忽略正则，函数，Symbol，undefined
  obj2 = JSOn.parse(obj2)
  
  // 方式二  递归多层浅克隆实现深克隆
  function deepClone(obj){
      // 过滤特殊情况
      if(obj === null) return null
      if(typeof obj === 'function') return new Function(obj)
      if(typeof obj !== 'object') return obj
      // 判断正则
      if(obj instanceof RegExp) return new RegExp(obj)
      // 判断date
      if(obj instanceof Date) return new Date(obj)
      
      
      // 不直接创建空对象，目的：克隆的结果和之前保持相同的所属类
      let newObj = new obj.constructor
      for(let key in obj){
          if(obj.hasOwnProperty(key)){
              newObj[key] = deepClone(obj[key])
          }
      }
      
      return newObj
  }
  ~~~



# 3. 堆栈

堆：存储引用类型值的空间

栈：存储基本类型值和执行代码的环境



# 4. localStorage & sessionStorage

localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。

sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

在浏览器窗口关闭后还保留数据，可以使用 [localStorage](https://www.runoob.com/jsref/prop-win-localstorage.html) 属性。



# 5. 请描述一下 `cookies`，`sessionStorage` 和 `localStorage` 的区别

- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- `cookie`数据始终在同源的http请求中携带（即使不需要），即会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 存储大小：
  - `cookie`数据大小不能超过4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大
- 有期时间：
  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - `sessionStorage` 数据在当前浏览器窗口关闭后自动删除
  - `cookie` 设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭



# 6. web开发中会话跟踪的方法有哪些

- `cookie`
- `session`
- `url`重写
- 隐藏`input`
- `ip`地址



# 7. 请你谈谈Cookie的弊端

> `cookie`虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的

- 每个特定的域名下最多生成`20`个`cookie`
- `IE6`或更低版本最多`20`个`cookie`
- `IE7`和之后的版本最后可以有`50`个`cookie`
- `Firefox`最多50个`cookie`
- `chrome`和`Safari`没有做硬性限制
- IE 和 Opera 会清理近期最少使用的 `cookie`，`Firefox` 会随机清理 `cookie`
- `cookie` 的最大大约为 `4096` 字节，为了兼容性，一般设置不超过 `4095` 字节
- 如果 `cookie` 被人拦截了，就可以取得所有的 `session` 信息



# 8. 闭包

- 闭包就是能够读取其他函数内部变量的函数
- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用链域
- 闭包的特性：
  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收

**说说你对闭包的理解**

- 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念
- 闭包 的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中
- 闭包的另一个用处，是封装对象的私有属性和私有方法
- **好处**：能够实现封装和缓存等；
- **坏处**：就是消耗内存、不正当使用会造成内存溢出的问题

**使用闭包的注意点**

- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露
- 解决方法是，在退出函数之前，将不使用的局部变量全部删除



# 9. 说说对作用域链的理解

- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到`window`对象即被终止，作用域链向下访问变量是不被允许的
- 简单的说，作用域就是变量和函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期



# 10. JS原型，原型链 ？有什么特点 ？

- 每个对象都会在其内部初始化一个属性，就是`__proto__ `
- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么就会去 `__proto__` 里找个属性，这个`__proto__`又有自己的`__proto__`，于是就这样一直找下去，也就是我们平时所说的原型链的概念。按照标准，`__proto__`是不对外公开的，也就是私有属性
- 关系：`instance.constructor.prototye  == instance.__proto__`

~~~js
let a = {}
a.consutructor.prototpe == a.__proto__
~~~

- 特点：
  - `JavaScript` 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变
  - 当我们需要一个属性时，`JavaScript` 引擎会先看当前对象中是否有这个属性，如果没有就会查找他的 `Prototype` 对象是否有这个属性，如此递推下去，一直检索到 `Object` 内建对象 

- **原型**
  - `JavaScript` 的所有对象中都包含了一个 `[__proto__]` 内部属性，这个属性所对应的就是该对象的原型
  - `JavaScript` 的函数对象，除了原型 `[__proto__]` 之外，害预置了 `prototype` 属性
  - 当函数对象作为构造函数创造实例时，该 `prototype` 属性值将被作为实例对象的原型 `[__proto__]`
- **原型链**
  - 当一个对象调用的属性/方法自身不存在时，就会去自己 `[__proto__]` 关联的前辈 `prototype` 对象上去找
  - 如果没找到，就会去该 `prototype` 原型 `[__proto__]` 关联的前辈 `prototype` 去找。依此类推，直到找到属性/方法或 `undefined` 为止，从而形成了所谓的**原型链**
- **原型特点**
  - `JavsScript` 对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变



# 11. 解释事件代理

- 事件代理（`Event Delegation`），又称之为事件委托。是 `JavaScript` 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担任事件监听的职责。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能
- 可以大量节省内存占用，减少事件注册。比如在 `table` 上代理所有 `td` 的 `click` 事件就非常棒
- 可以实现当新增子对象时无需再次对其绑定



# 12. JavaScript 实现继承

- 构造继承
- 原型继承
- 实例继承
- 拷贝继承
- 原型 `prototype` 机制或 `apply` 和 `call` 方法去实现较简单，建议使用构造函数与原型混合方式

~~~ js
function Parent(){
    this.name = 'wang'
}

function Child(){
    this.age = 28
}

Child.prototype = new Parent()  // 继承了Parent，通过原型

let demo = new Child()
console.log(demo.age,demo.name)
~~~

[参考 - js六种继承]([JavaScript是如何实现继承的(六种方式)_javascript技巧_脚本之家 (jb51.net)](https://www.jb51.net/article/81766.htm))

# 13. this对象的理解

- `this` 总是指向函数的直接调用者（而非间接调用者）
- 如果有 `new` 关键字，`this` 指向 `new` 出来的那个对象
- 在事件中，`this` 指向触发这个事件的对象



# 14. 事件模型

> `w3c` 中定义事件的发生经历三个阶段：捕获阶段（`capturing`）、目标阶段（`targetin`）、冒泡阶段（`bubbling`）

- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发
- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发
- DOM事件流：同时支持两种事件模型：捕获型事件和冒泡型事件
- 阻止冒泡：在 `W3C`中，使用 `stopPropagetion()` 方法；在IE下设置 `cancelBubble = true`
- 阻止捕获：阻止事件的默认行为，例如 `click - <a>` 后的跳转。在 `W3C` 中使用 `preventDefault()` 方法，在IE下设置`window.event.retunValue = false`



# 15. new操作符具体干了什么

- 创建一个空对象，并且 `this` 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 `this` 引用的对象中
- 新创建的对象由 `this` 所引用，并且最后隐式的返回 `this`



# 16. Ajax原理

- `Ajax` 的原理简单来说是在用户和服务器之间加了一个中间层（`AJAX`引擎），通过 `XmlHttpRequest` 对象来向服务器发异步请求，从服务器获得数据，然后用 `JavaScript` 来操作 `DOM` 而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
- `Ajax` 的过程只涉及 `JavaScript` 、`XmlHttpRequest` 和 `DOM` 。`XmlHttpRequest` 是 `Ajax` 的核心

~~~js
// 创建连接
const xhr = new XMLHttpRequest()
// 连接服务器
xhr.open('get',url,true)
// 发送请求
xhr.send(null)
// 接收响应
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            // 成功操作
        }
        else{
            // 失败操作
        }
    }
}
~~~

**Ajax有哪些优缺点**

- 优点：
  - 通过异步模式，提升了用户体验
  - 优化了浏览器和服务器之间的传输，减少了不必要的数据往返，减少了带宽占用
  - `Ajax` 在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载
  - `Ajax` 可以实现动态不刷新 （局部刷新）
- 缺点：
  - 安全问题 `Ajax` 暴露了与服务器交互的细节
  - 对搜索引擎的支持比较弱
  - 不容易调试



# 17. 异步加载JS的方式有哪些

- 设置 `<script>` 属性 `async="async"` （一旦脚本可用，则会异步执行）
- 动态创建 `script DOM` : `document.createElement('script')`
- `XmlHttpRequest` 脚本注入
- 异步加载库 `LABjs`
- 模块记载器 `Sea.js`



# 18. 哪些操作会造成内存泄漏

> JavaScript 内存泄漏指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

- 未使用 `var` 声明的全局变量
- 循环引用（两个对象相互引用）
- 控制台日志（console.log）
- 移除存在绑定事件的 DOM 元素（IE）
- `setTimeout` 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- **垃圾回收**：
  - 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为0（没有其他对象引用过该对象），或对象的唯一引用是循环，那么该对象的内存即可回收



# 19. XML和JSON的区别

- 数据体积方面
  - `JSON` 相对于 `XML` 来讲，数据的体积小，传递的速度更快
- 数据交互方面
  - `JSON` 与 `JavaScript` 的交互更加方便，更容易解析处理，更好的数据交互
- 数据描述方面
  - `JSON` 对数据的描述性比 `XML` 较差
- 传输速度方面
  - `JSON` 的速度要远远快于 `XML`



# 20. AMD和Commonjs的理解

- `Commonjs` 是服务器端模块的规范，`node.js` 采用了这个规范。`Commonjs`规范加载模块是同步的，也就是说，只有加载完成，才会执行后边的操作。`AMD` 规范则是非同步加载模块，允许指定回调函数
- `AMD` 推荐的风格通过返回一个对象作为模块对象，`Commonjs` 的风格通过对 `module.exports` 或 `exports` 的属性赋值来达到暴露模块对象的目的

**react中模块引入——import**

提出的规范不同
`import` 是ES6语法,`reuqire` 是 `CommonJs` 提出的.

`import` 会通过 `babel` 转换成 `CommonJS` 规范。
下面两行代码是等价的

~~~jsx
import component from './component'
// =>
const component = require('./component')
~~~



# 21. offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别

- `offsetWidth/offsetHeight`返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
  - `offsetLeft`/ `offsetTop` (可控制元素移动)
- `clientWidth/clientHeight`返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
  - 可视区指的是浏览器减去上面菜单栏，下面状态栏和任务栏，右边滚动条（如果有的话）后的中间网页内容的单页面积大小。
- `scrollWidth/scrollHeight`返回值包含**content + padding + 溢出内容的尺寸**



# 22. JS中有哪些方法定义对象

- 对象字面量：`let obj = {}`
- 构造函数：`let obj = new Object()`
- Object.create() ：`let obj = Object.create(Object.prototype)`



# 23. 说说你对promise的了解

- 依照 `Promise/A+` 的定义，`Promise` 有四种状态：
  - `pending:` 初始状态, 非 `fulfilled` 或 `rejected.`
  - `fulfilled:` 成功的操作.
  - `rejected:` 失败的操作.
  - `settled: Promise`已被`fulfilled`或`rejected`，且不是`pending`
- 另外， `fulfilled`与 `rejected`一起合称 `settled`
- `Promise` 对象用来进行延迟(`deferred`) 和异步(`asynchronous`) 计算

**Promise 的构造函数**

- 构造一个 `Promise`，最基本的用法如下：

~~~js
let promise = new Promise(function(resolve, reject) {

        if (...) {  // succeed

            resolve(result);

        } else {   // fails

            reject(Error(errMessage));

        }
    });
~~~

- `Promise` 实例拥有 `then` 方法（具有 `then` 方法的对象，通常被称为`thenable`）。它的使用方法如下：

```js
promise.then(onFulfilled, onRejected)
```

- 接收两个函数作为参数，一个在 `fulfilled` 的时候被调用，一个在`rejected`的时候被调用，接收参数就是 `future`，`onFulfilled` 对应`resolve`, `onRejected`对应 `reject`



# 24. js有哪些内置对象

- `Object` 是 `JavaScript` 中所有对象的父对象
- 数据封装类对象：`Object` 、`Array`、`Boolean`、`Number`  和 `String`
- 其他对象：`Function` 、`Arguments`、`Math`、`Date`、`RegExp`、`Error`



# 25. 说几条JS的基本规范

- 不要在同一行声明多个变量
- 请使用 `===/!==` 来比较 `true/false` 或者数值
- 使用对象自变量替代 `new Array` 这种形式
- 不要使用全局函数
- `Switch` 语句必须带有 `default` 分支
- `If` 语句必须使用大括号
- `for-in` 循环中的变量应该使用 `var` 关键字明确限定作用域，从而避免作用域污染



# 26. javascript创建对象的几种方式

> `JavaScript` 创建对象简单的说，无非就是使用内置对象或各种自定义对象，当然还可以用 `JSON` 。

- 对象字面量

~~~js
person={firstname:"Mark",lastname:"Yun",age:25,eyecolor:"black"};
~~~

- 用 `function` 来模拟无参的构造函数

~~~js
function Person(){}
	var person=new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
        person.name="Mark";
        person.age="25";
        person.work=function(){
        alert(person.name+" hello...");
}
person.work();
~~~

- 用 `function` 来模拟有参构造函数来实现（用 `this` 关键字定义构造的上下文属性）

~~~js
function Pet(name,age,hobby){
       this.name=name;//this作用域：当前对象
       this.age=age;
       this.hobby=hobby;
       this.eat=function(){
           alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
       }
}
var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
maidou.eat();//调用eat方法
~~~

- 用工厂方式来创建（内置对象）

~~~js
var wcDog =new Object();
     wcDog.name="旺财";
     wcDog.age=3;
     wcDog.work=function(){
       alert("我是"+wcDog.name+",汪汪汪......");
     }
     wcDog.work();
~~~

- 用原型方式来创建

~~~js
function Dog(){}
Dog.prototype.name="旺财";
Dog.prototype.eat=function(){
	alert(this.name+"是个吃货");
}
var wangcai =new Dog();
wangcai.eat();
~~~

- 用混合方式来创建

~~~js
 function Car(name,price){
	this.name=name;
	this.price=price;
}
Car.prototype.sell=function(){
	alert("我是"+this.name+"，我现在卖"+this.price+"万元");
}
var camry =new Car("凯美瑞",27);
camry.sell();
~~~



# 27. eval是做什么的

- 它的功能是把对应的字符串解析成 `js` 代码并运行
- 应该避免使用 `eval` ,不安全，非常耗费性能（2次，一次解析成 `js` 语句，一次执行）
- 由 `JSON` 字符串转换为 `JSON` 对象的时候可以用 `eval`  ，`let obj = eval('('+str+')')`



# 28. null,undefined 的区别

- `undefined` 表示不存在这个值
- `undefined` 是一个表示“无”的原始值或者说表示“缺少值”，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 `undefined`
- 例如变量被声明了，但没有赋值时，就等于 `undefined`
- `null` 表示一个对象被定义了，值为“空值”
- `null` 是一个对象（空对象，没有任何属性和方式）
- 例如作为函数的参数，表示该函数的参数不是对象
- 在验证 `null` 时，一定要用 `===` ，因为 `==` 无法分别 `null` 和 `undefined`



# 29. ["1", "2", "3"].map(parseInt) 答案是多少

- `[1,NaN,NaN]` 因为 `parseInt` 需要两个参数 `(val,radix)` ，其中 `radix` 表示解析时用的参数
- `map` 穿了 3 个 `(element,index,array)`,对应的 `raidx` 不合法导致解析失败返回 `NaN`
- 失败原因：
  - 当传入 `("2",1)` 时，因为 `parseInt` 要求 `radix` 范围为 2~36 ，所有传入的 `radix` 不合法返回 `NaN`
  - 当传入 `("3",2)` 时，即把 `"3"` 从二进制转换为十进制，2进制中没有 3 ，所以不合法返回NaN



# 30. javascript 代码中的"use strict";是什么意思

- `use strict`是一种`ECMAscript 5` 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,使`JS`编码更加规范化的模式,消除`Javascript`语法的一些不合理、不严谨之处，减少一些怪异行为



# 31. JSON的了解

- `JSON(JavaScript Object Notation)` 是一种轻量级的数据交换格式
- 它是基于`JavaScript`的一个子集。数据格式简单, 易于读写, 占用带宽小
- `JSON`字符串转换为JSON对象:

```javascript
var obj = eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
```

- `JSON`对象转换为JSON字符串：

```js
var last = obj.toJSONString();
var last = JSON.stringify(obj);
```



# 32. js延迟加载的方式有哪些

- 设置 `<script>` 属性 `defer="defer"` （脚本将在页面完成解析时执行）

- 动态创建 `script DOM`：`document.createElement('script');`

- `XmlHttpRequest` 脚本注入

- 延迟加载工具 `LazyLoad`

  

# 33. defer和async

- `defer`并行加载`js`文件，会按照页面上`script`标签的顺序执行
- `async`并行加载`js`文件，下载完成立即执行，不会按照页面上`script`标签的顺序执行



# 34. 同步和异步的区别

- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容



# 35. 说说严格模式的限制

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 `with` 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）