let a=3
let b=[1,2,null]
class Animals{
    numLegs:number
}
class Bees extends Animals{

}
class Lions extends Animals{

}
let zoo=[new Bees(),new Lions()]


//上下文类型
window.onmousedown=function(mouseEvent:any){
    console.log(mouseEvent.clickTime); 
}

function creacteZoo():Animals[]{
    return [new Bees(),new Lions()]
}