import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
const BASIC_URL = "http://localhost:8080/";
const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL + "auth/sign-up", signupRequest);
  }

  // login(username: string, password: string):any{          
  //   const headers= new HttpHeaders().set('Content-type', 'application/json');
  //   const body = {username,password};

  //   return this.http.post(BASIC_URL + 'authenticate', body, {headers,observe: 'response'}).pipe(
  //     map((res) =>{
  //       const token = res.headers.get('authorization').substring(7);
  //       const user = res.body;

  //       if(token && user){
  //         this.userStorageService.saveToken(token);
  //         this.userStorageService.saveUser(user);
  //         return true;
  //       }
  //       return false;
  //     })      
      
  //   )
  // }

  // <!-- improve code-->
login(username: string, password: string): Observable<boolean> {
  const headers = new HttpHeaders().set('Content-type', 'application/json');
  const body = { username, password };
  console.log("login detail:", body.username);

  return this.http.post(BASIC_URL + 'auth/authenticate', body, { headers, observe: 'response' }).pipe(
    map((res) => {
      const authHeader = res.headers.get('Authorization');

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const user = res.body;

        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
      }

      return false;
    })
  );
}

//        <!-- tracking order code-->


  getOrderByTrackingId(trackingId: string): Observable<any> {
    return this.http.get(BASIC_URL +`order/${trackingId}`);
  }


}
