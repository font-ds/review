# MongoDB

## MongoDB是什么

MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。

​	特点：高性能、易部署、易使用、存储数据非常方便。

## MongoDB术语/概念

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                            |
| ------------ | ---------------- | ------------------------------------ |
| database     | database         | 数据库                               |
| table        | collection       | 数据库表/集合                        |
| row          | document         | 数据记录行/文档                      |
| column       | field            | 数据字段/域                          |
| index        | index            | 索引                                 |
| table joins  |                  | 表连接，MongoDB不支持                |
| primary key  | primary key      | 主键，MongoDB自动将_id字段设置为主键 |

## MongoDB数据库

一个MongoDB中可以建立多个数据库

MongoDB的默认数据库为“db”，该数据库存储在data目录中

MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

## MongoDB集合

集合就是MongoDB文档组，类似于RDBMS（关系数据库管理系统）中的表格

集合存在于数据库中，集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。

## MongoDB文档

文档试一个键值（key-value）对（即BSON）。MongoDB的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是MongoDB非常突出的特点。

一个简单的文档例子：    {"genres":["犯罪","剧情"],"title":"肖申克的救赎"}

## MongoDB数据类型

| 数据类型           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| String             | 字符串。存储数据常用的数据类型。在MongoDB中，UTF-8编码的字符串才是合法的。 |
| Interger           | 整型数值。用于存储数值。根据你所采用的服务器，可分为32位和64位。 |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                            |
| Double             | 双精度浮点值。用于储存浮点值。                               |
| Min/Max keys       | 将一个值与BSON（二进制的JSON）元素的最低值和最高值比较。     |
| Arrays             | 用于将数组或列表或多个值存储为一个键。                       |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                       |
| Object             | 用于内嵌文档。                                               |
| Null               | 用于创建空值。                                               |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date               | 日期时间。用UNIX时间格式来存储当前日期或时间。可以指定的日期时间：创建Date对象，传入年月日。 |
| Object ID          | 对象ID。用于创建文档的ID。                                   |
| Binary Data        | 二进制数据。用于储存二进制数据。                             |
| code               | 代码类型。用于在文档中储存JavaScript代码                     |
| Regular Expression | 正则表达式类型。用于储存正则表达式。                         |

## MongoDB数据库常用命令

1. Help查看命令提示：

   help

   db.help()

   db.test.help()

   db.test.find().help()

2. 创建/切换数据库：

   use 名字

3. 查询数据库：

   show dbs

4. 查看当前使用的数据库：

   db/db.getName()

5. 显示当前DB状态：

   db.stats()

6. 查看当前DB版本：

   db.version()

7. 查看当前DB的链接机器地址：

   db.getMongo()

8. 删除数据库：

   db.dropDatabase()

## MongoDB集合操作

1. 创建集合：

   db.createCollection("名字",{size:20,capped:true,max:100});

   db.collName.isCapped()      //判断集合是否为定容量

2. 得到指定名称的集合：

   db.getCollection("名字")

3. 得到当前db的所有集合：

   db.getCollectionNames()

4. 显示当前db所有集合的状态：

   db.printCollectionStats()



1. 修改：

   db.users.updata({age:19},{$set:{name:'changeName'}},false,true)

   db.users.updata({name:'Lisi'},{$inc:{age:50}},false,true)

   db.users.updata({name:'Lisi'},{$inc:{age:50}},false,true)

   

## MongoDB文档操作

1. 插入数据：

   db.集合名字.insert([{name:'m1',artical:'zhoujielun'}])   

   db.集合名字.save([{name:'m1',artical:'zhoujielun'}])   

2. 修改数据：（如果有多条数据拥有判断条件的内容，只修改第一个）

   db.集合名字.updata({name:'m1'},{$set:{artical:'jielun'}})             //artical修改为 jielun

   db.集合名字.updata({name:'Lisi'},{$inc:{age:50}})	   //age加50

   db.users.updata({name:'Lisi'},{$inc:{age:50}},false,true)  

    第一个boolean值表示找不到就创建，第二个boolean值表示匹配所有符合条件的数据

3. 删除数据：

   db.集合名称.remove({name:'Lisi'})

4. 查询数据：

   db.集合名字.find()

   db.集合名字.distinct(’name‘)     //查询去重后的数据

   db.集合名字.find({name:'Lisi'})   //查询name为Lisi的数据

   db.集合名字.find({age:{$gt:22}})   //查询age大于22的数据

   db.集合名字.find({age:{$lt:22}})   //查询age小于22的数据

   db.集合名字.find({age:{$gte:22}})   //查询age大于等于22的数据

   db.集合名字.find({age:{$lte:22}})   //查询age小于等于22的数据

   db.集合名字.find({age:{$gte:22,$lte:26}})   //查询age大于22且小于26的数据

   db.集合名字.find({name:/^mongo/}})     //查询name中以mongo开头的数据

   db.集合名字.find({}，{name:1,age:1})    //查询指定列name、age数据

   db.集合名字.find({age:{$gt:25}}，{name:1,age:1})    //查询指定列name、age数据，age大于25

   db.集合名字.find().sort({age:1})    //按照年龄升序排序

   db.集合名字.find().sort({age:-1})    //按照年龄降序排序

   db.集合名字.find().limit(5)     //查询前五条数据

   db.集合名字.find().skip(10)     //查询10条以后的数据

   db.集合名字.find.limit(10).skip(5)     //查询5-10他之间的数据

   db.集合名字.find({$or:[{age:22},{age:25}]})     //or与 查询

   db.集合名字.findOne()   //查询第一条数据

   db.集合名字.find({age:{$gte:25}}).count()    //查询某个结果集的记录条数

   

