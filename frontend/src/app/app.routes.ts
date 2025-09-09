import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { CarroListaComponent } from './pages/carro-lista/carro-lista.component';
import { CarroFormComponent } from './pages/carro-form/carro-form.component';
import { AluguelComponent } from './pages/aluguel/aluguel.component';
import { CompraComponent } from './pages/compra/compra.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carros', component: CarroListaComponent },
  { path: 'carros/novo', component: CarroFormComponent },
  { path: 'carros/editar/:id', component: CarroFormComponent },
  { path: 'carros/:id', component: CarroListaComponent },
  { path: 'admin/carros', component: CarroListaComponent },
  { path: 'aluguel', component: AluguelComponent },
  { path: 'compra', component: CompraComponent }
];
