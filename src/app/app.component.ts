import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { MainDashboardComponent } from "./pages/main-dashboard/main-dashboard.component";
import { PagesComponent } from "./pages/pages.component";
import { RegisterFormComponent } from "./pages/register-form/register-form.component";
import { LoginFormComponent } from "./pages/login-form/login-form.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MainDashboardComponent, PagesComponent, RegisterFormComponent, LoginFormComponent,RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}