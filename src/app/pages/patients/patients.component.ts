import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/User';

@Component({
  selector: 'app-patients',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  providers : [UserService],
  standalone : true
})

export class PatientsComponent implements OnInit{

  firstName : string = "";
  lastName : string = "";
  contact : string = "";
  address : string = "";
  role : string = "";
  gender : string = "";
  email : string = "";
  password : string = "";

  patient_firstName = "";
  patient_lastName = "";
  patient_contact = "";
  patient_address = "";
  patient_role = "PATIENT";
  patient_gender = "";
  patient_email = "";
  patient_password = "";

  users : User[] = [];

  constructor(private userService : UserService){}

  ngOnInit(): void {
      this.userService.getUsers().subscribe( (res : User[]) =>{
        this.users = res;

        res.forEach(userObject => {
            this.firstName = userObject.firstName;
            this.lastName = userObject.lastName;
            this.contact = userObject.contact;
            this.address = userObject.address;
            this.role = userObject.role;
            this.gender = userObject.gender;
            this.email = userObject.email;
            this.password = userObject.password;
        })
      })
  }

  showModel(){

    document.getElementById("modal-backdrop")?.classList.remove('hidden');

    const model = document.getElementById("patient-modal");

    if(model){
      model.classList.remove('hidden');
    }
  }

  closeModel(){
    document.getElementById("modal-backdrop")?.classList.add("hidden");

    const model = document.getElementById("patient-modal");

    if(model){
      model.classList.add("hidden");
    }
  }

  savePatient(){
    const body = {
      firstName : this.patient_firstName,
      lastName : this.patient_lastName,
      contact : this.patient_contact,
      address : this.patient_address,
      role : this.patient_role,
      gender : this.patient_gender,
      email : this.patient_email,
      password : this.patient_password
    }

    this.userService.saveUser(body).subscribe(res =>{
      console.log(res);
    })
  }

}
