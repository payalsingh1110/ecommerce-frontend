import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

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


      this.customerService.getCartByUserId().subscribe(res =>{
        console.log("Cart Response:", res);
       this.order = res;
       this.cartItems=  res.cartItems.map(element => {
        element.processedImg = "data:image/jpeg;base64,"+ element.returnedImg;
        return element;
       });
   
       },err => {
        console.error(err);
       }       
      );      
  }

  increaseQuantity(productId: any){
    this.customerService.increaseProductQuantity(productId).subscribe(res=>{
      this.snackBar.open("Product quantity increased", 'Close',{duration:5000});
      this.getCart();
    })
  }

  decreaseQuantity(productId: any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res=>{
      this.snackBar.open("Product quantity decreased", 'Close',{duration:5000});
      this.getCart();
    })
  }

removeItem(productId: number) {
  this.customerService.removeFromCart(productId).subscribe({
    next: (res: any) => {
      this.snackBar.open('Item removed from cart', 'Close', { duration: 3000 });
      this.getCart(); // Refresh cart
    },
    error: (err) => {
      this.snackBar.open('Failed to remove item', 'Close', { duration: 3000 });
    }
   });
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }

 

}
