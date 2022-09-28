class GenericNumber<T>{
    zeroValue:T
    add:(x:T,y:T)=>T
}

let myGenericNumber=new GenericNumber<number>()
myGenericNumber.zeroValue=0
myGenericNumber.add=function(x,y){
    return x+y
}
myGenericNumber.add(1,2)
console.log(myGenericNumber.add(1,2));


let stringNumberic=new GenericNumber<string>()
stringNumberic.zeroValue='guan'
stringNumberic.add=function(x,y){
    return x+y
}
stringNumberic.add('guan','yifang')
console.log(stringNumberic.add('guan','yifang'));


class BeeKeeper {
    hasMask:boolean
}
class LionKeeper {
    nametag:string
}
class Animal1 {
    numLengs:number
}
class Bee extends Animal1{
    keeper:BeeKeeper
}
class Lion extends Animal1{
    keeper:LionKeeper
}
function createInstance<T extends Animal1>(c:new()=>T):T{
    return new c()
}
console.log(createInstance(Lion).keeper);
console.log(createInstance(Bee).keeper);
