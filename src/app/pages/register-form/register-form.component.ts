import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  providers: [UserService],
  standalone: true,
})

export class RegisterFormComponent {

  constructor(private http:HttpClient,private router:Router,private userService:UserService){

  }

  firstName : string = ""
  lastName : string = ""
  contact : string = ""
  address : string = ""
  role : string = ""
  gender : string = ""
  email : string = ""
  password : string = ""

  createAccount(){

    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      contact: this.contact,
      address: this.address,
      role: this.role,
      gender: this.gender,
      email: this.email,
      password: this.password
    };

    console.log("Sending data:", body); 

  this.userService.getRegisterToken(body).subscribe(
    (rss) => {
      console.log('Token', rss.token);
      this.router.navigate(['/userHomePage']);
    },
    (error) => {
      console.error('Registration failed:', error);
    }
  );
  }
}
