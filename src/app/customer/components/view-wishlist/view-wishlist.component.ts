import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-wishlist',
  standalone: false,
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent {

  products: any[] = [];

  constructor( private customerService: CustomerService){}

  ngOnInit(){
    console.log("inside ngOninit");
    this.getWishlistByUserId();
  }

  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res=>{
      console.log(res);
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);     
        
      })
    })
  }

 



}
