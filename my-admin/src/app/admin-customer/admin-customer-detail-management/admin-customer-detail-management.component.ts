import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';

@Component({
  selector: 'app-admin-customer-detail-management',
  templateUrl: './admin-customer-detail-management.component.html',
  styleUrls: ['./admin-customer-detail-management.component.css']
})
export class AdminCustomerDetailManagementComponent {
  selectedCustomer:any;
  customer = new Customer;
  customers:any;
  errMessage:string=""
  constructor(private activateRoute:ActivatedRoute,private _fs:AdminCustomerService, private router:Router)
  {
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id')
        if(id!=null)
        {
          this.searchCustomer(id)
        }
      }
    )
  }

  searchCustomer(_id:string){
    this._fs.getCustomerDetail(_id).subscribe({
      next:(data)=>{this.customer=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  goBack(){
    this.router.navigate(['admin-custoner-management'])
  }
}
