import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  standalone: false,
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
   couponForm!: FormGroup;

   constructor(
    private fb: FormBuilder,
    private router : Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
    ) {}

    ngOnInit(){
      this.couponForm = this.fb.group({
        name:['', Validators.required],
        code:['', Validators.required],
        discount:['', Validators.required],
        expirationDate:['', Validators.required],
      })
    }

    addCoupon(){
      if(this.couponForm.valid){
        this.adminService.addCoupon(this.couponForm.value).subscribe(res=>{
          if(res.id!=null){
          //  console.log("Saved Coupon", res);
            this.snackbar.open('Coupon Posted Successfully', 'Close', {duration: 5000});
            this.router.navigateByUrl('admin/dashboard');
          }else{
             this.snackbar.open(res.message, 'Close',{duration:5000, panelClass: 'error-snackbar'});
          }
        })
      }else{
        this.couponForm.markAllAsTouched();
      }
    }

  formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  }

}
