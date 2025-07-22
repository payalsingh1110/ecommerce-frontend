import { Injectable } from '@angular/core';

const TOKEN = "ecom-token";
const USER = "ecom-user";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));  
  }

 
  static getToken(): string {
   //  console.log(" Token from storage:", localStorage.getItem(TOKEN));
    return localStorage.getItem(TOKEN) ?? '';
  }

 
  static getUser(): any {
  const userStr = localStorage.getItem(USER);
  return userStr ? JSON.parse(userStr) : null;
  }

  static getUserId(): string |null {      
      const user = this.getUser();
      return user ? user.userId : null;
  }

   static getUserRole(): string | null {
      const user = this.getUser();
      return user? user.role : null;
  }



  static isAdminLoggedIn(): boolean{
    if(this.getToken()=== null) return false;

    const role:string = this.getUserRole();
    return role == 'ADMIN';
  }

   static isCustomerLoggedIn(): boolean{
    if(this.getToken()=== null) return false;

    const role:string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
  
}
