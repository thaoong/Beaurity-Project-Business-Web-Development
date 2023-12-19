import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../SERVICES/auth.service';
import { windowCount } from 'rxjs';
import { SearchService } from '../SERVICES/search.service';
import { CosmeticService } from '../SERVICES/cosmetic.service';
import { Cosmetics } from '../Interfaces/Cosmetic';

@Component({
  selector: 'app-navigate-bar',
  templateUrl: './navigate-bar.component.html',
  styleUrls: ['./navigate-bar.component.css']
})

export class NavigateBarComponent {
  isLoggedIn = false;
    currentUser: any;
  [x: string]: any;
  category: string = '';
  categories: any[] | undefined;
  cosmetics: any;
  cosmetic = new Cosmetics();
  cartItems: any[] = [];
  quantityItem: number = 0;
  displayItem: boolean = true;
  errMessage: string = '';

  constructor(
    private searchService:SearchService,
    private _http: HttpClient,
    public _service: CosmeticService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {

    activateRoute.paramMap.subscribe((param) => {
      let category = param.get('category');
      if (category != null) {
        this['searchCosmeticsCategory'](category);
      }
    });

    this._service.getCosmetics().subscribe({
      next: (data) => {
        this.cosmetics = data;
        const categories = Array.from(
          new Set(data.map((x: { Category: any }) => x.Category))
        );
        this.categories = categories.map((category) => {
          return {
            Category: category,
            SubCategories: Array.from(
              new Set(
                data
                  .filter((x: { Category: any }) => x.Category === category)
                  .map((x: { SubCategory: any }) => x.SubCategory)
              )
            ),
          };
        });
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this._service.getCart().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.quantityItem = this.cartItems.length;
        if(this.cartItems.length > 0){
          this.displayItem = false;
        };
        this.cd.detectChanges();
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();

  }


  Name:any
  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('CurrentUser')!);
      if (user) {
        this.Name = user.Name;
      }}

    logOut() {
      const confirmed = confirm('Bạn có muốn đăng xuất không?');
      if(confirmed) {
        sessionStorage.removeItem('CurrentUser');
        this.router.navigate(['/']);
        window.location.reload();
      }

    }

    keyword: string='';
    search() {
    this.searchService.setKeyword(this.keyword);
    this.router.navigate(['/app-search-result']);
    }

    searchCosmeticsCategory(category: string) {
      this._service.getCosmeticCategory(category).subscribe({
        next: (data) => {
          this['cosmeticCategory'] = data;
        },
        error: (err) => {
          this.errMessage = err;
        },
      });
    }
}
