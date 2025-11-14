import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { CarroListaComponent } from './pages/carro-lista/carro-lista.component';
import { CarroFormComponent } from './pages/carro-form/carro-form.component';
import { AluguelComponent } from './pages/aluguel/aluguel.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { SobreComponent } from './pages/Sobre/sobre.component';
import { CarroDetalhesComponent } from './pages/carro-detalhes/carro-detalhes.component';
import {LoginComponent} from './pages/login/login.component';
import {CadastroComponent} from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  // 1. ROTAS DE PÁGINAS ESTÁTICAS / LISTAS DE USUÁRIO FINAL
  { path: '', component: HomeComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'aluguel', component: AluguelComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

  // 2. ROTAS DE ADMINISTRAÇÃO (FIXAS - MAIOR PRIORIDADE)
  { path: 'carros/novo', component: CarroFormComponent },
  { path: 'carros/editar/:id', component: CarroFormComponent }, // /carros/editar/1

  // 3. ROTA DE DETALHES (COM PARÂMETRO - ESSA DEVE PEGAR O ID)
  // Se o link for: /carros/123
  { path: 'carros/:id', component: CarroDetalhesComponent },

  // 4. ROTAS GENÉRICAS / LISTA ADMIN (MENOR PRIORIDADE)
  // Se o link for APENAS: /carros ou /admin/carros
  { path: 'carros', component: CarroListaComponent },
  { path: 'admin/carros', component: CarroListaComponent },

  // 5. Rota Curinga
  { path: '**', redirectTo: '' }
];
