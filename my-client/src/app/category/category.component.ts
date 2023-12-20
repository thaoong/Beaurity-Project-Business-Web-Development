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

  constructor(
    public _service: CosmeticService,
    public _fs: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    activateRoute.paramMap.subscribe((param) => {
      let category = param.get('category');
      if (category != null) {
        this.selectCategory(category);
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

  filterCosmetics(): any[] {
    return this.selectedCategory === '' ? this.cosmetics : this.cosmetics.filter((cosmetic: any) => cosmetic.Category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  viewCosmeticDetail(cosmetic: any) {
    this.router.navigate(['/cosmetics', this.selectedCategory, cosmetic._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }
}
