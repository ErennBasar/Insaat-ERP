import {Component, inject} from '@angular/core';
import {Sidebar} from './sidebar/sidebar';
import {Topbar} from './topbar/topbar';
import {RouterModule, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    Sidebar,
    Topbar,
    RouterModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  showTopbar = false;
  private router = inject(Router);

  constructor() {
    // Sayfa ilk yüklendiğinde URL'yi kontrol et
    this.checkUrl(this.router.url);

    // Menüden başka bir sayfaya tıklandığında (rota değiştiğinde) URL'yi tekrar kontrol et
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkUrl(event.urlAfterRedirects);
    });
  }

  private checkUrl(url: string) {
    // Sadece /dashboard adresindeyken topbar'ı göster
    this.showTopbar = url.includes('/dashboard');
  }
}
