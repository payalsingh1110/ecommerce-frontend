import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  standalone: false,
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.scss']
})
export class ReviewOrderedProductComponent {

  productId: number;
  reviewForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(  private fb: FormBuilder,
    private router : Router,
    private snackbar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){

    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.reviewForm = this.fb.group({
      rating:['',Validators.required],
      description:['',Validators.required],
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(){

     if (this.reviewForm.invalid || !this.selectedFile) {
      this.snackbar.open('All fields are required, including image.', 'Close', { duration: 5000 });
      return;
    }
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get('rating')?.value.toString());
    formData.append('description', this.reviewForm.get('description')?.value);

    this.customerService.giveReview(formData).subscribe(res=>{
      if(res.id !=null){
        this.snackbar.open('Review posted Successfully', 'Close', {duration: 5000});
        this.router.navigateByUrl('/customer/my_orders');
      }else{
        this.snackbar.open('Something went wrong', 'Error', {duration: 5000});
      }
    })
  }

}
