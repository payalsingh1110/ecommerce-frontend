import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems : any []=[];
  order: any;

   couponForm!: FormGroup;

 


  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,){}


  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ['',Validators.required]
    });
    this.getCart();
  }

  applyCoupon():void{
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res=>{
      this.snackBar.open("Coupon Applied Successfully", 'Close',{duration:5000});
      this.getCart();
    },error=>{
      this.snackBar.open(error.error,'Close', {duration:5000});
    })
  }

  getCart(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res =>{
      this.order = res;
      res.cartItems.forEach(element => {
        element.processedImg = "data:image/jpeg;base64,"+ element.returnedImg;
        this.cartItems.push(element);
      });
    })
  }

}
