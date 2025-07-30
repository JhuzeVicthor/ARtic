import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { CarroListaComponent } from './pages/carro-lista/carro-lista.component';
import { CarroFormComponent } from './pages/carro-form/carro-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carros', component: CarroListaComponent },
  { path: 'carros/novo', component: CarroFormComponent },
  { path: 'carros/editar/:id', component: CarroFormComponent },
  { path: 'alaluguel', component: CarroListaComponent },
  { path: 'compra', component: CarroListaComponent }
];
