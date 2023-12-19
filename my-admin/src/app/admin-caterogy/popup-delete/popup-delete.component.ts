import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent {
  cosmetics: any;
  errMessage: string = ''
  router: any;
  constructor(public _service: AdminCosmeticService, private _router: Router) {
    this.getCosmetics()
  }

  getCosmetics() {
    this._service.getCosmetics().subscribe({
      next: (data) => { this.cosmetics = data },
      error: (err) => { this.errMessage = err }
    })
  }
  deleteCosmetic(cosmeticId: string) {
    // confirm delete
    if (confirm("Are you sure to delete this fashion?")) {
      this._service.deleteCosmetic(cosmeticId).subscribe({
        next: (data) => { this.cosmetics = data, this.getCosmetics();
          window.location.reload(); // Reload the page
         },
        error: (err) => { this.errMessage = err }
      })
      this.getCosmetics()
    }
  }
  goBack() {
    this.router.navigate(['admin-category-management']);
  }

  deleteCosmetics(_id: any) {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this._service.deleteCosmetic(_id).subscribe({
        next: () => {
          // Reload the page after deleting the product
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
}
