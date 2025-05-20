import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Doctor } from '../model/Doctor';
import { User } from '../model/User';

export interface AuthenticationResponse {
  token: string;
  userId: number;
  userRole: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("Token") || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getLoginToken(email: string,password: string): Observable<AuthenticationResponse> {
    const body = { email, password };

    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`,body).pipe(
      catchError(() =>{
        return this.http.post<AuthenticationResponse>('http://localhost:8080/doctor/login',body);
      })
    )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getRegisterToken(body: any): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`,body);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getUsers(){
    return this.http.get<User[]>(`${this.baseUrl}/get-all`,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  userSearchById(id : number){
    return this.http.get<User>(`${this.baseUrl}/search-by-id?id=` + id,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateUser(body : User) : Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/update`,body,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  saveUser(body : any){
    return this.http.post<User>(`${this.baseUrl}/register`,body)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteUser(userId : number){
    return this.http.delete(`${this.baseUrl}/delete?id=` + userId,{
      headers : this.getAuthHeaders(),
      withCredentials : true
    });
  }
}
