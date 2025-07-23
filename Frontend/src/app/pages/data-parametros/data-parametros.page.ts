import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-data-parametros',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './data-parametros.page.html',
})
export class DataParametrosPage implements AfterViewInit {
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
  // JL
  { laticinio: 'jl', mes: 'Mai', mesReferencia: 5, producaoLitros: 90, precoLitro: 4.8, ccs: 6, cbt: 4, gordura: 3.9, proteina: 3.3 },
  { laticinio: 'jl', mes: 'Jun', mesReferencia: 6, producaoLitros: 160, precoLitro: 4.9, ccs: 5, cbt: 5, gordura: 4.1, proteina: 3.4 },
  { laticinio: 'jl', mes: 'Jul', mesReferencia: 7, producaoLitros: 220, precoLitro: 5.0, ccs: 4, cbt: 4, gordura: 4.0, proteina: 3.6 },
  { laticinio: 'jl', mes: 'Ago', mesReferencia: 8, producaoLitros: 300, precoLitro: 4.7, ccs: 6, cbt: 6, gordura: 3.8, proteina: 3.2 },
  { laticinio: 'jl', mes: 'Set', mesReferencia: 9, producaoLitros: 410, precoLitro: 4.9, ccs: 5, cbt: 5, gordura: 4.2, proteina: 3.7 },

  // Mega Leite
  { laticinio: 'mega leite', mes: 'Mai', mesReferencia: 5, producaoLitros: 120, precoLitro: 5.1, ccs: 3, cbt: 4, gordura: 4.0, proteina: 3.5 },
  { laticinio: 'mega leite', mes: 'Jun', mesReferencia: 6, producaoLitros: 250, precoLitro: 5.3, ccs: 2, cbt: 3, gordura: 4.3, proteina: 3.6 },
  { laticinio: 'mega leite', mes: 'Jul', mesReferencia: 7, producaoLitros: 320, precoLitro: 5.0, ccs: 4, cbt: 3, gordura: 4.1, proteina: 3.7 },
  { laticinio: 'mega leite', mes: 'Ago', mesReferencia: 8, producaoLitros: 410, precoLitro: 5.2, ccs: 3, cbt: 3, gordura: 4.4, proteina: 3.8 },
  { laticinio: 'mega leite', mes: 'Set', mesReferencia: 9, producaoLitros: 500, precoLitro: 5.4, ccs: 2, cbt: 2, gordura: 4.6, proteina: 3.9 },

  // Nova Fazenda
  { laticinio: 'nova fazenda', mes: 'Mai', mesReferencia: 5, producaoLitros: 80, precoLitro: 4.5, ccs: 5, cbt: 5, gordura: 3.7, proteina: 3.1 },
  { laticinio: 'nova fazenda', mes: 'Jun', mesReferencia: 6, producaoLitros: 140, precoLitro: 4.6, ccs: 6, cbt: 4, gordura: 3.8, proteina: 3.2 },
  { laticinio: 'nova fazenda', mes: 'Jul', mesReferencia: 7, producaoLitros: 210, precoLitro: 4.8, ccs: 5, cbt: 5, gordura: 4.0, proteina: 3.4 },
  { laticinio: 'nova fazenda', mes: 'Ago', mesReferencia: 8, producaoLitros: 290, precoLitro: 4.9, ccs: 6, cbt: 6, gordura: 4.1, proteina: 3.5 },
  { laticinio: 'nova fazenda', mes: 'Set', mesReferencia: 9, producaoLitros: 380, precoLitro: 5.0, ccs: 5, cbt: 5, gordura: 4.3, proteina: 3.7 },

  // Leite Bom
  { laticinio: 'leite bom', mes: 'Mai', mesReferencia: 5, producaoLitros: 150, precoLitro: 5.5, ccs: 3, cbt: 3, gordura: 4.4, proteina: 3.8 },
  { laticinio: 'leite bom', mes: 'Jun', mesReferencia: 6, producaoLitros: 270, precoLitro: 5.6, ccs: 4, cbt: 3, gordura: 4.5, proteina: 3.9 },
  { laticinio: 'leite bom', mes: 'Jul', mesReferencia: 7, producaoLitros: 350, precoLitro: 5.7, ccs: 3, cbt: 2, gordura: 4.6, proteina: 4.0 },
  { laticinio: 'leite bom', mes: 'Ago', mesReferencia: 8, producaoLitros: 430, precoLitro: 5.8, ccs: 2, cbt: 3, gordura: 4.7, proteina: 4.1 },
  { laticinio: 'leite bom', mes: 'Set', mesReferencia: 9, producaoLitros: 520, precoLitro: 5.9, ccs: 2, cbt: 2, gordura: 4.8, proteina: 4.2 },
];

  ngAfterViewInit() {
    this.criarGrafico();
  }

criarGrafico() {
  const cores = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
  ];

  const grupos: Record<string, Record<string, { precoTotal: number; count: number }>> = {};

  this.dadosList.forEach(item => {
    const faixa = this.getFaixaLitros(item.producaoLitros || 0);
    if (!grupos[item.laticinio]) grupos[item.laticinio] = {};
    if (!grupos[item.laticinio][faixa]) {
      grupos[item.laticinio][faixa] = { precoTotal: 0, count: 0 };
    }
    grupos[item.laticinio][faixa].precoTotal += item.precoLitro || 0;
    grupos[item.laticinio][faixa].count++;
  });

  const todasFaixas = Array.from(
    new Set(this.dadosList.map(item => this.getFaixaLitros(item.producaoLitros || 0)))
  ).sort((a, b) => {
    const minA = a === '401+' ? 401 : Number(a.split('-')[0]);
    const minB = b === '401+' ? 401 : Number(b.split('-')[0]);
    return minA - minB;
  });

  const labels = todasFaixas;

  const datasets = Object.keys(grupos).map((laticinio, i) => {
    const data = labels.map(faixa => {
      const grupo = grupos[laticinio][faixa];
      return grupo ? grupo.precoTotal / grupo.count : 0; // usar 0 em vez de null
    });

    return {
      label: laticinio,
      data,
      backgroundColor: cores[i % cores.length],
      borderWidth: 1,
    };
  });

  const ctx = (document.getElementById('graficoLitrosPreco') as HTMLCanvasElement)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets,
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: context => `Preço médio: R$${context.raw}`,
          },
        },
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Preço Médio (R$)',
          },
          beginAtZero: true,
        },
        y: {
          title: {
            display: true,
            text: 'Faixa de Litros',
          },
        },
      },
    },
  });
}

// Paleta de cores para os laticínios


  // Função que retorna a faixa de litros em intervalos de 100
 getFaixaLitros(producaoLitros: number): string {
  if (producaoLitros <= 100) return '0-100';
  if (producaoLitros <= 200) return '101-200';
  if (producaoLitros <= 300) return '201-300';
  if (producaoLitros <= 400) return '301-400';
  return '401+';
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
