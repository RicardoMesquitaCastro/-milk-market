import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule, RouterModule], // IMPORTANTE
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = '';
  senha = '';
  erro = '';

  constructor(private router: Router) {}

  login() {
    // Aqui você integraria com seu AuthService
    if (this.usuario === 'admin' && this.senha === '1234') {
      this.router.navigate(['/cadastro-propriedade']); // ou outra página
    } else {
      this.erro = 'Usuário ou senha inválidos';
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-conta']);
  }
}
