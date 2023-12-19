import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cosmetics } from '../Interfaces/Cosmetic';
import { CosmeticService } from '../SERVICES/cosmetic.service';
import { CategoryService } from '../SERVICES/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedCategory: string = '';
  categories: any[] | undefined;
  cosmetics: any;
  cosmetic = new Cosmetics();
  errMessage: string = '';
  displayProduct: boolean = true;
categoryImages: any;

  constructor(
    public _service: CosmeticService,
    public _fs: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchCosmetic(id);
      }
    });

    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        this.cosmetics = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this._fs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
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

  filterCosmetics(): any[] {
    return this.selectedCategory === '' ? this.cosmetics : this.cosmetics.filter((cosmetic: any) => cosmetic.Category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
  viewCosmeticDetail(f: any) {
    this.router.navigate(['app-product-detail', f._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }
}
