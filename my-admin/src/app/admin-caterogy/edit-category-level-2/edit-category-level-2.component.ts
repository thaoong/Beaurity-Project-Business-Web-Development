import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-edit-category-level-2',
  templateUrl: './edit-category-level-2.component.html',
  styleUrls: ['./edit-category-level-2.component.css']
})
export class EditCategoryLevel2Component {
  cosmetics: any;
  categories: any;
  subcategories: any;
  cosmetic = new Cosmetics();
  errMessage: string = '';
  category: any;
  constructor(public _service: AdminCosmeticService, private router: Router, private activateRoute: ActivatedRoute) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchCosmetic(id);
      }
    });

    this._service.getCosmetics().subscribe({
      next: (data) => {
        // Get list Cosmetics
        this.cosmetics = data;
        this.subcategories = Array.from(
          new Set(data.map((x: { SubCategory: any }) => x.SubCategory))
        );

        // Get list Category
        const categories = Array.from(
          new Set(data.map((x: { Category: any }) => x.Category))
        );

        // Get list SubCategory by Category
        this.categories = categories.map((category) => {
          return {
            Category: category,
            SubCategories: Array.from(
              new Set(
                data
                  .filter((x: { Category: any }) => x.Category === category)
                  .map((x: { SubCategory: any }) => x.SubCategory)
              )
            )
          };
        });
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  public setCosmetic(f: Cosmetics) {
    this.cosmetic = f;
  }
  searchCosmetic(_id: string) {
    this._service.getCosmetic(_id).subscribe({
      next: (data) => {
        this.cosmetic = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  putCosmetic() {
    //this.cosmetic.Create_date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    this._service.putCosmetic(this.cosmetic).subscribe({
      next: (data) => { 
        this.cosmetic = data;
        alert("Sửa danh muc done");
        this.goBack();
      },
      error: (err) => { 
        this.cosmetic = err;
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-category-management'])
  }

  onFileSelected(event: any, cosmetic: Cosmetics) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cosmetic.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  changeCat: string = '';
  tabChange(tab: any) {
    this.changeCat = tab;
    console.log(this.changeCat)
  }
}

export interface Option {
  value: string;
  label: string;
}