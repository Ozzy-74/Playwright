class Student{
    readonly studentId:number; //can assign the value only one time,only through constructor. we cant reassign or change the value

    name:string; //regular property
    email?:string; //optional property, default value=undefined
    static schoolName:string = "Green high school"; //can call without object, coz its STATIC,shared property 

    constructor(sid:number, sName:string, Email?:string){
        this.studentId=sid;
        this.name=sName;
        this.email=Email;
    }

    //Methods

    displayInfo():void{
        console.log(`Student ID: ${this.studentId}`);
        console.log(`Student Name: ${this.name}`)

        if(this.email){
            console.log(`Email: ${this.email}`)
        }
        else{
            console.log("Email not provided")
        }
        console.log(Student.schoolName)
    }

    static changeSchoolName(sclName:string){
        Student.schoolName=sclName
    }
}

const student1 = new Student(1,"kanye west","ye@gmail.com")
// student1.displayInfo()
// student1.name = "ye"
// student1.displayInfo()

Student.changeSchoolName("sunrise school")
student1.displayInfo()