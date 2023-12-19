import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']).then(() => {
      const chungnhanAnToanSection = document.getElementById('chungnhanAnToan');
      if (chungnhanAnToanSection) {
        chungnhanAnToanSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    });
  }
}
