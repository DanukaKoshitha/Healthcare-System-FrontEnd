import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Doctor } from '../model/Doctor';

export interface AuthenticationResponse {
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}

  getLoginToken(email: string,password: string): Observable<AuthenticationResponse> {
    const body = { email, password };

    return this.http.post<AuthenticationResponse>('http://localhost:8080/user/login',body).pipe(
      catchError(() =>{
        return this.http.post<AuthenticationResponse>('http://localhost:8080/doctor/login',body);
      })
    )
  }

  getRegisterToken(body: any): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('http://localhost:8080/user/register',body);
  }

  getDoctors(): Observable<Doctor[]> {
    const token = localStorage.getItem("Token");

    if (!token) {
      return throwError(() => new Error("Unauthorized!"));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Doctor[]>('http://localhost:8080/doctor/get-all', {
      headers: headers,
      withCredentials: true  // Important for CORS with credentials
    }).pipe(
      catchError(error => {
        console.error('Error fetching doctors:', error);
        return throwError(() => error);
      })
    );
  }
}
