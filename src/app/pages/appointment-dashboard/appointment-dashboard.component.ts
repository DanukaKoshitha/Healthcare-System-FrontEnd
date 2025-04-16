import { UserService } from './../../service/UserService';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../model/Doctor';
import { AppointmentService } from '../../service/AppointmentService';
import { TimeSlot } from '../../model/TimeSlot';
import { Appointment } from '../../model/Appointment';

@Component({
  selector: 'app-appointment-dashboard',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './appointment-dashboard.component.html',
  styleUrl: './appointment-dashboard.component.css',
  providers:[UserService,AppointmentService],
  standalone:true
})

export class AppointmentDashboardComponent implements OnInit{

  constructor(private userService: UserService , private http: HttpClient,private appointmentService:AppointmentService){
  }

  doctors : Doctor[] = [];
  selectedDoctor : Doctor | null = null;

  id : number = 0;
  doctorId: number = 0;
  userId : number = Number(localStorage.getItem("UserId"));
  date : string = "";
  timeSlot : string = "";
  status :string = "PENDING";

  selectedTimeSlot(timeSlot: TimeSlot){
    this.timeSlot = timeSlot.day + " " + timeSlot.startTime + " - " + timeSlot.endTime;
  }

  newAppointment(){

    const body = {
      doctorId : this.doctorId,
      userId : this.userId,
      date : this.date,
      timeSlot : this.timeSlot,
      status : this.status
    }

    this.appointmentService.createAppointment(body).subscribe(
      (response) =>{console.log("Successfull " + response);
      },
      (error) => {
        console.log("Error" , error);
      }
    );

  }

  ngOnInit() {
    this.userService.getDoctors().subscribe((res : Doctor[]) =>{
        this.doctors  =  res;
    }, error => {
      console.error("Error fetching doctors:", error);
    });
  }

  showModel(doctor : Doctor){
    this.selectedDoctor = doctor;
    this.doctorId = doctor.id;

    document.getElementById('modal-backdrop')?.classList.remove('hidden');

    const model = document.getElementById("extralarge-modal");
    if(model){
      model.classList.remove("hidden");
    }
  }

  closeModel(){
    this.selectedDoctor = null;

    document.getElementById('modal-backdrop')?.classList.add('hidden');

    const model =  document.getElementById("extralarge-modal");
    if(model){
      model.classList.add("hidden");
    }
  }
}


