import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
   {
    path: 'cadastro-conta',
    loadComponent: () => import('./pages/cadastro-conta/cadastro-conta.page').then((m) => m.CadastroContaPage),
  },
    {
    path: 'cadastro-propriedade',
    loadComponent: () => import('./pages/cadastro-propriedade/cadastro-propriedade.page').then((m) => m.CadastroPropriedadePage),
  },
   {
    path: 'cadastro-parametros',
    loadComponent: () => import('./pages/cadastro-parametros/cadastro-parametros.page').then((m) => m.CadastroParametrosPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
