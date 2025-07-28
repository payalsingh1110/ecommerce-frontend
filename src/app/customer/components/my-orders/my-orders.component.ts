import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {

  myOrders:any;

  constructor(private customerService: CustomerService){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrdersByuserId().subscribe(res=>{
      console.log("My Order:", res);
      this.myOrders=res;
    })
  }

}
