import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: UserService, private router: Router) {}

  register() {
    const user = { name: this.name, email: this.email, password: this.password };

    this.authService.register(user).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao cadastrar: ' + err.error.message);
      },
    });
  }
}
