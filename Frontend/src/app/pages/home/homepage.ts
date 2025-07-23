import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './home.page.html',
})
export class HomePage implements AfterViewInit {

  private widgetScriptSrc = 'https://www.cepea.org.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=leitep';

  constructor() {}

 ngAfterViewInit(): void {
  const container = document.getElementById('cepea-widget');
  if (container) {
    container.innerHTML = ''; // limpa antes de inserir

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.cepea.org.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=leitep';
    script.async = true;

    script.onload = () => console.log('Widget CEPEA carregado com sucesso.');
    script.onerror = () => console.error('Erro ao carregar o widget CEPEA.');

    container.appendChild(script);
  } else {
    console.warn('Elemento #cepea-widget não encontrado no DOM.');
  }
 }
}
