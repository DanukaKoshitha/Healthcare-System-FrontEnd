import { HttpClientModule } from '@angular/common/http';
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
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
  providers: [DoctorService],
  standalone: true
})
export class DoctorsComponent implements OnInit {

  constructor(private doctorService : DoctorService){}

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  async saveDoctor() {
    if (!this.selectedFile) {
      alert('Please select a profile image');
      return;
    }

    if (!this.Doctor_image) {
      this.Doctor_image = await this.convertFileToBase64(this.selectedFile);
    }

    const body = {
      name: this.fullName,
      contact: this.Doctor_contact,
      address: this.Doctor_address,
      specialization: this.Doctor_specialization,
      qualifications: this.Doctor_qualifications,
      timeSlots: this.Doctor_timeSlots,
      image: this.Doctor_image,
      email: this.Doctor_email,
      password: this.Doctor_password,
      yearsOfExperience: this.Doctor_yearsOfExperience,
      price: this.Doctor_price
    };

    console.log(body);

    this.doctorService.doctorRegister(body).subscribe(
      (res) => {
        console.log('Registration successful', res);
        this.closeDoctorAddingModel();
        this.resetForm();
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private resetForm() {
    this.fullName = '';
    this.Doctor_contact = '';
    this.Doctor_address = '';
    this.Doctor_specialization = '';
    this.Doctor_qualifications = [];
    this.Doctor_timeSlots = [];
    this.Doctor_email = '';
    this.Doctor_password = '';
    this.Doctor_yearsOfExperience = 0;
    this.Doctor_price = 0;
    this.selectedFile = null;
    this.Doctor_image = '';
  }
}
