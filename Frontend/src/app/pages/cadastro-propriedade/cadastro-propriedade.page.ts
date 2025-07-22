import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service'; // ✅ importar

@Component({
  selector: 'app-cadastro-propriedade',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './cadastro-propriedade.page.html',
})
export class CadastroPropriedadePage {
  nomePropriedade = '';
  municipio = '';
  regiao = '';
  erro = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private registroService: RegistroService // ✅ injetar
  ) {}

  cadastrarPropriedade() {
    if (!this.nomePropriedade || !this.municipio || !this.regiao) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const dados = {
      propriedade: this.nomePropriedade,
      municipio: this.municipio,
      regiao: this.regiao,
    };

    this.registroService.cadastrarPropriedade(dados).subscribe({
      next: () => this.router.navigate(['/cadastro-parametros']),
      error: () => (this.erro = 'Erro ao cadastrar propriedade'),
    });
  }
}
