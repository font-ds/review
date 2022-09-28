# 1. 数据类型	

js中有8种数据类型

基础类型：number	string	boolen	null	undifiend    symbol   bigInt

引用类型：object	function	

**js几种类型的值**

- 栈：原始数据类型（`Undefined`，`Null`，`Boolean`，`Number`、`String`）
- 堆：引用数据类型（对象、数组和函数）
- 两种类型的区别是：存储位置不同；
- 原始数据类型直接存储在栈(`stack`)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型是存储在堆(`heap`)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体



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



![image-20220505141731117](/Users/guanyifang/Library/Application Support/typora-user-images/image-20220505141731117.png)

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

`localStorage` 和 `sessionStorage` 属性允许在浏览器中存储 `key/value` 对的数据。

`sessionStorage` 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

在浏览器窗口关闭后还保留数据，可以使用 `localStorage` 属性。



# 5. 请描述一下 `cookies`，`sessionStorage` 和 `localStorage` 的区别

- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
  - 后端返回的 `cookie`，浏览器自动读取后注入浏览器
- `cookie`数据始终在同源的 `http` 请求中携带（即使不需要），即会在浏览器和服务器间来回传递
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
a.consutructor.prototype == a.__proto__
~~~

- 特点：
  - `JavaScript` 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变
  - 当我们需要一个属性时，`JavaScript` 引擎会先看当前对象中是否有这个属性，如果没有就会查找他的 `Prototype` 对象是否有这个属性，如此递推下去，一直检索到 `Object` 内建对象 

- **原型**
  - `JavaScript` 的所有对象中都包含了一个 `[__proto__]` 内部属性，这个属性所对应的就是该对象的原型
  - `JavaScript` 的函数对象，除了原型 `[__proto__]` 之外，还预置了 `prototype` 属性
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

~~~html
 	<ul id="ul1">
        <li id="item1">item1</li>
        <li id="item2">item2</li>
        <li  id="item3">item3</li>
    </ul>
    <script>
        window.onload= function () {
        var ul=document.getElementById("ul1");

        ul.onclick= function (event) {
            var e=event||window.event;
            var event= e.target || e.srcElement;     // e.srcElement 时IE里的属性
            switch (event.id){
                case "item1":
                    alert("item1");
                    break;
                case "item2":
                    alert("item2");
                    break;
                case "item3":
                    alert("item3");
                    break;
            }
        }
    }
    </script>
~~~



# 12. JavaScript 实现继承

- 构造继承：使用 `call` 或 `apply` 方法，将父对象的构造函数绑定在子对象上

~~~js
function Cat(name,color){
 　Animal.apply(this, arguments);
 　this.name = name;
 　this.color = color;
}
~~~

- 原型继承：将子对象的 `prototype` 指向父对象的 `prototype`

~~~js
function extend(Child, Parent) {
    var F = function(){};
  　F.prototype = Parent.prototype;
  　Child.prototype = new F();
  　Child.prototype.constructor = Child;
  　Child.uber = Parent.prototype;
}
~~~

- 实例继承：将子对象的 prototype 指向父对象的一个实例

~~~js
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
~~~

- 拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象

~~~js
function extend(Child, Parent) {
　　　var p = Parent.prototype;
　　　var c = Child.prototype;
　　　for (var i in p) {
　　　   c[i] = p[i];
　　　}
　　　c.uber = p;
　 }
~~~

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

- ES6 语法糖

~~~js
class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
    }
    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
~~~



[JavaScript是如何实现继承的(六种方式)_javascript技巧_脚本之家 (jb51.net)](https://www.jb51.net/article/81766.htm)

# 13. this对象的理解

- `this` 总是指向函数的直接调用者（而非间接调用者）
- 如果有 `new` 关键字，`this` 指向 `new` 出来的那个对象
- 在事件中，`this` 指向触发这个事件的对象

**this指向**

- `this` 的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定 `this` 到底指向谁，实际上 `this` 的最终指向的是那个调用它的对象
- 《javascript语言精髓》中大概概括了4种调用方式：
- 方法调用模式
- 函数调用模式
- 构造器调用模式
- `apply / call` 调用模式



**1. this 指向有哪几种**

- 默认绑定：全局环境中，`this` 默认绑定到 `window`
- 隐式绑定：一般地，被直接对象所包含的函数调用时，也称为方法调用，`this`隐式绑定到该直接对象
- 隐式丢失：隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到`window`。显式绑定：通过`call()`、`apply()`、`bind()`方法把对象绑定到`this`上，叫做显式绑定
- `new` 绑定：如果函数或者方法调用之前带有关键字 `new` ，它就构成构造函数调用。对于 `this` 绑定来说，称为 `new` 绑定
  - 构造函数通常不使用`return`关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值
  - 如果构造函数使用`return`语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果
  - 如果构造函数显式地使用`return`语句返回一个对象，那么调用表达式的值就是这个对象

**2. 改变函数内部 this 指针的指向函数（bind，apply，call的区别）**

- `apply`：调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.apply(A, arguments)` ; 即A对象应用B对象的方法
- `call`：调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.call(A, args1,args2)` ; 即A对象调用B对象的方法
- `bind`：除了返回是函数以外，它的参数和`call`一样

**3. 箭头函数**

- 箭头函数没有 `this`，所以需要通过查找作用域链来确定 `this` 的值，这就意味着如果箭头函数被非箭头函数包含，`this` 绑定的就是最近一层非箭头函数的 `this`，
- 箭头函数没有自己的 `arguments`对象，但是可以访问外围函数的 `arguments`对象
- 不能通过 `new` 关键字调用，同样也没有 `new.target` 值和原型



# 14. 事件模型

> `W3C` 中定义事件的发生经历三个阶段：捕获阶段（`capturing`）、目标阶段（`targetin`）、冒泡阶段（`bubbling`）

- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发
- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发
- DOM事件流：同时支持两种事件模型：捕获型事件和冒泡型事件
- 阻止冒泡：在 `W3C`中，使用 `stopPropagetion()` 方法；在IE下设置 `cancelBubble = true`
- 阻止捕获：阻止事件的默认行为，例如 `click - <a>` 后的跳转。在 `W3C` 中使用 `preventDefault()` 方法，在IE下设置`window.event.retunValue = false`



# 15. new操作符具体干了什么

- 在内存中创建一个新对象。
- 将空对象的 `__proto__` 指向构造函数的 `protoType` 属性
- 构造函数内部的 `this` 被赋值为这个 新对象（即 `this` 指向新对象）
- 执行构造函数内部的代码（给新对象添加属性）
- 如果构造函数返回非空对象，则返回该对象；否则，返回刚才创建的新对象



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
- 模块加载器 `Sea.js`



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
  - `settled: Promise`已被`fulfilled`或`rejected`，且不是`pending`  （可能已经被废弃了）
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
- `null` 是一个对象（空对象，没有任何属性和方法）
- 例如作为函数的参数，表示该函数的参数不是对象
- 在验证 `null` 时，一定要用 `===` ，因为 `==` 无法分别 `null` 和 `undefined`



# 29. ["1", "2", "3"].map(parseInt) 答案是多少

- `[1,NaN,NaN]` 因为 `parseInt` 需要两个参数 `(val,radix)` ，其中 `radix` 表示解析时用的参数
- `map` 穿了 3 个 `(element,index,array)`,对应的 `radix` 不合法导致解析失败返回 `NaN`
- 失败原因：
  - 当传入 `("2",1)` 时，因为 `parseInt` 要求 `radix` 范围为 2~36 ，所以传入的 `radix` 不合法返回 `NaN`
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
- 不能使用`arguments.callee`  (值为“正被执行的Function对象”)
- 不能使用`arguments.caller`  (保存着调用当前函数的函数)
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）



# 36. attribute和property的区别是什么

- `attribute`是`dom`元素在文档中作为`html`标签拥有的属性；
- `property`就是`dom`元素在`js`中作为对象拥有的属性。
- 对于`html`的标准属性来说，`attribute`和`property`是同步的，是会自动更新的
- 但是对于自定义的属性来说，他们是不同步的



# 37. 谈谈你对ES6的理解

- 新增模板字符串（为 `JavaScript` 提供了简单的字符串插值功能）
- 箭头函数
- `for-of` （用来遍历数据—例如数组中的值）
- `arguments` 对象可被不定参数和默认参数完美替代
- `ES6` 将 `Promise` 对象纳入规范，提供了原生的 `Promise` 对象
- 增加了 `let` 和 `const` 命令，用来声明变量  
- 增加了块级作用域
- `let` 命令实际上增加了块级作用域
- 引入 `module` 模块概念



# 38. 面向对象编程及面向过程编程

- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了
- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为
- 面向对象是以功能来划分问题，而不是步骤

**面向对象编程思想**

- 基本思想是使用对象，类，继承，封装等基本概念来进行程序设计
- 优点
  - 易维护
    - 采用面向对象思想设计的结构，可读性高，由于继承的存在，即使改变需求，那么维护也只是在局部模块，所以维护起来非常方便和较低成本的
  - 易扩展
  - 开发工作的重要性、继承性高，降低重复工作量
  - 缩短了开发周期



# 39. 对web标准、可用性、可访问性的理解

- 可用性(Usability)：产品是否 容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力
- 可访问性(Accessibility)：Web内容对于残障用户的可阅读和可理解性
- 可维护性(Maintainability)：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能



# 40. 如何通过JS判断一个数组

- `instanceof` 方法
  - `instanceof` 运算符是用来测试一个对象是否在其原型链原型构造函数的属性

~~~js
let arr = []
arr instanceof Array  // true
~~~

- `constructor` 方法
  - `constructor` 属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数

~~~js
let arr = []
arr.constructor == Array  // true
~~~

- `ES5` 新增方法 `isArray()`

~~~js
let a = new Array(123)
Array.isArray(a)    // true
~~~

- 最简单的方法
  - 这种写法，是 `Jquery` 正在使用的

~~~js
Object.prototype.toString.call([]) == '[Object Array]'

// 利用这个方法，可以写一个返回数据类型的方法
let isType = function(obj){
    return Object.prototype.toString.call(obj).slice(8,-1)
}
~~~



# 41. let和var的区别

- `let` 命令不存在变量提升，如果在 `let` 前使用，会导致报错
- 如果块区中存在 `let` 和 `const` 命令，就会形成闭合作用域
- `let ` 不允许重复声明，因此，不能在函数内部重新声明参数



# 42. cookie和session的区别及session的生命周期

**区别**

- `cookie` 数据存放在客户端，`session` 数据存放在服务器上
- `cookie` 不是很安全，别人可以分析存放在本地的 `cookie` 并进行 `cookie` 欺骗，考虑到安全应当使用 `session`
- `session` 会在一定时间内保存在服务器上。当访问增多，会比较占用服务器的性能，考虑到减轻服务器性能方面，应当使用 `cookie`
- 单个 `cookie` 保存的数据长度不能超过4K，很多浏览器都限制一个网址最多保存20个 `cookie` 

**session生命周期**

- `session` 保存在服务器端，为了获取更高的存取速度，服务器一般会把 `session` 放在内存里边，每个用户都会有一个独立的 `session` 
- 如果 `session` 里面的内容太过复杂，当大量的用户访问服务器时，可能会导致内存溢出，所以我们的 `session` 内容应当适当的精简
- 但我们第一次访问服务器时，服务器会给我们自动创建一个 `session` ，生成 `session` 后，只要用户继续访问，服务器就会更新 `session` 的最后访问时间，并且维护这个 `session`
- 当用户访问服务器一次，无论是否读完了 `session` ，服务器都会认定这个`session` 活跃了一次，当越来越多的用户访问服务器时，`session` 会越来越多。
- 为了防止内存溢出，服务器会把长时间没有活跃的 `session` 删除。这个时间就是 `session` 的超时时间，过了超时时间，我们的`session` 就会自动失效



# 43. map与forEach的区别

- `forEach` 方法，是最基本的方法，就是遍历和循环，默认有三个传参：分别是遍历的数组内容 `item` 、数组索引 `index` 、和当前遍历数组 `Array` 
- `map` 方法，基本用法与 `forEach` 一致，但是不同的，它会返回一个新的数组，所以在callback需要有 `return` 值，如果没有。会返回 `undefined`



# 44. 谈一谈对函数式编程的理解

- 简单说，“函数式编程”是一种“编程范式”，也就是如何编写程序的方法论
- 它具有以下特性：闭包和高阶函数、惰性计算、递归、函数是“第一等公民”、只用“表达式”
- 函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而非设计一个复杂的执行过程
- 简单来讲，就是要把过程逻辑写成函数，定义好输入参数，只关心它的输出结果。即是一种描述集合和集合之间的转换关系，输入通过函数都会返回有且只有一个输出值



# 45. 箭头函数与普通函数的区别

- 语法更加简洁、清晰
- 箭头函数不会创建自己的 `this`

> 箭头函数不会创建自己的this,所以它没有自己的this，它只会从自己的作用域链的上一层继承this。

> 箭头函数没有自己的`this`，它会捕获自己在**定义时**（注意，是定义时，不是调用时）所处的**外层执行环境的`this`**，并继承这个`this`值。所以，箭头函数中`this`的指向在它被定义的时候就已经确定了，之后永远不会改变。

- 箭头函数继承而来的 `this` 指向永远不变
- `call / apply / bind ` 无法改变箭头函数中 `this` 的指向

- 箭头函数不能作为构造函数使用
- 箭头函数没有自己的 `arguments` ，可以在箭头函数中使用 `rest (...变量名)` 参数代替
- 箭头函数没有原型 `prototype`

- 箭头函数不用作 `Generator` 函数，不能使用 `yelid` 关键字
  - 因为标准规范定义了生成器必须是 `function*` 。箭头函数就无法匹配这个token



# 46. 异步编程的实现方式

- 回调函数
  - 优点：简单，容易理解
  - 缺点：不利于维护，代码耦合高
- 事件监听（采用时间驱动模式，取决于某个事件是否发生）
  - 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
  - 缺点：事件驱动型，流程不够清晰
- 发布/订阅(观察者模式)
  - 类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者
- `Promise` 对象
  - 优点：可以利用 `then` 方法，进行链式写法；可以书写错误时的回调函数；
  - 缺点：编写和理解，相对比较难
- `Generator` 函数
  - 在函数的执行过程中,将函数的执行权转义出去,在函数外部还可以将执行权给转移回来。
  - 优点：函数体内外的数据交换、错误处理机制
  - 缺点：流程管理不方便
- `async` 函数
  - `async` 函数是 `generator` 和 `promise` 实现的一个自动执行的语法糖,它内部自带执行器,当函数内部执行到一个 `await` 语句的时候,如果语句返回一个 `promise` 对象,那么函数将会等待 `promise` 对象的状态变为 `resolve` 后再继续向下执行
  - 优点：内置执行器、更好的语义、更广的适用性、返回的是 `Promise`、结构清晰。
  - 缺点：错误处理机制



# 47. JS动画与CSS动画区别及相应实现

- `CSS3`的动画的优点
  - 在性能上会稍微好一些，浏览器会对`CSS3`的动画做一些优化
  - 代码相对简单
- 缺点
  - 在动画控制上不够灵活
  - 兼容性不好
- `JavaScript`的动画正好弥补了这两个缺点，控制能力很强，可以单帧的控制、变换，同时写得好完全可以兼容`IE6`，并且功能强大。对于一些复杂控制的动画，使用`javascript`会比较靠谱。而在实现一些小的交互动效的时候，就多考虑考虑`CSS`吧



# 48. JS 数组和对象的遍历方式，以及几种方式的比较

> 通常我们会用循环的方式来遍历数组。但是循环是 导致js 性能问题的原因之一。一般我们会采用下几种方式来进行数组的遍历

- `for in `循环
- `for` 循环
- `forEach`
  - 这里的 `forEach`回调中两个参数分别为 `value`，`index`
  - `forEach` 无法遍历对象
  - IE不支持该方法；`Firefox` 和 `chrome` 支持
  - `forEach` 无法使用 `break`，`continue` 跳出循环，且使用 `return` 是跳过本次循环
- 这两种方法应该非常常见且使用很频繁。但实际上，这两种方法都存在性能问题
- 在方式一中，`for-in`需要分析出`array`的每个属性，这个操作性能开销很大。用在 `key` 已知的数组上是非常不划算的。所以尽量不要用`for-in`，除非你不清楚要处理哪些属性，例如 `JSON`对象这样的情况
- 在方式2中，循环每进行一次，就要检查一下数组长度。读取属性（数组长度）要比读局部变量慢，尤其是当 `array` 里存放的都是 `DOM` 元素，因为每次读取都会扫描一遍页面上的选择器相关元素，速度会大大降低



# 49. 事件的各个阶段

- 1：捕获阶段 ---> 2：目标阶段 ---> 3：冒泡阶段
- `document`  --->  `target` 目标  --->  `document`
- 由此，`addEventListener` 的第三个参数设置为 `true` 和 `false` 的区别已经非常清晰了
  - `true` 表示该元素在事件的 “捕获阶段” (由外向内传递时) 响应事件
  - `false` 表示该元素在事件的 “冒泡阶段” (由内向外传递时) 响应事件



# 50. let var const

**let**

- 允许声明一个作用域被限制在块级中的变量、语句或者表达式
- `let` 绑定不受变量提升的约束，这意味着 `let` 声明不会被提升到当前
- 该变量处于从块开始到初始化处理的“暂存死区”

**var**

- 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的
- 由于变量声明（以及其他声明）总是在任意代码执行之前处理的，所以在代码中的任意位置声明变量总是等效于在代码开头声明

**const**

- 声明创建一个值的只读引用 (即指针)
- 基本数据当值发生改变时，那么其对应的指针也将发生改变，故造成 `const`声明基本数据类型时，再将其值改变时，将会造成报错
- 但是如果是复合类型时，如果只改变复合类型的其中某个`Value`项时， 将还是正常使用



# 51. 让一个数组乱序

~~~js
let arr = [1,2,3,4,5,6,7,8,9,10]
arr.sort(function(){
    return Math.random() - 0.5
})
console.log(arr)
~~~



# 52. 如何显示几万条数据并不卡住页面

> 这道题考察了如何在不卡住页面的情况下渲染数据，也就是说不能一次性将几万条数据都渲染出来，而应该一次渲染部分 `DOM` ，那么就可以通过 `requestAnimationFrame` 来每 `16ms` 刷新一次

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <ul>控件</ul>
  <script>
    setTimeout(() => {
      // 插入十万条数据
      const total = 100000
      // 一次插入 20 条，如果觉得性能不好就减少
      const once = 20
      // 渲染数据总共需要几次
      const loopCount = total / once
      let countOfRender = 0
      let ul = document.querySelector("ul");
      function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
          const li = document.createElement("li");
          li.innerText = Math.floor(Math.random() * total);
          fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
      }
      function loop() {
        if (countOfRender < loopCount) {
          window.requestAnimationFrame(add);
        }
      }
      loop();
    }, 0);
  </script>
</body>
</html>
~~~



# 53. 获取到页面中所有的checkbox怎么做

~~~js
let domList = document.getElementsByTagName('input')
let checkBoxList = []
let len = domList.length
while (len--){
    if(domList[len].type == 'checkbox'){
        checkBoxList.push(domList[len])
    }
}
~~~



# 54. 添加、移除、移动、复制、创建和查找节点

**创建新节点**

```js
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```

**添加、移除、替换、插入**

```js
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入
```

**查找**

~~~js
getElementsByTagName()    //通过标签名称

getElementsByName()     //通过元素的Name属性的值

getElementById()        //通过元素Id，唯一性

querySelector()
~~~



# 55. 正则表达式

> 正则表达式构造函数`var reg=new RegExp(“xxx”)`与正则表达字面量`var reg=//`有什么不同？匹配邮箱的正则表达式？

- 当使用`RegExp()`构造函数的时候，不仅需要转义引号（即`\`”表示”），并且还需要双反斜杠（即`\\`表示一个`\`）。使用正则表达字面量的效率更高

邮箱的正则匹配：

```js
var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
```

中文的正则匹配：

~~~js
var reg = /^[\u4e00-\u9fa5]{0,}$/
~~~



[RegExp详细---廖雪峰]([RegExp - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021582119488))

[RegExp详细---MDN]([正则表达式 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions))



# 56. Javascript中callee和caller的作用？

- `caller`是返回一个对函数的引用，该函数调用了当前函数；
- `callee`是返回正在被执行的`function`函数，也就是所指定的`function`对象的正文

> 那么问题来了？如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？（使用`callee`完成）

```js
var result=[];
  function fn(n){  //典型的斐波那契数列
     if(n==1){
          return 1;
     }else if(n==2){
             return 1;
     }else{
          if(result[n]){
                  return result[n];
         }else{
                 // argument.callee()表示fn()
                 result[n]=arguments.callee(n-1)+arguments.callee(n-2);
                 return result[n];
         }
    }
 }
```



**caller**

> `caller`返回一个函数的引用，这个函数调用了当前的函数。

**使用这个属性要注意**

- 这个属性只有当函数在执行时才有用
- 如果在`javascript`程序中，函数是由顶层调用的，则返回`null`

> `functionName.caller: functionName`是当前正在执行的函数。

```js
function a() {
  console.log(a.caller)
}
```

**callee**

> `callee`放回正在执行的函数本身的引用，它是`arguments`的一个属性

> 使用callee时要注意:

- 这个属性只有在函数执行时才有效
- 它有一个`length`属性，可以用来获得形参的个数，因此可以用来比较形参和实参个数是否一致，即比较`arguments.length`是否等于`arguments.callee.length`
- 它可以用来递归匿名函数。

```js
function a() {
  console.log(arguments.callee)
}
```



# 57. window.onload和$(document).ready

> 原生`JS`的`window.onload`与`Jquery`的`$(document).ready(function(){})`有什么不同？如何用原生JS实现Jq的`ready`方法？

- `window.onload()`方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
- `$(document).ready()`是`DOM`结构绘制完毕后就执行，不必等到加载完毕

```js
function ready(fn){
      if(document.addEventListener) {        //标准浏览器
          document.addEventListener('DOMContentLoaded', function() {
              //注销事件, 避免反复触发
              document.removeEventListener('DOMContentLoaded',arguments.callee, false);
              fn();            //执行函数
          }, false);
      }else if(document.attachEvent) {        //IE
          document.attachEvent('onreadystatechange', function() {
             if(document.readyState == 'complete') {
                 document.detachEvent('onreadystatechange', arguments.callee);
                 fn();        //函数执行
             }
         });
     }
 };
```



# 58. addEventListener()和attachEvent()的区别

- `addEventListener()`是符合W3C规范的标准方法; `attachEvent()`是IE低版本的非标准方法
- `addEventListener()`支持事件冒泡和事件捕获; - 而`attachEvent()`只支持事件冒泡
- `addEventListener()`的第一个参数中,事件类型不需要添加`on`; `attachEvent()`需要添加`'on'`
- 如果为同一个元素绑定多个事件, `addEventListener()`会按照事件绑定的顺序依次执行, `attachEvent()`会按照事件绑定的顺序倒序执行



# 59. 数组去重

**方法一、利用ES6 Set去重（ES6中最常用）**

```js
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

**方法二、利用for嵌套for，然后splice去重（ES5中最常用）**

```js
function unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
	return arr;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
    //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
```

- 双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
- 想快速学习更多常用的`ES6`语法

**方法三、利用indexOf去重**

```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
```

> 新建一个空的结果数组，`for` 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则`push`进数组

**方法四、利用sort()**

```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return;
    }
    arr = arr.sort()
    var arrry= [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i]);
        }
    }
    return arrry;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
// [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      //NaN、{}没有去重
```

> 利用`sort()`排序方法，然后根据排序后的结果进行遍历及相邻元素比对

**方法五、利用对象的属性不能相同的特点进行去重**

```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var arrry= [];
     var  obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            arrry.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return arrry;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", 15, false, undefined, null, NaN, 0, "a", {…}]    //两个true直接去掉了，NaN和{}去重
```

**方法六、利用includes**

```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
    //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重
```

**方法七、利用hasOwnProperty**

```js
function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]   //所有的都去重了
```

> 利用`hasOwnProperty` 判断是否存在对象属性

**方法八、利用filter**

```js
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
```

**方法九、利用递归去重**

```js
function unique(arr) {
    var array= arr;
    var len = array.length;

	array.sort(function(a,b){   //排序后更加方便去重
		return a - b;
	})

	function loop(index){
        if(index >= 1){
            if(array[index] === array[index-1]){
            array.splice(index,1);
            }
            loop(index - 1);    //递归loop，然后数组去重
        }
	}
	loop(len-1);
	return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```

**方法十、利用Map数据结构去重**

```js
function arrayNonRepeatfy(arr) {
	let map = new Map();
		let array = new Array();  // 数组用于返回结果
		for (let i = 0; i < arr.length; i++) {
			if(map .has(arr[i])) {  // 如果有该key值
			map .set(arr[i], true);
		} else {
			map .set(arr[i], false);   // 如果没有该key值
			array .push(arr[i]);
		}
	}
	return array ;
}
 var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```

> 创建一个空`Map`数据结构，遍历需要去重的数组，把数组的每一个元素作为`key`存到`Map`中。由于`Map`中不会出现相同的`key`值，所以最终得到的就是去重后的结果

**方法十一、利用reduce+includes**

```js
function unique(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
```

**方法十二、[...new Set(arr)]**

```js
[...new Set(arr)]
//代码就是这么少----（其实，严格来说并不算是一种，相对于第一种方法来说只是简化了代码）
```



# 60. （设计题）想实现一个对页面某个节点的拖拽？如何做？（使用原生JS）

- 给需要拖拽的节点绑定`mousedown`, `mousemove`, `mouseup`事件
- `mousedown`事件触发后，开始拖拽
- `mousemove`时，需要通过`event.clientX`和`clientY`获取拖拽位置，并实时更新位置
- `mouseup`时，拖拽结束
- 需要注意浏览器边界的情况

~~~html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="keywords" content="拖拽">
        <meta name="description" content="拖拽">
        <title>实现拖拽</title>
        <style type="text/css">
            *{
                margin: 0px;
                padding: 0px;
            }
            #drag{
                width: 100px;
                height: 100px;
                background: red;
                position: absolute;
            }
        </style>
    </head>
    <body>
        <div id="drag"></div>
        <script type="text/javascript">
            var Drags = function (element, callback) {
                callback = callback || function () {};
                var params = {
                    top: 0,
                    left: 0,
                    currentX: 0,
                    currentY: 0,
                    flag: false
                };
                function getCss(element, key) {
                    return element.currentStyle ? element.currentStyle[key] : document.defaultView.getComputedStyle(element,null)[key];
                    // ie用currentStyle
                }
                var lefts = getCss(element, "left"),
                    tops = getCss(element, "top");
                params.left = lefts !== "auto" ? lefts : 0;
                params.top = tops !== "auto" ? tops : 0;
                element.onmousedown = function (event) {
                    params.flag = true;
                    event = event || window.event; // ie用后面
                    params.currentX = event.clientX;
                    params.currentY = event.clientY;
                };
                document.onmousemove = function (event) {
                    event = event || window.event;
                    if (params.flag) {
                        // 现在位置
                        var nowX = event.clientX,
                            nowY = event.clientY,
                        // 需要移动的距离  
                            disX = nowX - params.currentX,
                            disY = nowY - params.currentY;
                        element.style.left = parseInt(params.left) + disX + "px";
                        element.style.top = parseInt(params.top) + disY + "px";
                    }
                };
                document.onmouseup = function () {
                    params.flag = false;
                    var lefts = getCss(element, "left"),
                        tops = getCss(element, "top");
                    params.left = lefts !== "auto" ? lefts : 0;
                    params.top = tops !== "auto" ? tops : 0;
                }
            }(document.getElementById('drag'));
        </script>
    </body>
</html>
~~~



# 61. JavaScript 全局函数和全局变量

**全局变量**

- `Infinity` 代表正的无穷大的数值。
- `NaN` 指示某个值是不是数字值。
- `undefined` 指示未定义的值。

**全局函数**

- `decodeURI()` 解码某个编码的 `URI`。
- `decodeURIComponent()` 解码一个编码的 `URI` 组件。
- `encodeURI()` 把字符串编码为 URI。
- `encodeURIComponent()` 把字符串编码为 `URI` 组件。
- `escape()` 对字符串进行编码。
- `eval()` 计算 `JavaScript` 字符串，并把它作为脚本代码来执行。
- `isFinite()` 检查某个值是否为有穷大的数。
- `isNaN()` 检查某个值是否是数字。
- `Number()` 把对象的值转换为数字。
- `parseFloat()` 解析一个字符串并返回一个浮点数。
- `parseInt()` 解析一个字符串并返回一个整数。
- `String()` 把对象的值转换为字符串。
- `unescape()` 对由`escape()` 编码的字符串进行解码



# 62. 使用js实现一个持续的动画效果

**定时器思路**

```js
var e = document.getElementById('e')
var flag = true;
var left = 0;
setInterval(() => {
    left == 0 ? flag = true : left == 100 ? flag = false : ''
    flag ? e.style.left = ` ${left++}px` : e.style.left = ` ${left--}px`
}, 1000 / 60)
```

**requestAnimationFrame**

```js
//兼容性处理
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           function(callback){
                window.setTimeout(callback, 1000 / 60);
           };
})();

var e = document.getElementById("e");
var flag = true;
var left = 0;

function render() {
    left == 0 ? flag = true : left == 100 ? flag = false : '';
    flag ? e.style.left = ` ${left++}px` :
        e.style.left = ` ${left--}px`;
}

(function animloop() {
    render();
    requestAnimFrame(animloop);
})();
```

**使用css实现一个持续的动画效果**

```css
animation:mymove 5s infinite;

@keyframes mymove {
    from {top:0px;}
    to {top:200px;}
}
```

- `animation-name` 规定需要绑定到选择器的 `keyframe`名称。
- `animation-duration` 规定完成动画所花费的时间，以秒或毫秒计。
- `animation-timing-function` 规定动画的速度曲线。
- `animation-delay` 规定在动画开始之前的延迟。
- `animation-iteration-count` 规定动画应该播放的次数。
- `animation-direction` 规定是否应该轮流反向播放动画



# 63. 封装一个函数，参数是定时器的时间，.then执行回调函数

```js
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
```



# 64. 怎么判断两个对象相等？

```js
obj={
    a:1,
    b:2
}
obj2={
    a:1,
    b:2
}
obj3={
    a:1,
    b:'2'
}
```

> 可以转换为字符串来判断

```js
JSON.stringify(obj)==JSON.stringify(obj2);//true
JSON.stringify(obj)==JSON.stringify(obj3);//false
```



# 65. 防抖/节流

**防抖**

> 在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作。可以通过函数防抖动来实现

```js
// 使用 underscore 的源码来解释防抖动

/**
 * underscore 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      // 现在和上一次时间戳比较
      var last = _.now() - timestamp;
      // 如果当前间隔时间少于设定时间且大于0就重新设置定时器
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        // 否则的话就是时间到了执行回调函数
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      // 获得时间戳
      timestamp = _.now();
      // 如果定时器不存在且立即执行函数
      var callNow = immediate && !timeout;
      // 如果定时器不存在就创建一个
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        // 如果需要立即执行函数的话 通过 apply 执行
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };
```

> 整体函数实现

对于按钮防点击来说的实现

- 开始一个定时器，只要我定时器还在，不管你怎么点击都不会执行回调函数。一旦定时器结束并设置为 null，就可以再次点击了
- 对于延时执行函数来说的实现：每次调用防抖动函数都会判断本次调用和之前的时间间隔，如果小于需要的时间间隔，就会重新创建一个定时器，并且定时器的延时为设定时间减去之前的时间间隔。一旦时间到了，就会执行相应的回调函数

**节流**

> 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

- 函数节流(`throttle`)是指阻止一个函数在很短时间间隔内连续调用。 只有当上一次函数执行后达到规定的时间间隔，才能进行下一次调用。 但要保证一个累计最小调用间隔（否则拖拽类的节流都将无连续效果）
- 函数节流用于 `onresize`, `onscroll` 等短时间内会多次触发的事件
- 函数节流的原理：使用定时器做时间节流。 当触发一个事件时，先用 `setTimout` 让这个事件延迟一小段时间再执行。 如果在这个时间间隔内又触发了事件，就 `clearTimeout` 原来的定时器， 再 `setTimeout` 一个新的定时器重复以上流程。

```javascript
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```



# 66. 谈谈变量提升？

> 当执行 JS 代码时，会生成执行环境，只要代码不是写在函数中的，就是在全局执行环境中，函数中的代码会产生函数执行环境，只此两种执行环境

- 接下来让我们看一个老生常谈的例子，`var`

```js
b() // call b
console.log(a) // undefined

var a = 'Hello world'

function b() {
    console.log('call b')
}
```

> 变量提升
>
> 这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行环境时，会有两个阶段。第一个阶段是创建的阶段，JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 `undefined`，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```js
b() // call b second

function b() {
    console.log('call b fist')
}
function b() {
    console.log('call b second')
}
var b = 'Hello world'
```

> 复制代码`var` 会产生很多错误，所以在 `ES6`中引入了 `let`。`let` 不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let` 提升了，在第一阶段内存也已经为他开辟好了空间，但是因为这个声明的特性导致了并不能在声明前使用



# 67. 什么是单线程，和异步的关系

- 单线程 - 只有一个线程，只能做一件事
- 原因 - 避免 `DOM` 渲染的冲突
  - 浏览器需要渲染 `DOM`
  - `JS` 可以修改 `DOM` 结构
  - `JS` 执行的时候，浏览器 `DOM` 渲染会暂停
  - 两段 JS 也不能同时执行（都修改 `DOM` 就冲突了）
  - `webworker` 支持多线程，但是不能访问 `DOM`
- 解决方案 - 异步



# 68. 实现Storage，使得该对象为单例，并对`localStorage`进行封装设置值setItem(key,value)和getItem(key)

```js
var instance = null;
class Storage {
  static getInstance() {
    if (!instance) {
      instance = new Storage();
    }
    return instance;
  }
  setItem = (key, value) => localStorage.setItem(key, value),
  getItem = key => localStorage.getItem(key)
}
```



# 69. 说说`event loop`

> 首先，`js`是单线程的，主要的任务是处理用户的交互，而用户的交互无非就是响应`DOM`的增删改，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被`push`进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步`HTTP`请求线程满足特定条件下的回调函数`push`到事件队列中，等待`js`引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务`microtask（promise）`，如果有那就优先执行微任务，如果没有，在去查找宏任务`macrotask（setTimeout、setInterval）`进行执行

> 众所周知 `JS` 是门非阻塞单线程语言，因为在最初 `JS` 就是为了和浏览器交互而诞生的。如果 `JS` 是门多线程的语言话，我们在多个线程中处理 `DOM` 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点）

- `JS` 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 `Task`（有多种 `task`） 队列中。一旦执行栈为空，`Event` `Loop` 就会从 `Task` 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 `JS` 中的异步还是同步行为

![img](https://poetries1.gitee.io/img-repo/2020/09/101.png)

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

console.log('script end');
```

> 不同的任务源会被分配到不同的 `Task` 队列中，任务源可以分为 微任务（`microtask`） 和 宏任务（`macrotask`）。在 `ES6` 规范中，`microtask` 称为 `jobs`，`macrotask` 称为 `task`

```javascript
console.log('1');

setTimeout(function() {
  console.log('2');
}, 0);

new Promise((resolve) => {
    console.log('3')
    resolve()
}).then(function() {
  console.log('4');
  process.nextTick(function(){
    console.log('5')
  })
}).then(function() {
  console.log('6');
});

console.log('7');

// 1 => 3 => 7 => 4 => 6 => 2 =>5
```

> 以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务

**微任务**

- `process.nextTick`
- `promise`
- `Object.observe`
- `MutationObserver`

**宏任务**

- `script`
- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`
- `UI rendering`

> 宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

**所以正确的一次 Event loop 顺序是这样的**

- 执行同步代码，这属于宏任务
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 UI
- 然后开始下一轮 `Event loop`，执行宏任务中的异步代码

> 通过上述的 `Event loop` 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 `DOM` 的话，为了更快的响应界面响应，我们可以把操作 `DOM` 放入微任务中



# 70. 说说事件流

**事件流分为两种，捕获事件流和冒泡事件流**

- 捕获事件流从根节点开始执行，一直往子节点查找执行，直到查找执行到目标节点
- 冒泡事件流从目标节点开始执行，一直往父节点冒泡查找执行，直到查到到根节点

> 事件流分为三个阶段，一个是捕获节点，一个是处于目标节点阶段，一个是冒泡阶段



# 71. JavaScript 对象生命周期的理解

- 当创建一个对象时，`JavaScript` 会自动为该对象分配适当的内存
- 垃圾回收器定期扫描对象，并计算引用了该对象的其他对象的数量
- 如果被引用数量为 `0`，或惟一引用是循环的，那么该对象的内存即可回收



# 72.  现在要你完成一个Dialog组件，说说你设计的思路？它应该有什么功能？

- 该组件需要提供`hook`指定渲染位置，默认渲染在body下面。
- 然后改组件可以指定外层样式，如宽度等
- 组件外层还需要一层`mask`来遮住底层内容，点击`mask`可以执行传进来的`onCancel`函数关闭`Dialog`。
- 另外组件是可控的，需要外层传入`visible`表示是否可见。
- 然后`Dialog`可能需要自定义头head和底部`footer`，默认有头部和底部，底部有一个确认按钮和取消按钮，确认按钮会执行外部传进来的`onOk`事件，然后取消按钮会执行外部传进来的`onCancel`事件。
- 当组件的`visible`为`true`时候，设置`body`的`overflow`为`hidden`，隐藏`body`的滚动条，反之显示滚动条。
- 组件高度可能大于页面高度，组件内部需要滚动条。
- 只有组件的`visible`有变化且为`ture`时候，才重渲染组件内的所有内容



# 73. ajax、axios、fetch区别

- ajax (16. Ajax原理)

- **axios**

  ```js
  axios({
      method: 'post',
      url: '/user/12345',
      data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
      }
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  ```

  优缺点：

  - 从浏览器中创建 `XMLHttpRequest`
  - 从 `node.js` 发出 `http` 请求
  - 支持 `Promise API`
  - 拦截请求和响应
  - 转换请求和响应数据
  - 取消请求
  - 自动转换`JSON`数据
  - 客户端支持防止`CSRF/XSRF`

  **fetch**

  ```js
  try {
    let response = await fetch(url);
    let data = response.json();
    console.log(data);
  } catch(e) {
    console.log("Oops, error", e);
  
  }
  
  ```
```
  
优缺点：
  
  - `fetch`只对网络请求报错，对`400`，`500`都当做成功的请求，需要封装去处理
  - `fetch`默认不会带`cookie`，需要添加配置项
  - `fetch`不支持`abort`，不支持超时控制，使用`setTimeout`及`Promise.reject`的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
  - `fetch`没有办法原生监测请求的进度，而XHR可以



# 74. JavaScript的组成

- `JavaScript` 由以下三部分组成：
  - `ECMAScript（核心` ：`JavaScript` 语言基础
  - `DOM`（文档对象模型）：规定了访问`HTML`和`XML`的接口
  - `BOM`（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法



# 75. 检测浏览器版本版本有哪些方式？

- 根据 `navigator.userAgent` `UA.toLowerCase().indexOf('chrome')`
- 根据 `window` 对象的成员 `'ActiveXObject' in window`



# 76. 说几条写JavaScript的基本规范

- 代码缩进，建议使用“四个空格”缩进
- 代码段使用花括号`{}`包裹
- 语句结束使用分号;
- 变量和函数在使用前进行声明
- 以大写字母开头命名构造函数，全大写命名常量
- 规范定义`JSON`对象，补全双引号
- 用`{}`和`[]`声明对象和数组



# 77. script 的位置是否会影响首屏显示时间

- 在解析 `HTML` 生成 `DOM` 过程中，`js` 文件的下载是并行的，不需要 `DOM` 处理到 `script` 节点。因此，`script`的位置不影响首屏显示的开始时间。
- 浏览器解析 `HTML` 是自上而下的线性过程，`script`作为 `HTML` 的一部分同样遵循这个原则
- 因此，`script` 会延迟 `DomContentLoad`，只显示其上部分首屏内容，从而影响首屏显示的完成时间



# 78. 介绍 DOM 的发展

- `DOM`：文档对象模型（`Document Object Model`），定义了访问HTML和XML文档的标准，与编程语言及平台无关
- `DOM0`：提供了查询和操作Web文档的内容API。未形成标准，实现混乱。如：`document.forms['login']`
- `DOM1`：W3C提出标准化的DOM，简化了对文档中任意部分的访问和操作。如：`JavaScript中的Document`对象
- `DOM2`：原来DOM基础上扩充了鼠标事件等细分模块，增加了对CSS的支持。如：`getComputedStyle(elem, pseudo)`
- `DOM3`：增加了XPath模块和加载与保存（`Load and Save`）模块。如：`XPathEvaluator`

**介绍DOM0，DOM2，DOM3事件处理方式区别**

- DOM0级事件处理方式：
  - `btn.onclick = func;`
  - `btn.onclick = null;`
- DOM2级事件处理方式：
  - `btn.addEventListener('click', func, false);`              `true` 捕获阶段执行，`false` 冒泡阶段执行
  - `btn.removeEventListener('click', func, false);`
  - `btn.attachEvent("onclick", func);`
  - `btn.detachEvent("onclick", func);`
- DOM3级事件处理方式：
  - `eventUtil.addListener(input, "textInput", func);`
  - `eventUtil` 是自定义对象，`textInput` 是DOM3级事件

**事件的三个阶段**

- 捕获、目标、冒泡



# 79. 介绍事件“捕获”和“冒泡”执行顺序和事件的执行次数

- 按照W3C标准的事件：首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段
- 事件执行次数（DOM2-addEventListener）：元素上绑定事件的个数
  - 注意1：前提是事件被确实触发
  - 注意2：事件绑定几次就算几个事件，即使类型和功能完全一样也不会“覆盖”
- 事件执行顺序：判断的关键是否目标元素
  - 非目标元素：根据W3C的标准执行：捕获->目标元素->冒泡（不依据事件绑定顺序）
  - 目标元素：依据事件绑定顺序：先绑定的事件先执行（不依据捕获冒泡标准）
  - 最终顺序：父元素捕获->目标元素事件1->目标元素事件2->子元素捕获->子元素冒泡->父元素冒泡
  - 注意：子元素事件执行前提 事件确实“落”到子元素布局区域上，而不是简单的具有嵌套关系

**在一个DOM上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获？**

- 该DOM上的事件如果被触发，会执行两次（执行次数等于绑定次数）
- 如果该DOM是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获
- 如果该DOM是处于事件流中的非目标元素，则先执行捕获，后执行冒泡

**事件的代理/委托**

- 事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件
  - 优点：
    - 可以减少事件注册，节省大量内存占用
    - 可以将事件应用于动态添加的子元素上
  - 缺点： 使用不当会造成事件在不应该触发时触发
  - 示例：

​```text
ulEl.addEventListener('click', function(e){
    var target = event.target || event.srcElement;
    if(!!target && target.nodeName.toUpperCase() === "LI"){
        console.log(target.innerHTML);
    }
}, false);
```

**W3C事件的 target 与 currentTarget 的区别？**

- `target` 只会出现在事件流的目标阶段
- `currentTarget` 可能出现在事件流的任何阶段
- 当事件流处在目标阶段时，二者的指向相同
- 当事件流处于捕获或冒泡阶段时：`currentTarget` 指向当前事件活动的对象(一般为父级)

**如何派发事件(dispatchEvent)？（如何进行事件广播？）**

- W3C: 使用 `dispatchEvent` 方法
- IE: 使用 `fireEvent` 方法

```js
var fireEvent = function(element, event){z
    if (document.createEventObject){
        var mockEvent = document.createEventObject();
        return element.fireEvent('on' + event, mockEvent)
    }else{
        var mockEvent = document.createEvent('HTMLEvents');
        mockEvent.initEvent(event, true, true);
        return !element.dispatchEvent(mockEvent);
    }
}
```



# 80. 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”

- 客户区坐标：鼠标指针在可视区中的水平坐标(`clientX`)和垂直坐标(`clientY`)
- 页面坐标：鼠标指针在页面布局中的水平坐标(`pageX`)和垂直坐标(`pageY`)
- 屏幕坐标：设备物理屏幕的水平坐标(`screenX`)和垂直坐标(`screenY`)

**如何获得一个DOM元素的绝对位置？**

- `elem.offsetLef`t：返回元素相对于其定位父级左侧的距离
- `elem.offsetTop`：返回元素相对于其定位父级顶部的距离
- `elem.getBoundingClientRect()`：返回一个`DOMRect`对象，包含一组描述边框的只读属性，单位像素



# 81. Javascript垃圾回收方法

- 标记清除（mark and sweep）

> - 这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”
> - 垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

**引用计数(reference counting)**

> 在低版本IE中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为0的值占用的空间



# 82. 请解释一下 JavaScript 的同源策略

- 概念:同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议
- 指一段脚本只能读取来自同一来源的窗口和文档的属性

**为什么要有同源限制？**

- 我们举例说明：比如一个黑客程序，他利用Iframe把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过Javascript读取到你的表单中input中的内容，这样用户名，密码就轻松到手了。
- 缺点
  - 现在网站的JS都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节



# 83. 如何删除一个cookie

- 将时间设为当前时间往前一点

```js
var date = new Date();

date.setDate(date.getDate() - 1);//真正的删除
```

> `setDate()`方法用于设置一个月的某一天

- `expires`的设置

```js
document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)
```



# 84. 页面编码和被请求的资源编码如果不一致如何处理

- 后端响应头设置 `charset`
- 前端页面`<meta>`设置 `charset`



# 85. 把`<script>`放在`</body>`之前和之后有什么区别？浏览器会如何解析它们？

- 按照HTML标准，在`</body>`结束后出现`<script>`或任何元素的开始标签，都是解析错误
- 虽然不符合HTML标准，但浏览器会自动容错，使实际效果与写在`</body>`之前没有区别
- 浏览器的容错机制会忽略`<script>`之前的`</body>`，视作`<script>`仍在 body 体内。省略`</body>`和`</html>`闭合标签符合HTML标准，服务器可以利用这一标准尽可能少输出内容



# 86. JavaScript 中，调用函数有哪几种方式

- 方法调用模式 `Foo.foo(arg1, arg2);`
- 函数调用模式 `foo(arg1, arg2);`
- 构造器调用模式 `(new Foo())(arg1, arg2);`
- `call/applay`调用模式 `Foo.foo.call(that, arg1, arg2);`
- `bind`调用模式 `Foo.foo.bind(that)(arg1, arg2)();`



# 87. 简单实现 Function.bind 函数

```js
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(that) {
      var func = this, args = arguments;
      return function() {
        return func.apply(that, Array.prototype.slice.call(args, 1));
      }
    }
  }
  // 只支持 bind 阶段的默认参数：
  func.bind(that, arg1, arg2)();

  // 不支持以下调用阶段传入的参数：
  func.bind(that)(arg1, arg2);
```



# 88. 列举一下JavaScript数组和对象有哪些原生方法？

- `arr.concat(arr1, arr2, arrn);`
- `arr.join(",");`
- `arr.sort(func);`
- `arr.pop();`
- `arr.push(e1, e2, en);`
- `arr.shift();`
- `unshift(e1, e2, en);`
- `arr.reverse();`
- `arr.slice(start, end);`
- `arr.splice(index, count, e1, e2, en);`
- `arr.indexOf(el);`
- `arr.includes(el);` // ES6

**对象：**

- `object.hasOwnProperty(prop);`
- `object.propertyIsEnumerable(prop);`
- `object.valueOf();`
- `object.toString();`
- `object.toLocaleString();`
- `Class.prototype.isPropertyOf(object);`



# 89. Array.slice() 与 Array.splice() 的区别？

**`slice`**

> “读取”数组指定的元素，不会对原数组进行修改

- 语法：`arr.slice(start, end)`
- `start` 指定选取开始位置（含）
- `end` 指定选取结束位置（不含）

**`splice`**

- “操作”数组指定的元素，会修改原数组，返回被删除的元素
- 语法：`arr.splice(index, count, [insert Elements])`
- `index` 是操作的起始位置
- `count = 0` 插入元素，`count > 0` 删除元素
- `[insert Elements]` 向数组新插入的元素



# 90. WEB应用从服务器主动推送Data到客户端有那些方式

- `AJAX` 轮询
- `html5` 服务器推送事件 `(new EventSource(SERVER_URL)).addEventListener("message", func);`
- html5 Websocket

- `(new WebSocket(SERVER_URL)).addEventListener("message", func);`



# 91. 有四个操作会忽略enumerable为false的属性

- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。



# 92. 属性的遍历

> ES6 一共有 5 种方法可以遍历对象的属性。

**（1）for...in**

> `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

> `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

> `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

> `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

> `Reflect.ownKeys`返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

> 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```text
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

> 上面代码中，`Reflect.ownKeys`方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 `Symbol` 属性。



# 93. 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

- 能够完成整个 `HTTP` 请求+响应（尽管不需要响应内容）
- 触发 `GET` 请求之后不需要获取和处理数据、服务器也不需要发送数据
- 跨域友好
- 执行过程无阻塞
- 相比 `XMLHttpRequest` 对象发送 `GET` 请求，性能上更好
- GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）



# 94. 在输入框中如何判断输入的是一个正确的网址

```js
function isUrl(url) {
       try {
           new URL(url);
           return true;
       }catch(err){
     return false;
}}
```



# 95. Symbol() 数据类型深入理解

`Symbol` 是一种原始数据类型，其创建之后会在栈内存中存在，并不会向引用值数据类型在堆内存中存在。其存在就是为了确保对象属性唯一，不会存在属性冲突。

- **基本用法**

  - `Symbol`

  ```js
  let s1 = Symbol()
  let s2 = Symbol()
  console.log(s1 === s2)   // false
  
  let s3 = Symbol("2022")
  let s4 = Symbol("2022")
  console.log(s3 === s4)   // false
  ```

  - `Symbol.for()`

  ```js
  let s1 = Symbol.for("2022")
  let s2 = Symbol.for("2022")
  console.log(s1 === s2)   // true
  ```

  `Symbol()` 中，当创建一个实例，无论传给 `Symbol` 的值是否相同,都会在内存中新建一个 `Symbol` 实例。`Symbol.for()` 中，当实例化一个对象，这个对象就会在Window中存在，也就类似于全局变量，此时就会从全局中找是否存在 `Symbol.for()` 相同的实例，如果存在，就返回原来值，如果不存在就新开辟一个内存空间。所以 `Symbol.for()` 为 `true`。

  

  - `Symbol.keyfor()` 取出 `Symbol.for()` 中的 `key` 值 ; `Symbol().description` 会返回 `Symbol()` 中的 `key`

  ```js
  let s1 = Symbol.for("name")
  let key = Symbol.keyfor(s1)
  console.log(key)    // name
  
  let s2 = Symbol("name2")
  let key2 = s2.description
  console.log(key2)   // name2
  ```

  

- **`Symbol()` 遍历**

  在遍历中我们使用的是 `for-in` 和 `for-of`

  `for–in`：遍历的是键，对于 `Array` 来说，`for–in` 遍历的是数组下标
  `for–of`：遍历的是值，当使用对象时，必须使用 `Object.keys()` , `Object.values()`

  ```js
  let s1 = Symbol("我是2021");
  let obj = {
  	name:"2021",
  	[s1]:"I am winner",
  }
  for(const x in obj){
  	console.log(x);
  }  //name
  
  //使用getOwnPropertySymbols(),只获取Symbol的key
  for (const x of Object.getOwnPropertySymbols(obj)){
  	console.log(x);
  }  //Symbol("我是2021");
  
  //使用getOwnPropertyNames，不能获取Symbol的key
  for (const x of Object.getOwnPropertyNames(obj)){
  	console.log(x);
  }  //name
  
  //使用Reflect.ownKeys，Symbol的key和正常key都可以获取
  for (const x of Reflect.ownKeys(obj)){
  	console.log(x);
  }  //name，Symbol("我是2021");
  
  ```



- `Symbol` 运用场景

  - 使用 `Symbol` 来作为对象属性名

  `Symbol`可以用于对象属性的定义和访问

  ```js
  
  const PERSON_NAME = Symbol();
  const PERSON_AGE = Symbol();
   
  let person = {
      [PERSON_NAME]: "随笔川迹"
  }
   
  person[PERSON_AGE] =  20;
   
  console.log(person[PERSON_NAME])  // 随笔川迹
  console.log(person[PERSON_AGE])   // 20
  ```

  - 使用 `Symbol` 定义类的私有属性/方法

  ```js
  let size = Symbol('size');  // 声明定义了一个size变量,类型是Symbol(),类型描述内容是size
   
  class Collection {          // class关键字定义了一个Collection类
    constructor() {           // 构造器`constructor`函数
      this[size] = 0;         // 在当前类上私有化了一个size属性
    }
   
    add(item) {              // Collection类下的一个方法
      this[this[size]] = item;
      this[size]++;
    }
   
    static sizeOf(instance) { // 静态属性
      return instance[size];
    }
  }
   
  let x = new Collection(); // 实例化x对象
  Collection.sizeOf(x) // 0
   
  x.add('foo');       // 调用方法
  Collection.sizeOf(x) // 1
   
  Object.keys(x) // ['0']
  Object.getOwnPropertyNames(x) // ['0']
  Object.getOwnPropertySymbols(x) // [Symbol(size)]
  ```

  - 模块化机制

  结合`Symbol`与模块化机制,类的私有属性和方法完美实现

  ```js
  // 在文件a.js中
  const PASSWORD = Symbol();  // 定义一个PASSWORD变量,类型是Symbol
   
  class Login() {      // class关键字声明一个Login类
    constructor(username, password) {    // 构造器函数内初始化属性
      this.username = username;
      this[PASSWORD] = password;
    }
   
    checkPassword(pwd) {
      return this[PASSWORD] === pwd;
    }
   
  }
  export default Login;
  ```

  ```js
  // 在文件b.js中
  import Login from './a'
   
  const login = new Login('itclanCoder', '123456'); // 实例化一个login对象
   
  login.checkPassword('123456'); // true
  login.PASSWORD;  // 访问不到
  login[PASSWORD]; // 访问不到
  login['PASSWORD'] // 访问不到
  ```

  - 使用 `Symbol` 替代常量

  在`Redux`中很常见,将`action`对象中的`type`值,给抽离出来,定义一个常量存储,来代表一种业务逻辑,通常希望这些常量是唯一的

  ```js
  const CHANGE_INPUT_VALUE = Symbol()
  const ADD_INPUT_CONTENT = Symbol();
  const DELETE_LIST = Symbol()
   
  function reducer(state, action) {
      const newState =  JSON.parse(JSON.stringify(state));
      switch(action.type) {
          case CHANGE_INPUT_VALUE:
               // ...
          case ADD_INPUT_CONTENT:
               // ...
          case DELETE_LIST;
                // ...
          default:
               return state;
      }
  }
  ```



- **注意事项**

  - `Symbol` 值不能与其他类型的值进行运算-会报错

  ```js
  let symItclan = Symbol('itclan');
   
  console.log("主站" + symItclan)
  console.log(`主站 ${symItclan}`) // Uncaught TypeError: Cannot convert a Symbol value to a string 报错
  ```

  

  - `Symbol` 可以转换为字符串

  ```js
  let SyItclanCoder = Symbol('https://coder.itclan.cn');
   
  console.log(String(SyItclanCoder)) // Symbol(https://coder.itclan.cn)
  console.log(SyItclanCoder.toString()) // Symbol(https://coder.itclan.cn)
  ```

  

  - `Symbol`值可以转为布尔值,但是不能转为数值

  ```js
  let sym = Symbol();
  console.log(Boolean(sym)) // true
  console.log(!sym)  // false
   
  if (sym) {
    // ...
  }
   
  Number(sym) // TypeError  Cannot convert a Symbol value to a number
  sym + 2 // TypeError
  ```

  

  - `Symbol`函数不能使用`new`命令

  `Symbol`函数前不能使用`new`命令,否则就会报错,`Symbol`是一个原始类型的值,不是对象,它是类似字符串的数据类型

  

  - `Symbol值`作为对象属性名时，不能用点运算符

  ```js
  const username = Symbol();
  const person = {};
  person.username = '随笔川迹';
  person[username]; // undefined
  person['username']; // 随笔川迹
  ```

  如果变量 `username` 不放在中括号中,该属性的键名就是字符串,而不是定义`Symbol`类型值

