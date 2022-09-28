//使用 tsc 文件名 --strictNullChecks 编译会null会报错

//null的类型保护和类型断言  null类型断言直接在变量后加 ！
let s='f00'
s=null
let sn:string|null='bar'
sn=null
sn=undefined

function f(x:number,y?:number){
    return x+(y||0)
}
f(1,2)
f(1)
f(1,undefined)
f(1,null)

class C{
    a:number
    b?:number
}
let c=new C()
c.a=1
c.b=undefined

function fn(sn:string|null):string{
    return sn! ||'default'
}

function broken(name:string|null):string{
    function postfix(epither:string){
        return name!.charAt(0)+'.the'+epither
    }
    name=name||'bob'
    return postfix(name)
}
console.log(broken(null));
