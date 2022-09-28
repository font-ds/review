class Person{
    protected name:string
    constructor(name:string){
        this.name=name
    }
}

class Employee extends Person{
    private department:string
    constructor(name:string,department:string){
        super(name)
        this.department=department
    }
    getElevatorPitch(){
        return `my name is ${this.name}`
    }
}

let howard=new Employee('Howard','Sales')
console.log(howard.getElevatorPitch());
// console.log(howard.name);

let john=new Person('john')

