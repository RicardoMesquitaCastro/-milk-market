
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-parametros',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './cadastro-parametros.page.html',
})
export class CadastroParametrosPage {

  agrupamentoSelecionado = 'nenhum'; // <- Adicione isso

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

   dadosList = [
    { laticinio: 'JL', mesReferencia: 5, producaoLitros: 500, precoLitro: 2.45, ccs: 300, cbt: 400, gordura: 3.5, proteina: 3.2 },
    { laticinio: 'Nova Leite', mesReferencia: 5, producaoLitros: 620, precoLitro: 2.60, ccs: 250, cbt: 350, gordura: 3.7, proteina: 3.3 },
    { laticinio: 'JL', mesReferencia: 6, producaoLitros: 400, precoLitro: 2.40, ccs: 280, cbt: 300, gordura: 3.6, proteina: 3.1 }
  ];

   get dadosPorLaticinio() {
    const map = new Map<string, any[]>();
    for (const item of this.dadosList) {
      if (!map.has(item.laticinio)) {
        map.set(item.laticinio, []);
      }
      map.get(item.laticinio)!.push(item);
    }
    return Array.from(map.entries()).map(([laticinio, items]) => ({ laticinio, items }));
  }

  get dadosPorMes() {
    const map = new Map<number, any[]>();
    for (const item of this.dadosList) {
      if (!map.has(item.mesReferencia)) {
        map.set(item.mesReferencia, []);
      }
      map.get(item.mesReferencia)!.push(item);
    }
    return Array.from(map.entries()).map(([mes, items]) => ({ mes, items }));
  }

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
