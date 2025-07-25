import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[]= [];
  searchProductForm!: FormGroup;
  

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  //method which call the API
  getAllProducts(){
    this.products= [];
    this.customerService.getAllProducts().subscribe(res=>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }

  submitForm(){
    this.products= [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res=>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products)
    })

  }

  // addToCart(id: any){
  //   this.customerService.addToCart(id).subscribe(res=>{
  //     this.snackBar.open('Product added to cart successfully', 'Close', {duration : 5000})
  //   })
    
  // }

                          // error handling 
  addToCart(id: any) {
  this.customerService.addToCart(id).subscribe({
    next: (res) => {
      this.snackBar.open(' Product added to cart successfully', 'Close', {
        duration: 5000
      });
    },
    error: (err) => {

      console.error(err);  // good for debugging
      if (err.status === 409) {
        this.snackBar.open(' Product already in cart', 'Close', {
          duration: 5000
        });
      }else if (err.status === 401) {
        this.snackBar.open(' Please login first', 'Close', {
          duration: 5000
        });
      }else {
        this.snackBar.open(' Failed to add product to cart', 'Close', {
          duration: 5000
        });
        
      }
    }

    });
  }


}
