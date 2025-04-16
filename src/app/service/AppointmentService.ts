import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../model/Appointment";
import { Observable } from "rxjs";
import { Doctor } from "../model/Doctor";

@Injectable({
  providedIn: 'root'
})

export class AppointmentService{

  constructor(private http:HttpClient){}

  createAppointment(body : any){
    return this.http.post('http://localhost:8080/appointment/save',body);
  }

  getAllAppointments() : Observable<Appointment[]>{
    return this.http.get<Appointment[]>('http://localhost:8080/appointment/get-all');
  }

  getDoctorById(doctorId : number) :Observable<Doctor>{

    const token = localStorage.getItem("Token");

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
      'Content-Type': 'application/json'
    })

    return this.http.get<Doctor>('http://localhost:8080/doctor/search-by-id?id='+doctorId , {
      headers : headers,
      withCredentials : true
    })
  }

  deleteAppointment(id : number){

    const token = localStorage.getItem("Token");

    const headers = new HttpHeaders({
      'Authorization' :  `Bearer ${token}`,
      'Content-Type' : 'application/json'
    })

    return this.http.delete('http://localhost:8080/appointment/delete?id=' + id , {
      headers : headers,
      withCredentials : true
    })
  }
}
