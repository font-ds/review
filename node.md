# 1. node的应用场景

- 特点：

  - 它是一个 `JavaScript` 运行环境
  - 依赖于 `Chrome V8` 引擎进行代码解释
  - 事件驱动
  - 非阻塞 `I/O`
  - 单进程，单线程

- 优点：

  - 高并发（最重要的优点）
  - 适合I/O密集型应用

- 缺点：

  - 只支持单核 `CPU`,不能充分利用 `CPU`

  - 不适合CPU密集型应用

    - 解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起

  - 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

    - 解决方案：（1）Nnigx反向代理，负载均衡，开多个进程，绑定多个端口；

      ​				   （2）开多个进程监听同一个端口，使用cluster模块；
