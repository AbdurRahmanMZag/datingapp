import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  protected themes = themes;
  protected selectedTheme = signal(localStorage.getItem('theme') || 'light');

  protected toastService = inject(ToastService);
  protected router = inject(Router);

  protected accountService = inject(AccountService);
  protected creds: any = {};

  protected busyService = inject(BusyService);
  
  ngOnInit() {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());

  }
  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    let elem = document.activeElement as HTMLDivElement;
    if (elem) {
      elem.blur(); // Remove focus from the dropdown
    }
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.toastService.success('Login successful');
        this.router.navigateByUrl('/members');
        this.creds = {};
      },
      error: error => this.toastService.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
