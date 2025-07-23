import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-conta',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './cadastro-conta.page.html',
})
export class CadastroContaPage {
  name = '';
  email = '';
  password = '';
  erro = '';

  constructor(private auth: AuthService, private router: Router) { }
  //constructor( private router: Router) {}

  cadastrarConta() {
    if (!this.name || !this.email || !this.password) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const dados = {
      nome: this.name,
      email: this.email,
      senha: this.password,
    };
    console.log(dados)

    this.auth.register(this.name, this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token); // apenas se seu serviço tiver isso
        this.router.navigate(['/cadastro-propriedade']);
      },
      error: () => {
        this.erro = 'Erro ao cadastrar'
      },
    });
    this.erro = '';
  }


}
