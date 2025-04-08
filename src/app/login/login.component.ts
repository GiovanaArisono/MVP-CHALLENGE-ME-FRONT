import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: UserService, private router: Router) {}

  login() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        this.authService.setLoginStatus(true);
        this.router.navigate(['/meus-desafios']);
      },
      error: (err) => {
        alert('Erro ao fazer login: ' + err.error.message);
      },
    });
  }
}
