import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-home-page',
  imports: [RouterLink,RouterOutlet,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css',
  providers : [UserService],
  standalone : true
})

export class UserHomePageComponent implements OnInit{

  constructor(private router : Router , private userService : UserService){}

  signout(){
    localStorage.removeItem("Token");
    localStorage.clear();

    window.location.href = '/';
  }

  userRole : string = "";

  ngOnInit(): void {
      this.userService.userSearchById(Number(localStorage.getItem("UserId"))).subscribe(res => {
            this.userRole = res.role;
      })
  }

}
