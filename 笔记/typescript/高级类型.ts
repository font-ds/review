//交叉类型
function extend<T,U>(first:T,second:U):T&U{
    let result={} as T&U

    for(let i in first){
        result[i]=first[i] as any
    }
    for(let i in second){
        if(!result.hasOwnProperty(i))
        result[i]=second[i] as any
    }

    return result
}

class Person{
    constructor(public name:string){

    }
}

interface Loggable{
    log():void
}

class ConsoleLogger implements Loggable{
    log(){
        console.log(jim.name)
    }
}

var jim=extend(new Person('jim'),new ConsoleLogger())
jim.log()





//联合类型
function padLeft(value:string,padding: string|number){
    if(typeof padding==='number'){
        return Array(padding+1).join(' ')+value
    }
    if(typeof padding==='string'){
        return padding + value
    }
    throw new Error(`Expect string or number got ${padding}`)
}
console.log(padLeft('Hello world',4));
console.log(padLeft('Hello world','hey'));
// console.log(padLeft('Hello world',true));

interface Bird{
    fly()
    layEggs()
}
interface Fish{
    swim()
    layEggs()
}

//只能调用共有方法
function getSmallPet():Fish|Bird{
    return
}
let pet=getSmallPet()
pet.layEggs()
// pet.swim()
// pet.fly()


//类型保护
function isFish(pet:Fish|Bird):pet is Fish{
    return (pet as Fish).swim !==undefined
}
if(isFish(pet)){
    pet.swim()
}else{
    pet.fly()
}

function isNumber(x:any):x is number{
    return typeof x ==='number'
}
function isString(x:any):x is string{
    return typeof x==='string'
}
function padLeft1(value:string,padding:string|number){
    if(typeof padding==='number'){
        return Array(padding+1).join(' ')+value
    }
    if(typeof padding==='string'){
        return padding + value
    }
    throw new Error(`Expect string or number got ${padding}`)
}
