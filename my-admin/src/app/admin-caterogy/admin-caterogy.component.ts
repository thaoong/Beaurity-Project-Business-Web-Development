import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminCategoryService } from '../services/admin-category.service';

@Component({
  selector: 'app-admin-caterogy',
  templateUrl: './admin-caterogy.component.html',
  styleUrls: ['./admin-caterogy.component.css']
})
export class AdminCaterogyComponent {
  categories: any[] = [];
  [x: string]: any;
  errMessage: string = '';
  imageUrlCat: any[] = [];

  constructor(public _service: AdminCategoryService, private router: Router, private activateRoute: ActivatedRoute) {
    this._service.getCategories().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  changeCat: string = '';
  tabChange(tab: any) {
    this.changeCat = tab;
    console.log(this.changeCat)
  }

  addCatLevel1() {
    this.router.navigate(['add-category-level-1']);
  }

  editCatLevel1(category: any) {
    this.router.navigate(['edit-category-level1', category._id]);
  }

  deleteCategory(_id: any) {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this._service.deleteCategory(_id).subscribe({
        next: () => {
          // Reload the page after deleting the category
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
}
