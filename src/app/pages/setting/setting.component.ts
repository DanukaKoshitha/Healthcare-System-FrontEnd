import { User } from './../../model/User';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/UserService';

@Component({
  selector: 'app-setting',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
  providers : [UserService]
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

  constructor(private userService : UserService){}

  ngOnInit(): void {
      this.userService.userSearchById(Number(localStorage.getItem("UserId"))).subscribe(res =>{

        if(res != null){
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.contact = res.contact;
        this.address = res.address;
        this.role = res.role;
        this.gender = res.gender;
        this.email = res.email;
        this.password = res.password;
        }else{
          console.log("Doctor");
          
        }
    })
  }

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

}
