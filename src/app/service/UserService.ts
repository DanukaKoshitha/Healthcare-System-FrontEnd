import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface AuthenticationResponse {
  token: string;
}

@Injectable({
    providedIn:"root"
})

export class UserService{

    constructor(private http:HttpClient){

    }

    getToken(email:string , password:string):Observable<AuthenticationResponse>{
        const body = {email,password}
        return this.http.post<AuthenticationResponse>("http://localhost:8080/user/login",body)
    }
}
