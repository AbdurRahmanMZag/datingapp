import { AccountService } from './../../../core/services/account-service';
import { Component, inject, Input, output } from '@angular/core';
import { RegisterCreds } from '../../../types/users';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected accountService = inject(AccountService);

  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  
  register(){
    this.accountService.register(this.creds).subscribe({
      next: (user) => {
        console.log('Registration successful', user);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
