import { Qualification } from "./Qualification";
import { TimeSlot } from "./TimeSlot";

export class Doctor{

  id: number;
  name: string;
  contact: string;
  address: string;
  specialization: string;
  qualifications: Qualification[];
  timeSlots: TimeSlot[];
  image: string;
  email: string;
  password : string;
  yearsOfExperience: number;
  price: number;

  constructor(id:number,name:string,contact: string, address: string, specialization: string, qualifications: Qualification[],timeSlots: TimeSlot[],image: string,email : string,password : string ,yearsOfExperience : number, price : number ){
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.specialization = specialization;
    this.qualifications = qualifications;
    this.timeSlots = timeSlots;
    this.image = image;
    this.email = email;
    this.password = password
    this.yearsOfExperience = yearsOfExperience;
    this.price = price;
  }
}
