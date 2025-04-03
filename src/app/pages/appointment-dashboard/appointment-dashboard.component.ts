import { UserService } from './../../service/UserService';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../model/Doctor';

@Component({
  selector: 'app-appointment-dashboard',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './appointment-dashboard.component.html',
  styleUrl: './appointment-dashboard.component.css',
  providers:[UserService],
  standalone:true
})

export class AppointmentDashboardComponent implements OnInit{

  constructor(private userService: UserService , private http: HttpClient){
  }

  doctors : Doctor[] = [];
  selectedDoctor : Doctor | null = null;

  ngOnInit() {
    this.userService.getDoctors().subscribe((res : Doctor[]) =>{
        this.doctors  =  res;
    }, error => {
      console.error("Error fetching doctors:", error);
    });
  }

  showModel(doctor : Doctor){
    this.selectedDoctor = doctor;
    const model = document.getElementById("extralarge-modal");
    if(model){
      model.classList.remove("hidden");
    }
  }

  closeModel(){
    this.selectedDoctor = null;
    const model =  document.getElementById("extralarge-modal");
    if(model){
      model.classList.add("hidden");
    }
  }
}


