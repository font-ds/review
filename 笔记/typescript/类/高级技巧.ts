class  Greeter {
    static standardGreetin='Hello,there'
    greeting:string
    constructor(message?:string) {
        if(message)this.greeting=message
        else this.greeting=Greeter.standardGreetin
        
    }
    greet(){
        return this.greeting
    }
}

let greeter:Greeter
greeter=new Greeter()
console.log(greeter.greet());

let greeterMaker:typeof Greeter=Greeter
greeterMaker.standardGreetin='hey there'

let greeter2:Greeter
greeter2=new Greeter()
console.log(greeter2.greet());
