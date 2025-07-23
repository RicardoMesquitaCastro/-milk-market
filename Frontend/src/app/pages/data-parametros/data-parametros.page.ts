import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-parametros',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './data-parametros.page.html',
})
export class DataParametrosPage {
  agrupamentoSelecionado: string = 'nenhum';

  laticinio: string = '';
  mesReferencia: number | null = null;
  producaoLitros: number | null = null;
  precoLitro: number | null = null;
  ccs: number | null = null;
  cbt: number | null = null;
  gordura: number | null = null;
  proteina: number | null = null;

  dadosList = [
    {
      laticinio: 'jl',
      mesReferencia: 5,
      producaoLitros: 5,
      precoLitro: 5,
      ccs: 5,
      cbt: 5,
      gordura: 5,
      proteina: 5,
    },
    {
      laticinio: 'jl',
      mesReferencia: 6,
      producaoLitros: 150,
      precoLitro: 4.5,
      ccs: 6,
      cbt: 6,
      gordura: 6,
      proteina: 6,
    },
    {
      laticinio: 'mega leite',
      mesReferencia: 5,
      producaoLitros: 250,
      precoLitro: 5.2,
      ccs: 4,
      cbt: 3,
      gordura: 4.5,
      proteina: 3.5,
    }
  ];

  // Função que retorna a faixa de litros em intervalos de 100
  getFaixaLitros(valor: number): string {
    if (valor <= 100) return '0-100';
    const faixaMin = Math.floor((valor - 1) / 100) * 100 + 1;
    const faixaMax = faixaMin + 99;
    return `${faixaMin}-${faixaMax}`;
  }

  // Agrupamento por laticínio e faixas de litros, com média de preço
  get dadosPorLaticinioFaixas() {
    const grupos: Record<string, Record<string, { items: any[], mediaPreco: number }>> = {};

    for (const item of this.dadosList) {
      if (!grupos[item.laticinio]) grupos[item.laticinio] = {};

      const faixa = this.getFaixaLitros(item.producaoLitros);

      if (!grupos[item.laticinio][faixa]) {
        grupos[item.laticinio][faixa] = { items: [], mediaPreco: 0 };
      }

      grupos[item.laticinio][faixa].items.push(item);
    }

    // Calcula média do preço por litro em cada faixa
    for (const laticinio in grupos) {
      for (const faixa in grupos[laticinio]) {
        const items = grupos[laticinio][faixa].items;
        const somaPreco = items.reduce((acc, cur) => acc + cur.precoLitro, 0);
        grupos[laticinio][faixa].mediaPreco = somaPreco / items.length;
      }
    }

    // Formata para array para facilitar template
    return Object.keys(grupos).map(laticinio => ({
      laticinio,
      faixas: Object.keys(grupos[laticinio]).map(faixa => ({
        faixa,
        mediaPreco: grupos[laticinio][faixa].mediaPreco,
        items: grupos[laticinio][faixa].items,
      })),
    }));
  }

  // Agrupamento por mês (exemplo seu)
  get dadosPorMes() {
    const grupos: Record<number, any[]> = {};
    for (const item of this.dadosList) {
      if (!grupos[item.mesReferencia]) grupos[item.mesReferencia] = [];
      grupos[item.mesReferencia].push(item);
    }

    return Object.keys(grupos).map(mes => ({
      mes,
      items: grupos[+mes],
    }));
  }

  // TrackBy para otimizar ngFor
  trackByLaticinio(index: number, item: any) {
    return item.laticinio;
  }

  trackByFaixa(index: number, item: any) {
    return item.faixa;
  }
}
