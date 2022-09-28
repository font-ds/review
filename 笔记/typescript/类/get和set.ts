let password='123456'

class Employees{
    private _fullName:string
    get fullName():string{
        return this._fullName
    }
    set fullName(name:string){
        if(password&&password==='123456') this._fullName=name
        else console.log('error');
        
    }
}
let employee=new Employees()
employee.fullName='bob'
if(employee.fullName){
    console.log(employee.fullName);
}