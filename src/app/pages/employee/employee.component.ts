import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../service/UserService';
import { User } from '../../model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers : [UserService],
  standalone : true
})

export class EmployeeComponent {
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

  ////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
      this.userService.getUsers().subscribe( (res : User[]) =>{

        res.forEach(userObject => {

          if(userObject.role == "ADMIN"){
            this.users.push(userObject);
          }

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

  ////////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////////

  saveAdmin(){
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

    this.userService.saveUser(body).subscribe({
      next:(res) =>{
        console.log("Success!");
      },
      error : (err) =>{
        console.log("Error while saving user",err);
      }
    })

    window.location.reload();
  }

  ////////////////////////////////////////////////////////////////////////////////

  showUserDeatails(userId : number){

    localStorage.setItem("PatientId",userId+"");

    document.getElementById("modal-backdrop")?.classList.remove('hidden');

    const model = document.getElementById("patient-Details-modal");

    if(model){
      model.classList.remove('hidden');
    }

    this.userService.userSearchById(userId).subscribe(res =>{
      this.patient_firstName = res.firstName;
      this.patient_lastName = res.lastName;
      this.patient_contact = res.contact;
      this.patient_address = res.address;
      this.patient_gender = res.gender;
      this.patient_role = res.role;
      this.patient_email = res.email;
      this.patient_password = res.password
    })
  }

  closeUserDeatilsModel(){

    localStorage.removeItem("PatientId");

    document.getElementById("modal-backdrop")?.classList.add("hidden");

    const model = document.getElementById("patient-Details-modal");

    if(model){
      model.classList.add("hidden");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  updateAdmin(){
    const body = {
      id:Number(localStorage.getItem("PatientId")),
      firstName : this.patient_firstName,
      lastName : this.patient_lastName,
      contact : this.patient_contact,
      address : this.patient_address,
      role : this.patient_role,
      gender : this.patient_gender,
      email : this.patient_email,
      password : this.patient_password
    }

    this.userService.updateUser(body).subscribe(res =>{
      this.patient_firstName = res.firstName;
      this.patient_lastName = res.lastName;
      this.patient_contact = res.contact;
      this.patient_address = res.address;
      this.patient_gender = res.gender;
      this.patient_role = res.role;
      this.patient_email = res.email;
      this.patient_password = res.password
    })

    window.location.reload();
  }

  ////////////////////////////////////////////////////////////////////////////////

  deleteAdmin(){

    this.userService.deleteUser(Number(localStorage.getItem("PatientId"))).subscribe(res =>{
      console.log(res);

    })
    window.location.reload();
  }

}

