import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: false,
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.orderForm = this.fb.group({
      address:['',Validators.required],
      orderDescription: [''],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open("Order Placed Successfully", 'Close',{duration:5000});
        this.router.navigateByUrl("/customer/my-order");
        this.closeForm();
      }else{
         this.snackBar.open("Something Went Wronog", 'Close',{duration:5000});
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }



}
