import { Component } from '@angular/core';
import { AdminCosmeticService } from '../services/admin-cosmetic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminCategoryService } from '../services/admin-category.service';
import { AdminCustomerService } from '../services/admin-customer.service';
import { AdminOrderService } from '../services/admin-order.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  totalCategories: number = 234; // Replace with your actual value
  totalCustomers: number = 567; // Replace with your actual value
  totalOrders: number = 890; // Replace with your actual value
  totalCosmetics: number=0;
  totalUncompletedOrders: number=0;
  cosmetics: any;
  categories: any;
  customers: any;
  orders: any;
  uncompletedOrders: any;
  errMessage: string = '';

  constructor(public _service: AdminCosmeticService, 
              public category_service: AdminCategoryService,
              public customer_service: AdminCustomerService,
              public order_service: AdminOrderService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.cosmetics = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this.category_service.getCategories().subscribe({
      next: (data) => {
        // Lấy danh sách các Categories
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this.customer_service.getCustomers().subscribe({
      next: (data) => {
        // Lấy danh sách các Customers
        this.customers = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this.order_service.getOrders().subscribe({
      next: (data) => {
        // Lấy danh sách các Orders
        this.orders = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.order_service.searchUncompletedOrder().subscribe({
      next: (data) => {
        // Lấy danh sách các Orders
        this.uncompletedOrders = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  
  totalCosmetic(data: any) {
    return this.totalCosmetics = data.length
  }
  totalCategory(data: any) {
    return this.totalCategories = data.length
  }
  totalCustomer(data: any) {
    return this.totalCustomers = data.length
  }
  totalOrder(data: any) {
    return this.totalOrders = data.length
  }
  totalUncompletedOrder(data: any) {
    return this.totalUncompletedOrders = data.length
  }

  
}
