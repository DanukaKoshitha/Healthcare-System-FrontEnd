import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/UserService';
import { DoctorService } from '../../service/DoctorService';
import { Qualification } from '../../model/Qualification';

export interface TimeSlot {
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-setting',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
  providers : [UserService,DoctorService]
})

export class SettingComponent implements OnInit{

  firstName : string = ""
  lastName : string = ""
  contact : string = ""
  address : string = ""
  role : string = ""
  gender : string = ""
  email : string = ""
  password : string = ""

  userRole : string | null = "";

    fullName : string = "";
    Doctor_contact : string = "";
    Doctor_address : string = "";
    Doctor_specialization : string = "";
    Doctor_qualifications : Qualification[] = [];
    Doctor_timeSlots : TimeSlot[] = [];
    Doctor_image : string = "";
    Doctor_email : string = "";
    Doctor_password : string = "";
    Doctor_yearsOfExperience : number = 0;
    Doctor_price : number = 0.0;

  degree : string = "";
  institution : string = "";
  year : number = 0;

  day : string = "";
  startTime : string = "";
  endTime : string = "";


  constructor(private userService : UserService , private doctorService : DoctorService, private http : HttpClient){}

  ngOnInit(): void {

    this.userRole  = localStorage.getItem("UserRole");

    if(this.userRole == "Doctor"){
      this.doctorService.doctorSearchById(Number(localStorage.getItem("UserId"))).subscribe(res =>{
        this.fullName = res.name;
        this.Doctor_contact = res.contact;
        this.Doctor_address = res.address;
        this.Doctor_specialization = res.specialization;
        this.Doctor_qualifications = res.qualifications;
        this.Doctor_timeSlots = res.timeSlots;
        this.Doctor_image = res.image;
        this.Doctor_email = res.email;
        this.Doctor_password = res.password;
        this.Doctor_yearsOfExperience = res.yearsOfExperience;
        this.Doctor_price = res.price;
      })
    }else{
      this.userService.userSearchById(Number(localStorage.getItem("UserId"))).subscribe(res =>{

        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.contact = res.contact;
        this.address = res.address;
        this.role = res.role;
        this.gender = res.gender;
        this.email = res.email;
        this.password = res.password;
      }
    )}
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  update(){

    const body = {
      id : Number(localStorage.getItem("UserId")),
      firstName : this.firstName,
      lastName : this.lastName,
      contact : this.contact,
      address : this.address,
      role : this.role,
      gender : this.gender,
      email : this.email,
      password : this.password
    }

    this.userService.updateUser(body).subscribe(res => {
      console.log(res);
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

    addQualification(){
      this.Doctor_qualifications.push({
        name : this.degree,
        institution : this.institution,
        yearObtained : this.year
      })
    }
  
    addTime(){
      this.Doctor_timeSlots.push({
        day: this.day.toUpperCase() as TimeSlot['day'],
        startTime : this.startTime,
        endTime : this.endTime
      })
    }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'doctor_image');
    formData.append('cloud_name', 'dm1y9uqld');

    this.http.post('https://api.cloudinary.com/v1_1/dm1y9uqld/image/upload', formData)
      .subscribe((res: any) => {
        this.Doctor_image = res.secure_url;
        console.log('Image uploaded. URL:', this.Doctor_image);
      });
  }  

}
