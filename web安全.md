# 常见的攻击和防御

# 攻击

## 1.XSS(Cross-Site Scripting)

xss，即 Cross Site Script，中翻译是跨站脚本攻击，XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

就是攻击者想方设法把他们的恶意脚本插入到我们的页面执行

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337066505-6237ea50-9088-4cc7-addb-23c9c4ea073f.png)

XSS主要利用了开发者盲目信任用户提交的内容，直接把字符串生成DOM

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337168359-3c0f6ac7-7731-4380-b411-2ebedf45b45e.png)

**XSS特点**

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337337175-38c3bc3e-b92a-4d9c-b8cc-40eebadaa862.png)

**XSS demo**

没有对提交的内容有任何的过滤

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337452918-13c77f21-5651-430c-9627-6b508764f70a.png)

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337475067-36e43450-509a-4b26-8526-0d4fcc0ccf58.png)

### 1.1 Stored XSS（存储型）

存储型 XSS 会把用户输入的数据 “存储” 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。

比较常见的一个场景是攻击者在社区或论坛上写下一篇包含恶意 JavaScript 代码的文章或评论，文章或评论发表后，所有访问该文章或评论的用户，都会在他们的浏览器中执行这段恶意的 JavaScript 代码。

当你访问爱奇艺的时候，爱奇艺中了XSS攻击，你的账户和密码就会被泄露

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629270549738-31a2c265-3daf-4a3a-998d-a4a6289a5d1b.png)

### 1.2 Reflected XSS（反射型）

反射型 XSS 只是简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629337737687-e0f46ad6-99ce-4f64-b6c0-0be51edcd056.png)

URL参数被攻击者设计成了恶意脚本

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629349989883-be8d387b-4fac-4de6-8ea9-a4d994ee74c1.png)

服务端代码直接从URL上读取这个参数然后渲染成HTML，这样如果没有经过XSS过滤就会达成一次XSS攻击

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629349999771-4a24ddb9-4688-47e0-a8fc-10bffbd85b2f.png)

### 1.3 DOM-based XSS （基于DOM型）

基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629270602484-fc1032c6-3529-42a9-8ffc-18333523cf5b.png)

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629350163539-6fc9ed6c-3fa8-4a7f-af15-3b64d8891d30.png)

直接在浏览器端读取参数然后赋值给元素的innerHTML中，也完成了一次XSS攻击

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629350172054-4c4880e0-794b-4d99-ad12-b281692c7991.png)



## 2.CSRF 跨站请求伪造

CSRF，即 Cross Site Request Forgery，中译是跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。通常情况下，CSRF 攻击是攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629270781402-05ddc0c7-f2b6-42e2-a2ee-e2d7ca1d97f8.png)

### 2.1 CSRF demo



![img](https://upload-images.jianshu.io/upload_images/1637343-f98498e9419fb156.png?imageMogr2/auto-orient/strip|imageView2/2/w/1052/format/webp)

### 2.2 常见CSRF—构造GET请求

主动型攻击：构造a标签，用户点击a标签，GET请求就会被发送，就会造成CSRF攻击

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629351545045-48d60dbd-ff02-4378-977f-df62083e888d.png)

被动型攻击：访问页面就会造成CSRF攻击，img标签src是一个跨站的HTTP的GET请求，页面被访问图片被加载GET请求就会被发送

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629351554393-7a0c198a-1f08-4889-a057-6f4f444edba0.png)

### 2.3 常见CSRF—构造POST请求

利用form表单构造post请求，通过input的hidden属性来传递任何值

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629351746110-d5be79fe-aa12-4a76-ac9e-ac5ddf855730.png)

# 防御

## 1.XSS防御

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629271648384-f055cd22-66bf-4338-83f1-3a4b48b966a4.png)

### 1.1 避免XSS

- 不能动态生成DOM
- 不能String -> DOM

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629342090007-f0e33a16-37da-440a-bd55-75155475830c.png)

如果一定要转换，要对String进行过滤

- 注意SVG 的上传

svg可以内嵌script标签，当svg在浏览器加载时就会完成XSS攻击

所以svg文件也要过滤

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629342073854-a2e9a901-b6c5-4494-a587-b20e29c11f95.png)

- 注意自定义的跳转链接

要过滤自定义跳转连接，最好不要允许！

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629342143918-5eea0224-8824-4679-a9d1-eb1352696200.png)

 对于任何输入和输出要进行检查、过滤和转义。建立可信任的字符和 HTML 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。

![image-20211224202303300](C:\Users\HUAWEI\AppData\Roaming\Typora\typora-user-images\image-20211224202303300.png)

### 1.2 CSP（Content Security Policy）

内容安全策略是http协议中协议头的一个字段，也可以通过html的meta标签进行控制。只要在返回的http头中定义：

'Content-type':'text/html',
'Content-Security-Policy':'default-src http: https:'

那么返回的html文件就只能通过http和https外链加载js脚本的方式来执行js代码，而不能执行内联的js代码。这样就防止了恶意内联js代码的执行。

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629271897506-479185fb-312d-4a3b-b1dc-c7786f98004f.png)

**CSP主流的防御方法**

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629271931044-1475812f-c81e-42c1-9860-0f289d8f8ca0.png)

### 1.3 HttpOnly 防止劫取 Cookie

HttpOnly 最早由微软提出，至今已经成为一个标准。浏览器将禁止页面的Javascript 访问带有 HttpOnly 属性的Cookie。攻击者可以通过注入恶意脚本获取用户的 Cookie 信息。通常 Cookie 中都包含了用户的登录凭证信息，攻击者在获取到 Cookie 之后，则可以发起 Cookie 劫持攻击。所以，严格来说，HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。





## 2.CSRF防御

### 2.1 验证码

验证码被认为是对抗 CSRF 攻击最简洁而有效的防御方法。

CSRF 攻击往往是在用户不知情的情况下构造了网络请求。而验证码会强制用户必须与应用进行交互，才能完成最终请求。因为通常情况下，验证码能够很好地遏制 CSRF 攻击

### 2.2 Referer Check

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。通过 Referer Check，可以检查请求是否来自合法的”源”。

要防御 CSRF 攻击，只需要对于每一个请求验证其 Referer 值，如果 Referer 是其他网站的话，则有可能是 CSRF 攻击。

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629271981630-81abb0b2-55fa-438e-b95e-01c26061f86e.png)

同源请求就是正常请求，因此限制请求的Origin和Referrer为同源，这两者可以在请求头中获取，但同源请求中GET和HEAD请求不会发送Origin，需另外处理

### 2.3 CSRF-token

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629272009367-54940d36-3e0f-4b95-8f37-7eb7e93642ab.png)

通过给合法来源发送token的方法，token里面绑定用户信息，以及过期时间

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629272047941-12efa505-6089-4928-aa79-7cc4aeb08a7a.png)

### 2.4CSRF-iframe攻击防御

通过设置响应头部`X-Frame-Options: DENY/SAMEORIGIN`

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629272152246-47f8b3b3-6307-4482-b8f0-69914b5e87fc.png)

### 2.5 SameSite Cookie

Cookie中会有用户权限，容易被恶意使用，没有Cookie就没有问题

![img](https://cdn.nlark.com/yuque/0/2021/png/2634470/1629272276293-1dd948e6-34b1-4243-917d-3fb1c145f722.png)



对cookie设置same-site属性，规定浏览器不能在跨域请求中携带Cookie，来减少CSRF攻击。

SameSite Cookie 有三个值可以选：None Lax Strict

- **对于 SameSite=Strict 的 cookie**：只有同站请求会携带此类 cookie。
- **对于 SameSite=None 的 cookie**：同站请求和跨站请求都会携带此类 cookie。

- **Lax 的行为介于 None 和 Strict 之间，**对于 SameSite=Lax 的 cookie，除了同站请求会携带此类 cookie 之外，**特定情况的跨站请求**也会携带此类 cookie。

特定情况的跨站请求指的是：safe cross-site top-level navigations（安全的跨站顶级跳转），例如：

- ***点击超链接 <a> 产生的请求\***
- ***以 GET 方法提交表单产生的请求\***

- ***JS 修改 location 对象产生的跳转请求\***
- ***JS 调用 window.open() 等方式产生的跳转请求\***



cookie 发送情况可以简单总结为下表：

![img](https://cdn.nlark.com/yuque/0/2021/jpg/2634470/1629421468026-183eeb9a-f555-47c5-94ea-f6640f36f7f8.jpg)


