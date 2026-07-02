import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  resetEmail = '';

  // Arayüz Durumları
  isPasswordVisible = false;
  isRememberChecked = false;
  currentView: 'login' | 'forgot' = 'login';

  // Aksiyon Durumları
  errorMessage = '';
  isLoading = false;
  isSuccess = false;
  ssoText = 'Kurumsal SSO ile Giriş';
  startProgress = false;

  constructor(private router: Router) {}

  togglePassword() { this.isPasswordVisible = !this.isPasswordVisible; }
  toggleRemember() { this.isRememberChecked = !this.isRememberChecked; }
  showForgot(e: Event) { e.preventDefault(); this.currentView = 'forgot'; this.errorMessage = ''; }
  backToLogin() { this.currentView = 'login'; this.errorMessage = ''; }

  handleLogin() {
    this.errorMessage = '';

    if (!this.username.trim()) { this.errorMessage = 'Kullanıcı adı veya e-posta adresi boş bırakılamaz.'; return; }
    if (!this.password) { this.errorMessage = 'Şifre alanı boş bırakılamaz.'; return; }

    this.isLoading = true;

    // API İstek Simülasyonu
    setTimeout(() => {
      this.isLoading = false;

      // Hata senaryosu testi için
      if (this.username.toLowerCase() === 'hata') {
        this.errorMessage = 'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz.';
        return;
      }

      // Başarılı Giriş Senaryosu
      this.isSuccess = true;

      // Progress bar animasyonunu tetikle
      setTimeout(() => this.startProgress = true, 100);

      // Ana panele yönlendir
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2800);

    }, 1600);
  }

  handleSSO() {
    this.ssoText = 'Yönlendiriliyor...';
    setTimeout(() => {
      this.ssoText = 'Kurumsal SSO ile Giriş';
    }, 1500);
  }

  handleReset() {
    if (!this.resetEmail.trim()) return;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert(`Şifre sıfırlama bağlantısı ${this.resetEmail} adresine gönderildi.`);
      this.backToLogin();
    }, 1400);
  }
}
