import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  standalone: false,
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {

  coupons: any []=[];
  displayedColumns: string[] = ['id', 'name', 'discount', 'code', 'expirationDate'];


  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.getCoupons();
  }


  getCoupons(){
    this.adminService.getCoupons().subscribe(res =>{
      this.coupons = res;
    })
  }

}
