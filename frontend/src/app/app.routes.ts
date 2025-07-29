import { Routes } from '@angular/router';
import { CarroListaComponent } from './pages/carro-lista/carro-lista.component';
import { CarroFormComponent } from './pages/carro-form/carro-form.component';

export const routes: Routes = [
  {path: '', redirectTo: '/carros', pathMatch: 'full'},
  {path: 'carros', component: CarroListaComponent},
  {path: 'carros/novo', component: CarroFormComponent},
  {path: 'carros/editar/:id', component: CarroFormComponent}
];
