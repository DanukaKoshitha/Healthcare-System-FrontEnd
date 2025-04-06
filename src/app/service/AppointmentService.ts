import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AppointmentService{

  constructor(private http:HttpClient){}

  createAppointment(body : any){

    return this.http.post('http://localhost:8080/appointment/save',body);
  }
}
