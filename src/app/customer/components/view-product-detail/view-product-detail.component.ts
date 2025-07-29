import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-view-product-detail',
  standalone: false,
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {

  productId: number;
  product:any;
  FAQS: any[]=[];
  reviews:any[]=[];


  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedroute: ActivatedRoute
  ){}

  ngOnInit(){
    this.productId = this.activatedroute.snapshot.params['productId'];
    this.getProductDetailById();
  }

  getProductDetailById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res=>{
      this.product= res.productDto;
      this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;

      this.FAQS = res.faqDtoList;

      res.reviewDtoList.forEach(element=>{
        element.processedImg =  'data:image/png;base64,' + element.returnedImg;
        this.reviews.push(element);
      })
      console.log(res);
    })
  }



}
