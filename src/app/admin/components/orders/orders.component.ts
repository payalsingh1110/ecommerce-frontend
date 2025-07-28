import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders:any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getPlaceOrders();
  }


  getPlaceOrders(){
    this.adminService.getPlaceOrders().subscribe(res=>{
      console.log("orderDescription:", res);
      this.orders = res;
    })
  }

   changeOrderStatus(orderId:number, status:string){

    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
        if(res.id != null){
           this.snackBar.open('Order status change successfully!', 'Close', {duration: 5000});
        this.getPlaceOrders();
        }else{
           this.snackBar.open('Something went wrong!', 'Close', {duration: 5000});
        }
    })
  }
}
