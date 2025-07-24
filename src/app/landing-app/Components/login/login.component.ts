import { MatDialog } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { User } from './user';
import { AlertDialogComponent } from '../../../alert-dialog-component/alert-dialog-component';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  imports: [RouterModule, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user!: User;

  service = inject(AuthService);

  constructor(private matDialog: MatDialog, private router: Router) {
    this.user = {
      email: '',
      password: '',
    }
  }

  login() {

    let message = ``;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(this.user.email!)) {
      message += `Please enter a valid email address `;
    }

    if (this.user.password!.length < 6) {
      message += `\n\nPassword must be at least 6 characters long.`;
    }

    if (message != '') {
      this.matDialog.open(AlertDialogComponent, {
        data: {
          title: 'Error',
          message: message,
        }
      });
      return;
    }
    else {
      this.service.login(this.user).subscribe({
        next: (value) => {
          localStorage.setItem('email', this.user.email!);
          console.log(value);
          this.matDialog.open(AlertDialogComponent, {
            data: {
              title: 'Login is successful!',
            }
          });
        },
      });
      this.service.login(this.user);
    }
  }

  logUser() {
    console.log(this.user);
  }
}
