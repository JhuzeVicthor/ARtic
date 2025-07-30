import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  alugarAgora(): void {
    this.router.navigate(['/aluguel']);
  }

  comprarAgora(): void {
    this.router.navigate(['/compra']);
  }

  tipoServico: string = '';
  marca: string = '';
  categoria: string = '';

  buscarVeiculo(): void {
    console.log('Buscar veículo:', { tipoServico: this.tipoServico, marca: this.marca, categoria: this.categoria });
    this.router.navigate(['/carros'], { queryParams: { tipo: this.tipoServico, marca: this.marca, categoria: this.categoria } });
  }

  carrosDestaqueAluguel = [
    { nome: 'Toyota Corolla 2023', preco: 120, caracteristicas: ['Automático', 'Ar Condicionado', '4 Passageiros'], rating: 4.8, status: 'Disponível' },
    { nome: 'Honda Civic 2023', preco: 140, caracteristicas: ['Automático', 'Ar Condicionado', '5 Passageiros'], rating: 4.9, status: 'Disponível' },
    { nome: 'Ford EcoSport 2022', preco: 110, caracteristicas: ['Manual', 'Ar Condicionado', '5 Passageiros'], rating: 4.7, status: 'Disponível' },
  ];

  carrosAVenda = [
    { nome: 'BMW X3 2021', preco: 285000, ano: 2021, km: '35.000 km', caracteristicas: ['Automático', 'Couro', 'AWD', 'Teto Solar'], status: 'À Venda' },
    { nome: 'Audi A4 2020', preco: 195000, ano: 2020, km: '42.000 km', caracteristicas: ['Automático', 'Turbo', 'Couro', 'GPS'], status: 'À Venda' },
    { nome: 'Mercedes C180 2022', preco: 220000, ano: 2022, km: '18.000 km', caracteristicas: ['Automático', 'Couro', 'LED', 'Câmera'], status: 'À Venda' },
  ];
}
