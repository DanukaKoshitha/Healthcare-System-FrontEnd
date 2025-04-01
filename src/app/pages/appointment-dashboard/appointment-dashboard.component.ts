import { UserService } from './../../service/UserService';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  showModel(doctor: any) {
    this.selectedDoctor = doctor;
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('extralarge-modal');

    if (backdrop && modal) {
      backdrop.classList.remove('hidden');
      modal.classList.remove('hidden');

      document.body.classList.add('overflow-hidden');
    }
  }

  closeModel() {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('extralarge-modal');

    if (backdrop && modal) {
      backdrop.classList.add('hidden');
      modal.classList.add('hidden');
      
      document.body.classList.remove('overflow-hidden');
    }
  }
}


