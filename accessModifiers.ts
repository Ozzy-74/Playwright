class Person{
    public name: string; //access anywhere
    protected age: number; //access within the class or child class
    private ssn: number; //access only within the class


    constructor(name:string, age:number, ssn:number){
        this.name = name;
        this.age = age;
        this.ssn = ssn;
    }

    displayInfo(){
        console.log(`name: ${this.name}, age: ${this.age}, ssn: ${this.ssn}`)
    }
}

class Employee extends Person{
    private empId:number;

    constructor(name:string, age:number, ssn:number,empID:number){
        super(name,age,ssn)
        this.empId = empID;
    }

    showEmp(){
        console.log(this.name)
        console.log(this.age)
        console.log(this.empId)
    }
}

const emp1 = new Employee("YETI", 24, 123456, 101)
emp1.displayInfo()
emp1.showEmp()