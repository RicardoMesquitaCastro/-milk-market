
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-cadastro-parametros',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './cadastro-parametros.page.html',
})
export class CadastroParametrosPage {
  laticinio = '';
  mesReferencia: number | null = null;
  producaoLitros: number | null = null;
  precoLitro: number | null = null;
  ccs: number | null = null;
  cbt: number | null = null;
  gordura: number | null = null;
  proteina: number | null = null;

  erro = '';

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  cadastrarParametros() {
    if (!this.laticinio || !this.mesReferencia) {
      this.erro = 'Preencha os campos obrigatórios.';
      return;
    }

    const dados = {
      laticinio: this.laticinio,
      mesReferencia: this.mesReferencia,
      producaoLitros: this.producaoLitros,
      precoLitro: this.precoLitro,
      ccs: this.ccs,
      cbt: this.cbt,
      gordura: this.gordura,
      proteina: this.proteina,
    };

    this.registroService.cadastrarParametros(dados).subscribe({
     // next: () => this.router.navigate(['/pagina-final']), // Altere para sua rota de destino
      error: () => this.erro = 'Erro ao enviar parâmetros.',
    });

    this.erro = '';
  }
}
