import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model/Doctor';
import { DoctorService } from '../../service/DoctorService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
  providers : [DoctorService]
})

export class DoctorsComponent implements OnInit{

  constructor(private doctorService : DoctorService){}

  doctors : Doctor[] = [];
  selectedDoctor : Doctor | null = null;

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((res : Doctor[]) =>{
      this.doctors = res;
    })
  }

  showModel(doctor : Doctor){
    this.selectedDoctor = doctor;
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

  showDoctorAddModel(){
    document.getElementById('modal-backdrop')?.classList.remove('hidden');

    const model = document.getElementById("doctorAdding-modal");
    if(model){
      model.classList.remove("hidden");
    }
  }

  closeDoctorAddingModel(){
    this.selectedDoctor = null;
    document.getElementById('modal-backdrop')?.classList.add('hidden');

    const model =  document.getElementById("doctorAdding-modal");
    if(model){
      model.classList.add("hidden");
    }
  }

}
