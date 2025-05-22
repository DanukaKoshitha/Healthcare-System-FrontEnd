import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../model/Appointment";
import { Observable } from "rxjs";
import { Doctor } from "../model/Doctor";

@Injectable({
  providedIn: 'root'
})

export class AppointmentService{

  private baseUrl = 'http://localhost:8080/appointment';

  constructor(private http:HttpClient){}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("Token") || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  createAppointment(body : any): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.baseUrl}/save`,body);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllAppointments(userId : number) : Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/get-all?userId=`+ userId);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllForAdmin() : Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/get-all-forAdmin`);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateAppointmentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-appointment-status?appointmentId=${id}&status=${status}`, {});
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getDoctorById(doctorId : number) :Observable<Doctor>{
    return this.http.get<Doctor>('http://localhost:8080/doctor/search-by-id?id='+ doctorId , {
      headers : this.getAuthHeaders(),
      withCredentials : true
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteAppointment(id : number){
    return this.http.delete(`${this.baseUrl}/delete?id=` + id , {
      headers : this.getAuthHeaders(),
      withCredentials : true
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  createPayment(price : number) : Observable<any>{
    const body = {
      appointmentId : localStorage.getItem("AppointmentId"),
      userId : localStorage.getItem("UserId"),
      amount : price,
      currency : "LKR"
    }

    return this.http.post('http://localhost:8080/payment/pay',body)
  }

}
