import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css'
})
export class UserHomePageComponent {

  constructor(private router : Router){}

  signout(){
    localStorage.removeItem("Token");
    localStorage.clear();

    window.location.href = '/';
  }
}
