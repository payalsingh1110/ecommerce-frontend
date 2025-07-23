import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  standalone: false,
  templateUrl: './post-category.component.html',
  styleUrls:['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
    categoryForm!: FormGroup;

    constructor(
    private fb: FormBuilder,
    private router : Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
    ) {}

    ngOnInit(): void {
       this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      })
    }

    onSubmit(): void {
    console.log(this.categoryForm.value);
    //  call your API here
    }

    addCategory(): void {
       console.log('Category Added:', this.categoryForm.value);
          // send data to backend using service
        if(this.categoryForm.valid){
            this.adminService.addCategory(this.categoryForm.value).subscribe(
            (res)=>{
              if(res.id!= null){
               this.snackbar.open('Category Posted Successfullly', 'Close',{duration:5000});
                this.router.navigateByUrl('/admin/dashboard');
              }else{
                 this.snackbar.open(res.message, 'close',{duration:5000, panelClass: 'error-snackbar'});
              }
            })
        }else{
          this.categoryForm.markAllAsTouched();
        }

    }
}
