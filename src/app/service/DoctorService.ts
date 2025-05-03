import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../model/Doctor";

@Injectable({
  providedIn : "root"
})

export class DoctorService{

  private baseUrl = 'http://localhost:8080/doctor';

  constructor(private http:HttpClient){}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("Token") || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/get-all`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  doctorRegister(body : any) {
    return this.http.post<Doctor[]>(`${this.baseUrl}/register`, body);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteDoctorById(id : number){
    return this.http.delete(`${this.baseUrl}/delete?id=` + id,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  updateDoctor(body :Doctor){
    return this.http.put<Doctor>(`${this.baseUrl}/update`,body,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    });
  }
}







