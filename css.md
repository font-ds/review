# 1. BFC

## BFC是什么

文档流三种方式： 1. 普通流     2. 定位流    3. 浮动流

block formatting context      块级元素格式化上下文 (被隔离的区间：BFC的子元素不会对外边的元素产生影响)

BFC元素：

	1. body
	1. float：left | right
	1. overflow：hidden | scroll | auto ；   不是visible
	1. display：inline-block | table-cell | table-caption | flex | grid
	1. position：absolute | fixed   非 relative

一个BFC区域，只包含其所有子元素，不包含子元素的子元素。

BFC有一个特点是：**每一个BFC区域都是相互独立，互不影响的。**

## 利用BFC解决问题

### **解决外边距的塌陷问题(垂直塌陷)**

开发中，前端的布局手段，离不开外边距margin，那么，也会遇到一些问题，例如外边距的垂直塌陷问题。

![BFC03](http://www.itcast.cn/files/image/202010/20201016160023317.jpg)

通过以上的实例，我们会发现，代码给两个div盒子，都添加了四个方向的margin，讲道理，学过数学的都知道，100+100=200.可是，盒子之间的距离，现在却之后100px。这就是很典型的margin的塌陷，两段margin重叠到了一块，互相影响。那么，如何利用BFC，让这个问题得到解决呢。回忆下，上文说过，BFC，就是一个与世隔绝的独立区域，不会互相影响，那么，我们可以将这两个盒子，放到两个BFC区域中，即可解决这个问题。

![BFC04](http://www.itcast.cn/files/image/202010/20201016160053011.gif)

### **利用BFC解决包含塌陷**

当父子关系的盒子，给子元素添加margin-top，有可能会把父元素一起带跑。

![BFC05](http://www.itcast.cn/files/image/202010/20201016162038423.jpg)

原本，正确的显示方式，应该是粉色盒子与红色盒子的顶部距离为50px，但是由于margin的塌陷问题，导致盒子内部的布局影响到了外部。这个时候，就可以触发BFC，将父盒子变成一个独立的区域，这样在BFC区域内部的任何操作，都不会影响到外部。

![BFC06](http://www.itcast.cn/files/image/202010/20201016162111734.gif)

### **当浮动产生影响的时候，可以利用BFC来清除浮动的影响**

![BFC07](http://www.itcast.cn/files/image/202010/20201016162155258.jpg)

以上代码表示，一个没有设置高度的父盒子，包含着七个子元素。如果此时，所有的子元素都浮动的话

![BFC08](http://www.itcast.cn/files/image/202010/20201016162222822.gif)

当所有的子元素都浮动了，这个时候，父盒子失去了原有的高度，这就是浮动的影响。这个时候，同样也可用BFC的机制，来清除浮动带来的影响。使用BFC，将所有的浮动元素包裹起来。

![BFC09](http://www.itcast.cn/files/image/202010/20201016162302990.gif)

### **BFC可以阻止标准流元素被浮动元素覆盖**

![BFC10](http://www.itcast.cn/files/image/202010/20201016162336022.jpg)

以上情况，红色盒子浮动，蓝色盒子是标准流，默认情况下，浮动元素覆盖了标准流元素。但是，如果将蓝色盒子的BFC触发，那么情况将有所变化。

![BFC10](http://www.itcast.cn/files/image/202010/20201016162411159.gif)

当蓝色盒子触发了BFC之后，浮动元素再也不能覆盖它了，而且还能利用这个特性，来实现蓝色盒子宽度根据红色盒子的宽度来做自动适应



# 2. IFC

FC IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC 的 line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)

IFC一般有什么用呢？

水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。



# 3. 实现边框宽度0.5px

## 单边框

~~~css
// 方法一 ： border + border-image + linear-gradint
.border{
	width:200px;
	height:200px;
    background-color:red;
    margin:0 auto;
    border-bottom: 1px solid transparent;
    border-image:linear-gradient(to bottom,transparent 50%,Green 50%) 0 0 100% 0;
}


// 方法二：伪元素 + background-image
.border{
    width:200px;
	height:200px;
    background-color:red;
    margin:0 auto;
    position:relative;
}
.border::before{
    content:'';
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    border-image:linear-gradient(to bottom,transparent 50%,Green 50%);
}


// 方法三：定位 + 伪元素 + transfrom缩放(scale)
.border{
    width:200px;
    height:200px;
    background-color:red;
    margin:0 auto;
    position:relative;
}
.border::after{
    content:'';
    position:absolute;
    left:0;
    bottom:0px;
    width:100%;
    height:1px;
    background:blue;
    transform:scaleY(0.5);
}
~~~

## 多边框

~~~css
// 定位 + 伪元素 + transform缩放(scale)
.border{
    width:200px;
    height:200px;
    background-color:red;
    margin:0 auto;
    position:relative
}
.border::before{
    content:'';
    position:absolute;
    top:-50%;
    left:-50%;
    width:200%;
    height:200%;
    border:1px solid blue;
    transform:scale(0.5)
}
~~~

# 4.  实现半圆形

~~~js
// css
width:100px;
height:50px;
border-radius:50px 50px 0 0;
background-color:red
~~~

# 5. CSS盒模型

> - 有两种， `IE`盒子模型、`W3C`盒子模型；
> - 盒模型： 内容(content)、填充(`padding`)、边界(`margin`)、 边框(`border`)；
> - 区 别： `IE`的c`ontent`部分把 `border` 和 `padding`计算了进去;

- 标准盒模型

  - 元素宽度 = `width + padding + border + margin`
  
  ![image-20220314161003029](C:\Users\HUAWEI\AppData\Roaming\Typora\typora-user-images\image-20220314161003029.png)
  
- 怪异盒模块（IE盒模型）

  - 元素宽度 = `width + margin`

  ![image-20220314161022052](C:\Users\HUAWEI\AppData\Roaming\Typora\typora-user-images\image-20220314161022052.png)

  

- flex弹性伸缩盒模型

  - 主轴
  - 交叉轴

- 多列布局盒模型（columns，基本不用）



**box-sizing 常用的属性有哪些？分别有什么作用**

- `box-sizing: content-box;` 默认的标准(W3C)盒模型元素效果
- `box-sizing: border-box;` 触发怪异(IE)盒模型元素的效果
- `box-sizing: inherit;` 继承父元素 `box-sizing` 属性的值



# 6. line-height 和 height 区别

1. height就是元素的高度值，是一个死值，就是这个盒子的高度

2. line-height是行高，是每一行文字的高，如果文字换行则整个盒子高度会增大（行数*行高）



# 7. CSS的选择符

## css选择符

	1. 通配（*）
	2. 选择器（#）
	3. 类选择器（.）
	4. 标签选择器（div、p、h1...）
	5. 相邻选择器（+）
	6. 后代选择器（空格）
	7. 子元素选择器（>）
	8. 属性选择器（a[href]）

## css属性哪些可以继承

​		文字系列：font-size、color、line-height、text-align、opacity ......                 

**不可继承**：border、padding、margin ......

[CSS有哪些继承元素](# 54. CSS有哪些继承属性)



# 8. CSS优先级算法

优先级比较：!important > 内联样式 > id > class > 标签 > 通配

## css权重计算

1. !important —— 最高权值

2. 内联样式 style —— 权重值：1000

2. ID选择器 —— 权重值：100

2. Class选择器 —— 权重值：10

2. HTML标签选择器&伪元素 —— 权重值：1

2. 通配符选择器 —— 权重值：0

   

# 9. 盒子水平垂直居中

这种需求在我之前的项目中十分常见，随着flex兴起，后来看blog发现这种方式也十分好

```shell
//1、定位
body{
  position:relative
}
 // 有固定高度的是用margin
.box{
  width:100px;
  height:100px;
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-50px;
  margin-right:-50%;
}
 //无固定高度用transform
.box{
  translateX:-50%;
  translateY:-50%;
}

//2、flex
body{
  display:flex;
  justify-content:center;
  align-item:center
}

//table本身控制文本；要求父级有固定宽高
body{
  width:500px;
  height:500px;
  display:table-ceil;
  vertical-align:center;
  text-align:center;
}
.box{
  display:inline-block;
}


```



# 10. CSS画三角形

~~~js
// 用border画边框
// 通过将其他三个边框设置为透明色，实现某个方向的三角形
div{
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
~~~



# 11. display属性

- `block` 转换成块状元素。
- `inline` 转换成行内元素。
- `none` 设置元素不可见。
- `inherit` 规定应该从父元素继承 `display` 属性的值
- `inline-block` 像行内元素一样显示，但其内容象块类型元素一样显示。
- `list-item` 象块类型元素一样显示，并添加样式列表标记。
- `table` 此元素会作为块级表格来显示

# 12. 清除浮动

- 父级`div`定义`height`
- 结尾处加空`div`标签`clear:both`
- 父级`div`定义伪类`:after`和`zoom`
- 父级`div`定义`overflow:hidden`
- 父级`div`也浮动，需要定义宽度
- 结尾处加`br`标签`clear:both`
- 比较好的是第3种方式，好多网站都这么用

# 13. position属性

1. static（默认值） —— 没有定位
2. fixed —— 固定定位，相对于浏览器窗口进行定位
3. relative —— 相对于自身定位，不脱离文档流
4. absolute —— 相对于第一个有relative的父元素定位，脱离文档流
5. inherit —— 规定从父元素继承osition属性

**relative和absolute区别**

1. relative不脱离文档流，absolute脱离文档流
2. relative相对于自身定位，absolute相对于一个有relative的父元素定位
3. relative如果有left、right、top、bottom 只能有 left、top；  absolute中四个属性都可以存在



# 14. 圣杯布局

浮动 + 负margin

~~~html
		<style>
        html,body{
            height: 100%;
            overflow: hidden;
        }

        .container{
            height: 100%;
            padding: 0 200px;
        }

        .center{
            float: left;
            width: 100%;
            height: 400px;
            background-color: blue;
        }

        .left,.right{
            float: left;
            width: 200px;
            height: 200px;
            background-color: burlywood;
        }

        .left{
            margin-left: -100%;
            position: relative;
            left: -200px;
        }
        .right{
            margin-right: -200px;
        }
   </style>

	<div class="container">
        <div class="center"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
~~~



# 15. 双飞翼布局

浮动 + 负margin

~~~html
    <style>
        .container{
            width: 100%;
        }

        .center{
            height: 400px;
            min-width: 400px;
            margin: 0 200px;
            background-color: blue;
        }

        .left,
        .container,
        .right{ 
            float: left;
        }

        .left,.right{
            width: 200px;
            height: 200px;
            background-color:burlywood;
        }

        .left{
            margin-left: -100%;
        }

        .right{
            margin-left: -200px;
        }
    </style>

	 <div class="clearfix">
        <div class="container">
            <div class="center"></div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
~~~



# 16. CALC实现两边固定，中间自适应百分百

~~~html
	<style>
        .container{
            width:100%;
            height:100%;
        }
        
        .center,
        .left,
        .right{
            float:left;
        }
        
        .center{
            /* 兼容到IE9 */
            width:calc(100%-400px);
            min-height:400px;
            background-color:blue;
        }
        
        .left,.right{
            width:200px;
            height:200px;
            background-color:burlywood;
        }
        
	</style>
	<div class="container">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
~~~



# 17. flex实现两边固定，中间宽度自适应

~~~html
	<style>
        .container{
            width:100%;
            height:100%;
            display:flex;
            justify-content:space-between;
        }
        
        .center{
            flex:1;
            min-height:400px;
            background-color:blue;
        }
        
        .left,.right{
            flex:0 0 200px;
            height:200px;
            background-color:burlywood;
        }
        
	</style>
	<div class="container">
        <div class="center"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
~~~





# 18. CSS reset（初始化）

reset.css  是一个css文件，用来重置css样式

浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异

Normalize.css 为了增强跨浏览器渲染的一致性，我们使用了Normalize.css，这是由Nicolas Gallagher 和 Jonathan Neal 维护一个CSS重置样式库



# 19. CSS选择器渲染机制

~~~css
.box a {
    ...
} 

a{
    ...
}
~~~

第二种渲染性能更高，css选择器渲染机制是**从右向左查询**



# 20. css sprite是什么,有什么优缺点

- 概念：将多个小图片拼接到一个图片中。通过`background-position`和元素尺寸调节需要显示的背景图案。
- 优点：
  - 减少`HTTP`请求数，极大地提高页面加载速度
  - 增加图片信息重复度，提高压缩比，减少图片大小
  - 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现
- 缺点：
  - 图片合并麻烦
  - 维护麻烦，修改一个图片可能需要从新布局整个图片，样式



# 21. `display: none;`与`visibility: hidden;`的区别

- 联系：它们都能让元素不可见
- 区别：
  - `display:none`;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility: hidden`;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
  - `display: none`;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示`；visibility: hidden;`是继承属性，子孙节点消失由于继承了`hidden`，通过设置`visibility: visible;`可以让子孙节点显式
  - 修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘。
  - 读屏器不会读取`display: none`;元素内容；会读取`visibility: hidden;`元素内容



# 22.  `link`与`@import`的区别

1. `link`是`HTML`方式， `@import`是CSS方式
2. `link`最大限度支持并行下载，`@import`过多嵌套导致串行下载，出现`FOUC`(文档样式短暂失效)
3. `link`可以通过`rel="alternate stylesheet"`指定候选样式
4. 浏览器对`link`支持早于`@import`，可以使用`@import`对老浏览器隐藏样式
5. `@import`必须在样式规则之前，可以在css文件中引用其他文件
6. 总体来说：`link`优于`@import`



# 23. 什么是FOUC?如何避免

- `Flash Of Unstyled Content`：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
- **解决方法**：把样式表放到文档的`<head>`



# 24. 为什么要初始化CSS样式?

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对`CSS`初始化往往会出现浏览器之间的页面显示差异。
- 当然，初始化样式会对`SEO`有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化

# 25. CSS3有哪些新特性

- 新增选择器 `p:nth-child(n){color: rgba(255, 0, 0, 0.75)}`
- 弹性盒模型 `display: flex;`
- 多列布局 `column-count: 5;`
- 媒体查询 `@media (max-width: 480px) {.box: {column-count: 1;}}`
- 个性化字体 `@font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}`
- 颜色透明度 `color: rgba(255, 0, 0, 0.75);`
- 圆角 `border-radius: 5px;`
- 渐变 `background:linear-gradient(red, green, blue);`
- 阴影 `box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);`
- 倒影 `box-reflect: below 2px;`
- 文字装饰 `text-stroke-color: red;`
- 文字溢出 `text-overflow:ellipsis;`
- 背景效果 `background-size: 100px 100px;`
- 边框效果 `border-image:url(bt_blue.png) 0 10;`
- 转换
  - 旋转 `transform: rotate(20deg);`
  - 倾斜 `transform: skew(150deg, -10deg);`
  - 位移 `transform: translate(20px, 20px);`
  - 缩放 `transform: scale(.5);`
- 平滑过渡 `transition: all .3s ease-in .1s;`
- 动画 `@keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;`

**CSS3新增伪类有那些？**

- `p:first-of-type` 选择属于其父元素的首个`<p>`元素的每个`<p>` 元素。
- `p:last-of-type` 选择属于其父元素的最后 `<p>` 元素的每个`<p>` 元素。
- `p:only-of-type` 选择属于其父元素唯一的 `<p>`元素的每个 `<p>` 元素。
- `p:only-child` 选择属于其父元素的唯一子元素的每个 `<p>` 元素。
- `p:nth-child(2)` 选择属于其父元素的第二个子元素的每个 `<p>` 元素。
- `:after` 在元素之前添加内容,也可以用来做清除浮动。
- `:before` 在元素之后添加内容。
- `:enabled` 已启用的表单元素。
- `:disabled` 已禁用的表单元素。
- `:checked` 单选框或复选框被选中。



# 26. display:inline-block 什么时候不会显示间隙？

- 移除空格
- 使用`margin`负值
- 为父元素中设置`font-size: 0`，在子元素上重置正确的`font-size`
- `letter-spacing `     属性增加或减少字符间的空白
- 设置父元素，`display:table` 和 `word-spacing`



# 27. PNG\GIF\JPG的区别及如何选

- `GIF`
  - `8`位像素，`256`色
  - 无损压缩
  - 支持简单动画
  - 支持`boolean`透明
  - 适合简单动画
- `JPEG`
  - 颜色限于`256`
  - 有损压缩
  - 可控制压缩质量
  - 不支持透明
  - 适合照片
- `PNG`
  - 有`PNG8`和`truecolor PNG`
  - `PNG8`类似`GIF`颜色上限为`256`，文件小，支持`alpha`透明度，无动画
  - 适合图标、背景、按钮



# 28. 行内元素float:left后是否变为块级元素？

> 行内元素设置成浮动之后变得更加像是`inline-block`（行内块级元素，设置成这个属性的元素会同时拥有行内和块级的特性，最明显的不同是它的默认宽度不是`100%`），这时候给行内元素设置`padding-top`和`padding-bottom`或者`width`、`height`都是有效果的



# 29. ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用

- 单冒号(`:`)用于`CSS3`伪类，双冒号(`::`)用于`CSS3`伪元素
- 用于区分伪类和伪元素

[伪类与伪元素区别](# 39. 伪类和伪元素的区别)



# 30. 如果需要手动写动画，你认为最小时间间隔是多久

- 多数显示器默认频率是`60Hz`，即`1`秒刷新`60`次，所以理论上最小间隔为`1/60*1000ms ＝ 16.7ms`



# 31. CSS合并方法

- 避免使用`@import`引入多个`css`文件，可以使用`CSS`工具将`CSS`合并为一个`CSS`文件，例如使用`Sass\Compass`等



# 32. 列出你所知道可以改变页面布局的属性

- `position`、`display`、`float`、`width`、`height`、`margin`、`padding`、`top`、`left`、`right`



# 33. CSS在性能优化方面的实践

- `css`压缩与合并、`Gzip`压缩
- `css`文件放在`head`里、不要用`@import`
- 尽量用缩写、避免用滤镜、合理使用选择器



# 34. CSS3动画（简单动画的实现，如旋转等）

- 依靠`CSS3`中提出的三个属性：`transition`、`transform`、`animation`
- `transition`：定义了元素在变化过程中是怎么样的，包含`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`。
- `transform`：定义元素的变化结果，包含`rotate`、`scale`、`skew`、`translate`。
- `animation`：动画定义了动作的每一帧（`@keyframes`）有什么效果，包括`animation-name`，`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`



# 35. base64的原理及优缺点

Base64是一种基于64个可打印字符来表示二进制数据的编码方式，是从二进制数据到字符的过程。
原则上，计算机中所有内容都是二进制形式存储的，所以所有内容（包括文本、影音、图片等）都可以用base64来表示。

- 原理
  - Base64编码之所以称为Base64，是因为其使用64个字符来对任意数据进行编码
- 优缺点
  - 优点
    - 可以加密，减少了`HTTTP`请求
    - base64编码的字符串，更适合不同平台、不同语言的传输
  - 缺点
    - 需要消耗`CPU`进行编解码
    - base64格式的文本内容较多，转换后的大小会增加
    - 网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验
    - base64无法缓存，要缓存只能缓存包含base64的文件



# 36. stylus/sass/less区别

- 均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性
- `Scss`和`LESS`语法较为严谨，`LESS`要求一定要使用大括号“{}”，`Scss`和`Stylus`可以通过缩进表示层次与嵌套关系
- `Scss`无全局变量的概念，`LESS`和`Stylus`有类似于其它语言的作用域概念
- `Sass`是基于`Ruby`语言的，而`LESS`和`Stylus`可以基于`NodeJS` `NPM`下载相应库后进行编译；



# 37. postcss的作用

- 可以直观的理解为：它就是一个平台。为什么说它是一个平台呢？因为我们直接用它，感觉不能干什么事情，但是如果让一些插件在它上面跑，那么将会很强大
- `PostCSS` 提供了一个解析器，它能够将 `CSS` 解析成抽象语法树
- 通过在 `PostCSS` 这个平台上，我们能够开发一些插件，来处理我们的`CSS`，比如热门的：`autoprefixer`
- `postcss`可以对sass处理过后的`css`再处理 最常见的就是`autoprefixer`



# 38. 如何美化CheckBox

- `<label>` 属性 `for` 和 `id`
- 隐藏原生的 `<input>`
- `:checked + <label>`



# 39. 伪类和伪元素的区别

- 伪类表状态
- 伪类 -- 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素
- 伪元素是真的有元素
- 伪元素 -- 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成
- 前者单冒号，后者双冒号

**伪元素**

- `:before` 和 `:after` 用法
  - 在真正页面元素内部之前和之后添加新内容，伪元素 `:before` 和 `:after` 添加的内容默认是 `inline` 元素；设置 `:before` 和 `:after` 时必须设置其 `content` 属性，否则伪元素就不起作用。
  - `content` 属性的值应该有哪些
    - 字符串，字符串作为伪元素的内容添加到主元素中 （字符串中若有html字符串，添加到主元素后不会进行 `html` 转义，也不会转化为真正的 `html` 内容显示，而是会原样输出）
    - `attr (attr_name)`，伪元素的内容跟主元素的某个属性值进行关联，以及内容为主元素的某指定属性的值
    - `url()/uri()`，引用外部资源
    - `counter()`，调用计时器，可以不使用列表元素实现序号问题
- `:before` 和 `:after` 特点
  - 伪元素不属于文档，所以 js 无法操作它
  - 伪元素属于主元素的一部分，因此点击伪元素触发的是主元素的 `click` 事件
  - 说块级元素才能有`:before`, `:after`，其实是不妥的，大部分行级元素也可以设置伪元素，但是像img可替换元素，因为其外观和尺寸有外部资源决定，那么如果外部资源正确加载，就会替换掉其内部内容，这时伪元素也会被替换掉，但是当外部资源加载失败时，设置的伪元素是可以起作用的。
- 优点
  - 减少 `DOM `节点数
  - 让 `CSS` 帮助解决部分js问题，让问题变得简单
- 缺点
  - 不利于 `SEO`
  - 无法审查元素，不利于调试
- 常用使用场景 [伪元素详解]([css伪元素:before和:after用法详解 - wonyun - 博客园 (cnblogs.com)](https://www.cnblogs.com/wonyun/p/5807191.html))
  - 清除浮动
  - 利用 `attr()` 来实现某些动态功能
  - 与 `counter()` 结合实现序号问题，而不用使用列表元素
  - 特效使用

**伪类**

- `CSS` 伪类是添加到选择器的关键字，指定要选择的元素的特殊状态。

# 40. 请用CSS写一个简单的幻灯片效果页面

> 知道是要用`CSS3`。使用`animation`动画实现一个简单的幻灯片效果

~~~css
/**css**/
.ani{
  width:480px;
  height:320px;
  margin:50px auto;
  overflow: hidden;
  box-shadow:0 0 5px rgba(0,0,0,1);
  background-size: cover;
  background-position: center;
  animation-name: loops;
  animation-duration: 20s;
  animation-iteration-count: infinite;
}
@keyframes loops {
    0% {
       background:url(url) no-repeat;           
    } 
    25% {
       background:url(url) no-repeat;
    }
    50% {
       background:url(url) no-repeat;
    }
    75% {
       background:url(url) no-repeat;
    }
    100% {
        background:url(url) no-repeat;
    }
}
~~~



# 41. 什么是外边距重叠？重叠的结果是什么？

> 外边距重叠就是margin-collapse

- 在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

**折叠规则**

- 两个或多个毗邻的普通流中的块元素垂直方向上的`margin`会折叠
- 浮动元素或`inline-block`元素或绝对定位元素的`margin`不会和垂直方向上的其他元素的margin折叠
- 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠
- 元素自身的`margin-bottom`和`margin-top`相邻时也会折

**折叠结果遵循下列计算规则**：

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
- 两个外边距一正一负时，折叠结果是两者的相加的和。

# 41. rgba()和opacity的透明效果有什么不同？

- `rgba()`和`opacity`都能实现透明效果，但最大的不同是`opacity`作用于元素，以及元素内的所有内容的透明度

  - 取值在0到1之间，0表示完全透明，1表示完全不透明。

- 而`rgba()`只作用于元素自身的颜色或其背景色。（设置`rgba`透明的元素的子元素不会继承透明效果！）

  - rgba中的R表示红色，G表示绿色，B表示蓝色，三种颜色的值都可以是正整数或百分数。A表示Alpha透明度。取值0~1之间，类似opacity

  ~~~css
  .aa{background: rgba(255,0,0,0.5);}
  ~~~

  



# 42. css中可以让文字在垂直和水平方向上重叠的两个属性是什么？

- 垂直方向：`line-height`
- 水平方向：`letter-spacing`



# 43. px和em的区别

- `px`和`em`都是长度单位，区别是，`px`的值是固定的，指定是多少就是多少，计算比较容易。`em`得值不是固定的，并且`em`会继承父级元素的字体大小。
- 浏览器的默认字体高都是`16px`。所以未经调整的浏览器都符合: `1em=16px`。那么`12px=0.75em`, `10px=0.625em`。

> - px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能
> - em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级font-size



# 44. Sass、LESS是什么？大家为什么要使用他们？

- 他们是`CSS`预处理器。他是`CSS`上的一种抽象层。他们是一种特殊的语法/语言编译成`CSS`。
- 例如 `Less` 是一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数. `LESS` 既可以在客户端上运行 (支持`IE 6+`, `Webkit`, `Firefox`)，也可一在服务端运行 (借助 `Node.js`)

**为什么要使用它们？**

- 结构清晰，便于扩展。
- 可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对- 浏览器语法差异的重复处理，减少无意义的机械劳动。
- 可以轻松实现多重继承。
- 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只- 是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译



# 45. 知道css有个content属性吗？有什么作用？有什么应用？

> css的`content`属性专门应用在 `before/after`伪元素上，用于来插入生成内容。最常见的应用是利用伪类清除浮动。

```css
/**一种常见利用伪类清除浮动的代码**/
.clearfix:after {
    content:".";       //这里利用到了content属性
    display:block;
    height:0;
    visibility:hidden;
    clear:both; 
 }
.clearfix {
    zoom:1;
}
```



# 46. 水平居中的方法

- 元素为行内元素，设置父元素`text-align:center`
- 如果元素宽度固定，可以设置左右`margin`为`auto`;
- 绝对定位和移动: `absolute + transform`
- 使用`flex-box`布局，指定`justify-content`属性为 `center`
- `display`设置为 `tabel-ceil`



# 47. 垂直居中的方法

- 将显示方式设置为表格，`display:table-cell`,同时设置`vertial-align：middle`
- 使用`flex`布局，设置为 `align-item：center`
- 绝对定位中设置 `bottom:0,top:0`,并设置 `margin:auto`
- 绝对定位中固定高度时设置 `top:50%，margin-top` 值为高度一半的负值
- 文本垂直居中设置 `line-height` 为 `height` 值

- 如果是单行文本, `line-height ` 设置成和 `height` 值

```css
.vertical {
    height: 100px;
    line-height: 100px;
  }
```

- 已知高度的块级子元素，采用绝对定位和负边距

```css
.container {
  position: relative;
}
.vertical {
  height: 300px;  /*子元素高度*/
  position: absolute;
  top:50%;  /*父元素高度50%*/
  margin-top: -150px; /*自身高度一半*/
}
```

- 未知高度的块级父子元素居中，模拟表格布局
- 缺点：IE67不兼容，父级 `overflow：hidden` 失效

```css
.container {
    display: table;
  }
  .content {
    display: table-cell;
    vertical-align: middle;
  }
```

- 新增 `inline-block` 兄弟元素，设置 `vertical-align`
  - 缺点：需要增加额外标签，IE67不兼容

```css
.container {
  height: 100%;/*定义父级高度，作为参考*/
}
.extra .vertical{
  display: inline-block;  /*行内块显示*/
  vertical-align: middle; /*垂直居中*/
}
.extra {
  height: 100%; /*设置新增元素高度为100%*/
}
```

- 绝对定位配合 CSS3 位移

```css
.vertical {
  position: absolute;
  top:50%;  /*父元素高度50%*/
  transform:translateY(-50%, -50%);
}
```

- CSS3弹性盒模型

```css
.container {
  display:flex;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
}
```



# 48. 如何使用CSS实现硬件加速？

> 硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能，

- 一般触发硬件加速的`CSS`属性有 `transform`、`opacity`、`filter`，为了避免2D动画在开始和结束的时候的`repaint`操作，一般使用`tranform:translateZ(0）



# 49. 重绘和回流（重排）是什么，如何避免？

- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS获取Layout属性值（如：`offsetLeft`、`scrollTop`、`getComputedStyle`等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流

**如何最小化重绘(repaint)和回流(reflow)**：

- 需要要对元素进行复杂的操作时，可以先隐藏(`display:"none"`)，操作完成后再显示
- 需要创建多个`DOM`节点时，使用`DocumentFragment`创建完后一次性的加入`document`
- 缓存`Layout`属性值，如：`var left = elem.offsetLeft;` 这样，多次使用 `left` 只产生一次回流
- 尽量避免用`table`布局（`table`元素一旦触发回流就会导致table里所有的其它元素回流）
- 避免使用`css`表达式(`expression`)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 `css` 属性简写，如：用 `border` 代替 `border-width`, `border-style`, `border-color`
- 批量修改元素样式：`elem.className` 和 `elem.style.cssText` 代替 `elem.style.xxx`



# 50. 说一说css3的animation

- css3的`animation`是css3新增的动画属性，这个css3动画的每一帧是通过`@keyframes`来声明的，`keyframes`声明了动画的名称，通过`from`、`to`或者是百分比来定义
- 每一帧动画元素的状态，通过`animation-name`来引用这个动画，同时css3动画也可以定义动画运行的时长、动画开始时间、动画播放方向、动画循环次数、动画播放的方式，
- 这些相关的动画子属性有：
  - `animation-name` 定义动画名
  - `animation-duration `定义动画播放的时长
  - `animation-delay` 定义动画延迟播放的时间
  - `animation-direction `定义 动画的播放方向
  - `animation-iteration-count` 定义播放次数
  - `animation-fill-mode` 定义动画播放之后的状态
  - `animation-play-state` 定义播放状态，如暂停运行等
  - `animation-timing-function`定义播放的方式，如恒速播放、艰涩播放等。



# 51. 左边宽度固定，右边自适应

> 左侧固定宽度，右侧自适应宽度的两列布局实现

html结构

```html
<div class="outer">
    <div class="left">固定宽度</div>
    <div class="right">自适应宽度</div>
</div>
```

> 在外层`div`（类名为`outer`）的`div`中，有两个子`div`，类名分别为`left`和`right`，其中`left`为固定宽度，而`right`为自适应宽度

**方法1：左侧div设置成浮动：float: left，右侧div宽度会自拉升适应**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
    float: left;
}
.right {
    height: 200px;
    background-color: blue;
}
```

**方法2：对右侧:div进行绝对定位，然后再设置right=0，即可以实现宽度自适应**

> 绝对定位元素的第一个高级特性就是其具有自动伸缩的功能，当我们将 `width`设置为 `auto` 的时候（或者不设置，默认为 `auto` ），绝对定位元素会根据其 `left` 和 `right` 自动伸缩其大小

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    position: relative;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
}
.right {
    height: 200px;
    background-color: blue;
    position: absolute;
    left: 200px;
    top:0;          
    right: 0;
}
```

**方法3：将左侧`div`进行绝对定位，然后右侧`div`设置`margin-left: 200px`**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    position: relative;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
    position: absolute;
}
.right {
    height: 200px;
    background-color: blue;
    margin-left: 200px;
}
```

**方法4：使用flex布局**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    display: flex;
    flex-direction: row;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
}
.right {
    height: 200px;
    background-color: blue;
    flex: 1;
}
```



# 52. 如何实现小于12px的字体效果

> `transform:scale()`这个属性只可以缩放可以定义宽高的元素，而行内元素是没有宽高的，我们可以加上一个`display:inline-block`;

```text
transform: scale(0.7);
```

`css`的属性，可以缩放大小



# 53. CSS hack原理及常用hack

- CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，CSS hack就是让你记住这个标准），以达到应用不同的CSS样式的目的。

- 原理：利用不同浏览器对CSS的支持和解析结果不一样编写针对特定浏览器样式。
- 常见的hack有
  - 属性hack
  - 选择器hack
  - IE条件注释



# 54. CSS有哪些继承属性

- 关于文字排版的属性如：
  - `font`
    - `word-break`
    - `letter-spacing`
    - `text-align`
    - `text-rendering`
    - `word-spacing`
    - `white-space`
    - `text-indent`
    - `text-transform`
    - `text-shadow`
  - `line-height`
  - `color`
  - `visibility`
  - `cursor`



# 55. CSS3新增伪类有那些

- `:root` 选择文档的根元素，等同于 html 元素
- `:empty` 选择没有子元素的元素
- `:target` 选取当前活动的目标元素
- `:not(selector)` 选择除 `selector` 元素意外的元素
- `:enabled` 选择可用的表单元素
- `:disabled` 选择禁用的表单元素
- `:checked` 选择被选中的表单元素
- `:after` 在元素内部最前添加内容
- `:before` 在元素内部最后添加内容
- `:nth-child(n)` 匹配父元素下指定子元素，在所有子元素中排序第n
- `:nth-last-child(n)` 匹配父元素下指定子元素，在所有子元素中排序第n，从后向前数
- `:nth-child(odd)`
- `:nth-child(even)`
- `:nth-child(3n+1)`
- `:first-child`
- `:last-child`
- `:only-child`
- `:nth-of-type(n)` 匹配父元素下指定子元素，在同类子元素中排序第n
- `:nth-last-of-type(n)` 匹配父元素下指定子元素，在同类子元素中排序第n，从后向前数
- `:nth-of-type(odd)`
- `:nth-of-type(even)`
- `:nth-of-type(3n+1)`
- `:first-of-type`
- `:last-of-type`
- `:only-of-type`
- `::selection` 选择被用户选取的元素部分
- `:first-line` 选择元素中的第一行
- `:first-letter` 选择元素中的第一个字符



# 56. 满屏 品 字布局 如何设计

- 简单的方式：
  - 上面的`div`宽`100%`，
  - 下面的两个`div`分别宽`50%`，
  - 然后用`float`或者`inline`使其不换行即可



# 57. li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法

> 行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了

为父元素中设置`font-size: 0`，在子元素上重置正确的`font-size`



# 58. 请列举几种隐藏元素的方法

- `visibility: hidden;` 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- `opacity: 0;` `CSS3`属性，设置`0`可以使一个元素完全透明
- `position: absolute;` 设置一个很大的 `left` 负值定位，使元素定位在可见区域之外
- `display: none;` 元素会变得不可见，并且不会再占用文档的空间。
- `transform: scale(0);` 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- `<div hidden="hidden">` HTML5属性,效果和`display:none;`相同，但这个属性用于记录一个元素的状态
- `height: 0;` 将元素高度设为 `0` ，并消除边框
- `filter: blur(0);` CSS3属性，将一个元素的模糊度设置为`0`，从而使这个元素“消失”在页面中



# 59. 请写出多种等高布局

- 在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假像
- 模仿表格布局等高列效果：兼容性不好，在ie6-7无法正常运行
- `css3 flexbox` 布局： `.container{display: flex; align-items: stretch;}`



# 60. 浮动元素引起的问题

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素会跟随其后



# 61. 抽离样式模块怎么写，说出思路

- CSS可以拆分成2部分：公共CSS 和 业务CSS：
  - 网站的配色，字体，交互提取出为公共CSS。这部分CSS命名不应涉及具体的业务
  - 对于业务CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的CSS



# 62. 什么是视差滚动效果，如何给每页做不同的动画

- 视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，具有非常出色的视觉体验
- 一般把网页解剖为：背景层、内容层和悬浮层。当滚动鼠标滚轮时，各图层以不同速度移动，形成视差的
- 实现原理
  - 以 “页面滚动条” 作为 “视差动画进度条”
  - 以 “滚轮刻度” 当作 “动画帧度” 去播放动画的
  - 监听 mousewheel 事件，事件被触发即播放动画，实现“翻页”效果



# 63. a标签上四个伪类的执行顺序是怎么样的

> ```
> link > visited > hover > active
> ```

- `L-V-H-A` `love hate` 用喜欢和讨厌两个词来方便记忆



# 64. 如何修改Chrome记住密码后自动填充表单的黄色背景

- 产生原因：由于 `Chrome` 默认会给自动填充的 `input` 表单加上 `input:-webkit-autofill` 私有属性造成的
- 解决方案1：在 `form` 标签上直接关闭了表单的自动填充：`autocomplete="off"`
- 解决方案2：`input:-webkit-autofill { background-color: transparent; }`

**input [type=search] 搜索框右侧小图标如何美化？**

```css
input[type="search"]::-webkit-search-cancel-button{
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background:url("images/searchicon.png") no-repeat 0 0;
  background-size: 15px 15px;
}
```



# 65. 网站图片文件，如何点击下载？

`<a href="logo.jpg" download>下载</a>`   ` <a href="logo.jpg" download="网站LOGO" >下载</a>`



# 66. line-height的理解

- `line-height` 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 `height` 属性，那么其最终表现的高度是由 `line-height` 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 `line-height` 而不是容器内的文字内容
- 把 `line-height` 值设置为 `height` 一样大小的值可以实现单行文字的垂直居中
- `line-height` 和 `height` 都能撑开一个高度，`height` 会触发 `haslayout`，而 `line-height` 不会



# 67. line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）

- 带单位：`px` 是固定值，而 `em` 会参考父元素 ,`font-size` 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 `1.5`，子元素字体为 `18px`，则子元素行高为 `1.5 * 18 = 27px`
- 百分比：将计算后的值传递给后代



# 68. 设置元素浮动后，该元素的 display 值会如何变化

> 设置元素浮动后，该元素的 `display` 值自动变成 `block`



# 69. 让页面里的字体变清晰，变细用CSS怎么做？

```css
  -webkit-font-smoothing: antialiased;
```