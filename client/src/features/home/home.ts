import { Component, input, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { User } from '../../types/users';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  registeredMode = signal(false);

  showRegister(value: boolean) {
    this.registeredMode.set(value);
  }
}
