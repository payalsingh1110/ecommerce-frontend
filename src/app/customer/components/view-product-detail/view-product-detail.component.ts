// import { ChangeDetectorRef, Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CustomerService } from '../../services/customer.service';
// import { ActivatedRoute } from '@angular/router';
// import { elementAt } from 'rxjs';
// import { UserStorageService } from '../../../services/storage/user-storage.service';

// @Component({
//   selector: 'app-view-product-detail',
//   standalone: false,
//   templateUrl: './view-product-detail.component.html',
//   styleUrls: ['./view-product-detail.component.scss']
// })
// export class ViewProductDetailComponent {

//   productId: number;
//   product:any;
//   FAQS: any[]=[];
//   reviews:any[]=[];
//   wishlistProductIds: number[] = [];


//   constructor(
//     private snackBar: MatSnackBar,
//     private customerService: CustomerService,
//     private activatedroute: ActivatedRoute,
//     private cdRef: ChangeDetectorRef
//   ){}

//   ngOnInit(){
//     this.productId = this.activatedroute.snapshot.params['productId'];
//     this.getProductDetailById();
//      this.getWishlistByUserId(); //  Add this line
//   }

//   getProductDetailById(){
//     console.log("inside get product detail by id method");
//     this.customerService.getProductDetailById(this.productId).subscribe(res=>{

//       this.product= res.productDto;
//       this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;      
//       this.FAQS = res.faqDtoList;

//       res.reviewDtoList.forEach(element=>{
//         element.processedImg =  'data:image/png;base64,' + element.returnedImg;
//         this.reviews.push(element);
//       })
//       console.log(res);
//     })
//   }

//   getWishlistByUserId() {
//     this.customerService.getWishlistByUserId().subscribe(res => {
//     this.wishlistProductIds = res.map(item => item.id); // Collect all wishlist product IDs
//   });
//   }

//   addToWishlist(){

//     if (this.isInWishlist(this.productId)) {
//     this.snackBar.open("Already in Wishlist", 'ERROR', { duration: 5000 });
//     return;
//     }
//     const  wishListDto = {
//      productId : this.productId,
//      userId: UserStorageService.getUserId()
//     }

//     this.customerService.addProductToWishlist(wishListDto).subscribe(res=>{
//       if(res.id != null){
//         this.snackBar.open("Product Added to Wishlist Successfully!", 'Close',{duration: 5000});
//         this.wishlistProductIds.push(this.productId); //  update locally
//           this.cdRef.detectChanges(); //  force refresh
//       }else{
//         this.snackBar.open("Already in Wishlist", 'ERROR',{duration: 5000});
//       }
//     })
//   }

//   isInWishlist(productId: number): boolean {
//   return this.wishlistProductIds.includes(productId);
//   }



// }


import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  standalone: false,
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {

  productId: number;
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];
  wishlistProductIds: number[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedroute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.productId = this.activatedroute.snapshot.params['productId'];
    this.getProductDetailById();
    this.loadWishlist();   // Load fresh every time
  }

  getProductDetailById() {
    this.customerService.getProductDetailById(this.productId).subscribe(res => {
      this.product = res.productDto;
      this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;
      this.FAQS = res.faqDtoList;

      this.reviews = res.reviewDtoList.map(review => ({
        ...review,
        processedImg: 'data:image/png;base64,' + review.returnedImg
      }));
    });
  }

  loadWishlist() {
    this.customerService.getWishlistByUserId().subscribe(res => {
      this.wishlistProductIds = res.map(item => item.id); //  fresh IDs
      this.cdRef.detectChanges(); // in case heart icon depends on it
    });
  }

  addToWishlist() {
    if (this.isInWishlist(this.productId)) {
      this.snackBar.open("Already in Wishlist", 'ERROR', { duration: 3000 });
      return;
    }

    const wishListDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId()
    };

    this.customerService.addProductToWishlist(wishListDto).subscribe(res => {
      if (res.id != null) {
        this.snackBar.open("Product Added to Wishlist Successfully!", 'Close', { duration: 3000 });
        this.wishlistProductIds.push(this.productId); //  Add locally
        this.cdRef.detectChanges(); //  Force UI refresh for heart icon
      } else {
        this.snackBar.open("Already in Wishlist", 'ERROR', { duration: 3000 });
      }
    });
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistProductIds.includes(productId);
  }

}

