import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = () => {
   const accountService = inject(AccountService);
   const toaster = inject(ToastService);
   if (accountService.currentUser()) {
     return true;
   }
   toaster.error('You must be logged in to access this page');
   return false;
};
