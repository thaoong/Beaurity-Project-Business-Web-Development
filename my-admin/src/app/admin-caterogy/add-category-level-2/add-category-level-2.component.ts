import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-add-category-level-2',
  templateUrl: './add-category-level-2.component.html',
  styleUrls: ['./add-category-level-2.component.css']
})

export class AddCategoryLevel2Component {

  cosmetic = new Cosmetics();
  errMessage: string = '';
  cosmetics: any;
  categories: any;
  
  constructor(public _service: AdminCategoryService, private router: Router, private activateRoute: ActivatedRoute) {
    this._service.getCategories().subscribe({
      next: (data) => {
        // Lấy danh sách các cosmetics
        this.cosmetics = data;
        this.categories = Array.from(
          new Set(this.cosmetics.map((x: { Category: any }) => x.Category))
        );
      },
      
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  public setFashion(f: Cosmetics) {
    this.cosmetic = f;
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

  postCosmetic() {
    //this.cosmetic.Create_date= `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    this._service.postCategory(this.cosmetic).subscribe({
      next: (data) => {
        this.cosmetic = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.goBack();
  }

  goBack() {
    this.router.navigate(['admin-category-management']);  // Adjust the path to match your route configuration
  }  
  
  public selectedOption: Option | undefined;
  
  options: Option[] = [
    {value:'duocpham', label: 'Dược phẩm'},
    {value:'tpcn', label: 'Thực phẩm chức năng'},
    {value:'sacdep', label: 'Chăm sóc sắc đẹp'}
  ];

  ngOnInit() {
    // Call API to get data and push it to the options array
    // This will automatically add a new option to the select element
  }
}

export interface Option {
  value: string;
  label: string;
}
