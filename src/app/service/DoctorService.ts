import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../model/Doctor";

@Injectable({
  providedIn : "root"
})

export class DoctorService{

  constructor(private http:HttpClient){}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  getDoctors(): Observable<Doctor[]> {

    const token = localStorage.getItem("Token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Doctor[]>('http://localhost:8080/doctor/get-all', {
      headers: headers,
      withCredentials: true
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  doctorRegister(body : any) {
    return this.http.post<Doctor[]>('http://localhost:8080/doctor/register', body);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteDoctorById(id : number){

    const token = localStorage.getItem("Token");

    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });

    return this.http.delete('http://localhost:8080/doctor/delete?id=' + id,{
      headers : header,
      withCredentials : true
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  updateDoctor(body :Doctor){

    const token = localStorage.getItem("Token");

    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });

    return this.http.put<Doctor>('http://localhost:8080/doctor/update',body,{
      headers : header,
      withCredentials : true
    });
  }

}







