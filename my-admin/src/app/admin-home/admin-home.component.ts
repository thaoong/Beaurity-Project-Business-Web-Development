import { Component, ViewChild, ElementRef, VERSION } from '@angular/core';
import { AdminCosmeticService } from '../services/admin-cosmetic.service';
import { AdminCategoryService } from '../services/admin-category.service';
import { AdminCustomerService } from '../services/admin-customer.service';
import { AdminOrderService } from '../services/admin-order.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  totalCategories: number = 234;
  totalCustomers: number = 567;
  totalOrders: number = 890;
  totalCosmetics: number = 0;
  totalUncompletedOrders: number = 0;
  cosmetics: any;
  categories: any;
  customers: any;

  uncompletedOrders: any;
  errMessage: string = '';

  orders: any;
  chart: any;

  constructor(
    public _service: AdminCosmeticService,
    public category_service: AdminCategoryService,
    public customer_service: AdminCustomerService,
    public order_service: AdminOrderService
  ) {
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

  ngOnInit() {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.cosmetics = data;
  
        // Gọi hàm tạo biểu đồ sau khi có dữ liệu
        this.createChart();
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

  }

  getUniqueCategories() {
    const uniqueCategories = Array.from(new Set(this.cosmetics.map((cosmetic: { categoryId: any; }) => cosmetic.categoryId)));
    return uniqueCategories;
  }

  @ViewChild('myChart') private myChart!: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');

    // Lấy dữ liệu số lượng sản phẩm của từng category
    const categoryData = this.getCategoryData();
    const categoryName = this.getCateNames();


    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categoryData ,
        datasets: [{
          label: '', 
          data: categoryData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    } as any);
  }

  // Phương thức lấy dữ liệu số lượng sản phẩm của từng category
  getCategoryData() {
    const categoryData = [];
    const categoryCountMap = new Map();

    // Tính số lần xuất hiện của mỗi danh mục sản phẩm
    for (const cosmetic of this.cosmetics) {
      const categoryId = cosmetic.categoryName;
      categoryCountMap.set(categoryId, (categoryCountMap.get(categoryId) || 0) + 1);
    }

    // Lưu số lần xuất hiện vào mảng categoryData
    for (const category of this.categories) {
      const categoryId = category.id;
      const categoryCount = categoryCountMap.get(categoryId) || 0;
      categoryData.push(categoryCount);
    }

    return categoryData;
  }


  getCateNames() {
    if (this.categories && this.categories.length > 0) {
      const uniqueCategories = Array.from(new Set(this.cosmetics.map((cosmetic: { categoryId: any; }) => cosmetic.categoryId)));
      return uniqueCategories
      this.categories.map((category: { name: any; }) => category.name);
    } else {
      return [];
    }
  }


  totalCosmetic(data: any) {
    return this.totalCosmetics = data.length;
  }

  totalCategory(data: any) {
    return this.totalCategories = data.length;
  }

  totalCustomer(data: any) {
    return this.totalCustomers = data.length;
  }

  totalOrder(data: any) {
    return this.totalOrders = data.length;
  }

  totalUncompletedOrder(data: any) {
    return this.totalUncompletedOrders = data.length;
  }
}
