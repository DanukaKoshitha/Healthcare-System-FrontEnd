import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/AppointmentService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../model/Appointment';
import { Doctor } from '../../model/Doctor';
import { UserService } from '../../service/UserService';
import { User } from '../../model/User';

@Component({
  selector: 'app-user-dash-board',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './user-dash-board.component.html',
  styleUrl: './user-dash-board.component.css',
  providers : [AppointmentService,UserService],
  standalone : true
})

export class UserDashBoardComponent implements OnInit{

  constructor(private appointmentService: AppointmentService , private userService : UserService){}

  appointmentList : Appointment[] = [];
  doctorMap : Map<number, Doctor> = new Map();
  userRole : string = "";

  ngOnInit() {
      this.appointmentService.getAllForAdmin().subscribe((res : Appointment[]) =>{
        this.appointmentList.push(...res)

        const doctorIds = [...new Set(res.map(a => a.doctorId))];

        doctorIds.forEach(id => {
            this.appointmentService.getDoctorById(id).subscribe((doc : Doctor) =>{
                this.doctorMap.set(id , doc);
            })
        });
      });

      this.userService.userSearchById(Number(localStorage.getItem("UserId"))).subscribe((res : User) =>{
        this.userRole = res.role;
      })
  }

  deleteAppointment(id : number){
    this.appointmentService.deleteAppointment(id).subscribe({
      next : (res) =>{
        if (res === true) {
          this.appointmentList = this.appointmentList.filter(appointment => appointment.id !== id);
        } else {
          console.error("Failed to delete appointment.");
        }
      },
      error: err => {
        console.error("Error deleting appointment:", err);
      }
    })
  }

  confirmAppointment(id: number) {
    this.appointmentService.updateAppointmentStatus(id, 'APPROVE').subscribe({
      next: () => {
        const appointment = this.appointmentList.find(a => a.id === id);
        if (appointment) {
          appointment.status = 'CONFIRMED';
        }
      },
      error: err => {
        console.error('Error confirming appointment:', err);
      }
    });
  }

  rejectAppointment(id: number) {
    this.appointmentService.updateAppointmentStatus(id, 'REJECT').subscribe({
      next: () => {
        const appointment = this.appointmentList.find(a => a.id === id);
        if (appointment) {
          appointment.status = 'REJECTED';
        }
      },
      error: err => {
        console.error('Error rejecting appointment:', err);
      }
    });
  }
}
