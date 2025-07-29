import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-product',
  standalone: false,
  templateUrl: './view-ordered-product.component.html',
  styleUrl: './view-ordered-product.component.scss'
})
export class ViewOrderedProductComponent {

  orderId:any ;
  orderedProductDetailsList =[];
  totalAmount:number;

  constructor(
    private activatedroute: ActivatedRoute,
    private customerService: CustomerService,
  ){}


  ngOnInit(){
    console.log('Inside ngOnInit'); 
    this.orderId= this.activatedroute.snapshot.params['orderId'];
    console.log(' orderId:', this.orderId);  
    this.getOrderedProductDetailsbyOrderId();
  }


  getOrderedProductDetailsbyOrderId(){
    this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
      res.productDtoList.forEach(element =>{
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
      console.log(res);
    })
  }

}





