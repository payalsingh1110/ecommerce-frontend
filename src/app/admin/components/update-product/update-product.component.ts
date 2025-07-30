import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productId: number 

   productForm: FormGroup;
  listOfCategories: any=[];
  selectedFile: File | null;
  imagePreview: string |ArrayBuffer | null;

  existingImage: string | null =null;
  imgChanged= false;

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private activatedroute : ActivatedRoute

  ){ }


  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;

    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void{
    this.productId = this.activatedroute.snapshot.params['productId'];
      this.productForm = this.fb.group({
       categoryId:['',Validators.required],
       name: ['', Validators.required],
       price: ['', Validators.required],
       description: ['',Validators.required],

      });

      this.getAllCategories();
      this.getProductById();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  getProductById(){      
    this.adminService.getProductById(this.productId).subscribe(res=>{
      this.productForm.patchValue(res);
      this.existingImage ='data:image/jpeg;base64,' + res.byteImg;
    })
  }

  updateProduct(): void{
    if(this.productForm.valid){
      const formData: FormData = new FormData();

      if(this.imgChanged && this.selectedFile){
        formData.append('img',this.selectedFile);
      }
      
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);

      this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
        if(res.id != null ) {
          console.log(res);
          this.snackbar.open('Product Updated Successfully!', 'Close', { duration : 5000});
          this.router.navigateByUrl('admin/dashboard');
        }else{
          console.log(res);
          this.snackbar.open(res.message, 'ERROR', {duration: 5000});
        }
      })

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[0].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }

  }

}

