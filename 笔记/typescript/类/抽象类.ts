abstract class Department {
    name:string

    constructor(name:string){
        this.name=name
    }

    printName():void{
        console.log(this.name);    
    }

    abstract printMeeting():void
}

class AccountingDepartment extends Department {
    constructor() {
        super(`ad Auditing`)
    }
    printMeeting():void{
        console.log('The Accounting Department meets each Monday at 10am');
        
    }
    genterateReports():void{
        console.log('Generating accounting reports...');
        
    }
}

let department:Department
department=new AccountingDepartment()
department.printMeeting()
department.printName()
// department.genterateReports()