import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient) { }


  addCategory(categoryDto:any) : Observable<any>{
      return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
        headers : this.createAuthorizationHeader(),
      })
  }

  getAllCategories() : Observable<any>{
      return this.http.get(BASIC_URL + 'api/admin', {
        headers : this.createAuthorizationHeader(),
      })
  }

  addProduct(productDto:any) : Observable<any>{
      return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
        headers : this.createAuthorizationHeader()
      })
  }

  getAllProducts() : Observable<any>{
      return this.http.get(BASIC_URL + 'api/admin/products', {
        headers : this.createAuthorizationHeader(),
      })
  }

  getAllProductsByName(name: any) : Observable<any>{
      return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
        headers : this.createAuthorizationHeader(),
      })
  }

  deleteProduct(productId:any) : Observable<any>{
      return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
        headers : this.createAuthorizationHeader(),
      })
  }

  private createAuthorizationHeader(): HttpHeaders{
     const token = UserStorageService.getToken();  //Should NOT be a static method unless your service is purely static
    //  console.log("Sending token:", token);         good for debug
    return new HttpHeaders().set('Authorization', 'Bearer ' + token );     //  space added here after bearer
   
  }
}
