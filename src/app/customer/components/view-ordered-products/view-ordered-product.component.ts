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

  // getOrderedProductDetailsbyOrderId() {
  //   console.log("call inside this");
  //   this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
  //   console.log(' FULL API RESPONSE:', res);  //  Add this line!

  //   if (res) {
  //     this.totalAmount = res.orderAmount;

  //     if (res.productDtoList && res.productDtoList.length > 0) {
  //       this.orderedProductDetailsList = res.productDtoList.map(product => ({
  //         ...product,
//           processedImg: 'data:image/jpeg;base64,' + product.byteImg
//         }));
//       } else {
//         console.warn(' productDtoList is empty or missing.');
//       }
//     } else {
//       console.error(' API response is null or undefined!');
//     }
//   });
// }

// 

//   this.customerService.getOrderedProducts(this.orderId).subscribe({
//     next: res => {
//       console.log(' FULL API RESPONSE:', res);
//       console.log('Dto length', res.productDtoList.length );

//       if (res) {
//         this.totalAmount = res.orderAmount;

//         if (res.productDtoList && res.productDtoList.length > 0) {
//           this.orderedProductDetailsList = res.productDtoList.map(product => ({
//             ...product,
//             processedImg: 'data:image/jpeg;base64,' + product.byteImg
//           }));
//         } else {
//           console.warn(' productDtoList is empty or missing.');
//         }
//       } else {
//         console.error(' API response is null or undefined!');
//       }
//     },
//     error: err => {
//       console.error(' Error while fetching ordered products:', err);
//     }
//   });
// }

}





