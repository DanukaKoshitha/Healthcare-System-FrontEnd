import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model/Doctor';
import { DoctorService } from '../../service/DoctorService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Qualification } from '../../model/Qualification';

export interface TimeSlot {
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
  providers : [DoctorService],
  standalone : true
})

export class DoctorsComponent implements OnInit{

  constructor(private doctorService : DoctorService , private http : HttpClient){}

  doctors : Doctor[] = [];
  selectedDoctor : Doctor | null = null;
  selectedFile: File | null = null;


  fullName : string = "";
  Doctor_contact : string = "";
  Doctor_address : string = "";
  Doctor_specialization : string = "";
  Doctor_qualifications : Qualification[] = [];
  Doctor_timeSlots : TimeSlot[] = [];
  Doctor_image : string = "";
  Doctor_email : string = "";
  Doctor_password : string = "";
  Doctor_yearsOfExperience : number = 0;
  Doctor_price : number = 0.0;

  degree : string = "";
  institution : string = "";
  year : number = 0;

  day : string = "";
  startTime : string = "";
  endTime : string = "";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((res : Doctor[]) =>{
      this.doctors = res;
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  showModel(doctor : Doctor){

    localStorage.setItem("DoctorId",doctor.id+"");

    this.selectedDoctor = doctor;

    document.getElementById('modal-backdrop')?.classList.remove('hidden');

    const model = document.getElementById("extralarge-modal");

    if(model){
      model.classList.remove("hidden");
    }
  }

  closeModel(){

    localStorage.removeItem("DoctorId");

    this.selectedDoctor = null;

    document.getElementById('modal-backdrop')?.classList.add('hidden');

    const model =  document.getElementById("extralarge-modal");

    if(model){
      model.classList.add("hidden");
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  deleteDoctor(){
    this.doctorService.deleteDoctorById(Number(localStorage.getItem("DoctorId"))).subscribe(res =>{
      console.log(res);
    });

    window.location.reload();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////////////////////////////////////

  addQualification(){
    this.Doctor_qualifications.push({
      name : this.degree,
      institution : this.institution,
      yearObtained : this.year
    })
  }

  addTime(){
    this.Doctor_timeSlots.push({
      day: this.day.toUpperCase() as TimeSlot['day'],
      startTime : this.startTime,
      endTime : this.endTime
    })
  }

  saveDoctor(){

    const body = {
      name : this.fullName,
      contact : this.Doctor_contact,
      address : this.Doctor_address,
      specialization : this.Doctor_specialization,
      qualifications : this.Doctor_qualifications,
      timeSlots : this.Doctor_timeSlots,
      image : this.Doctor_image,
      email : this.Doctor_email,
      password : this.Doctor_password,
      yearsOfExperience : this.Doctor_yearsOfExperience,
      price : this.Doctor_price
    }

    this.doctorService.doctorRegister(body).subscribe(res => {
      console.log(res);
    })

    window.location.reload();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'doctor_image');
    formData.append('cloud_name', 'dm1y9uqld');

    this.http.post('https://api.cloudinary.com/v1_1/dm1y9uqld/image/upload', formData)
      .subscribe((res: any) => {
        this.Doctor_image = res.secure_url;
        console.log('Image uploaded. URL:', this.Doctor_image);
      });
  }

}
