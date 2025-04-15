import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../model/Appointment";

@Injectable({
  providedIn: 'root'
})

export class AppointmentService{

  constructor(private http:HttpClient){}

  createAppointment(body : Appointment){
    return this.http.post('http://localhost:8080/appointment/save',body);
  }
}
