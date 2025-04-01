export class User{
    id:number;
    fistName:string;
    lastName:string;
    contact:string;
    address:string;
    role:string;
    gender:string;
    email:string;
    password:string;

    constructor(id:number,fistName:string,lastName:string,contact:string,address:string,role:string,gender:string,email:string,password:string){
        this.id = id;
        this.fistName = fistName;
        this.lastName = lastName;
        this.contact = contact;
        this.address = address;
        this.role = role;
        this.gender = gender;
        this.email = email;
        this.password = password; 
    }
}
