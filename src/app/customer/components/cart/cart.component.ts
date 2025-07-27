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


    // === NEW ===
 // loading: boolean = true;  // Loader state
 // skeletonItems = Array(3).fill(0); // Placeholder skeletons
 


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

    //  this.loading = true; // Start loader

      this.customerService.getCartByUserId().subscribe(res =>{
        console.log(res);
       this.order = res;
    this.cartItems=  res.cartItems.map(element => {
        element.processedImg = "data:image/jpeg;base64,"+ element.returnedImg;
        return element;
       // this.cartItems.push(element);
         });
           console.log(res);
        //    this.cartItems= res.cartItems;
          
      //  this.loading = false; // Stop loader
      },err => {
        console.error(err);
      //  this.loading = false;
      }
       
    );
    console.log("CartItems: " , this.cartItems.length); 
 
      
  }
  //  // === NEW ===
  // trackByItemId(index: number, item: any): number {
  //   return item.id;
  // }

}
