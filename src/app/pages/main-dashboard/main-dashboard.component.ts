import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/UserService';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-main-dashboard',
  imports: [RouterLink,HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
  providers:[UserService]
})

export class MainDashboardComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /////////////////////////  Login part   /////////////////////////////////

  email:string = "";
  password:string = "";

  login() {
    this.userService.getLoginToken(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful, User Login token:', response.token);
        localStorage.setItem("Token" , response.token);

        console.log(response.userId);
        localStorage.setItem("UserId",response.userId.toString());

        if(response.userRole == null){
          localStorage.setItem("UserRole","Doctor");
        }else if(response.userRole == "PATIENT"){
          localStorage.setItem("UserRole","Patient");
        }else{
          localStorage.setItem("UserRole","Admin");
        }

        this.router.navigate(['/userHomePage']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.showModal();
      }
    );
  }

  showModal() {
    const modal = document.getElementById('error-modal');

    if (modal) {
      modal.classList.remove('hidden', 'opacity-0');
      modal.classList.add('opacity-100');
    }
  }

  closeModal() {
    const modal = document.getElementById('error-modal');

    if (modal) {
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }
  }
}
