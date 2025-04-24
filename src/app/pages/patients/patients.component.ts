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

  constructor(private userService : UserService){}

  ngOnInit(): void {
      this.userService.getUsers().subscribe( (res : User[]) =>{
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

  }

}
