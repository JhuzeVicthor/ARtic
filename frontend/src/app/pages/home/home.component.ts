import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Carro} from '../../interface/carro.model';
import {CarroService} from '../../service/carro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit {

  carrosDestaqueAluguel: Carro[] = [];
  carrosAVenda: Carro[] = [];

  tipoService: string = '' ;
  marca: string = '' ;
  categoria: string = '' ;

  constructor(
    private router: Router,
    private carroService : CarroService,
    ) {}

  ngOnInit() {
    this.loadFeaturedCars();
  }

  loadFeaturedCars(): void {
    this.carroService.getAllCarros().subscribe((data: Carro[]) => {
        this.carrosDestaqueAluguel = data.filter(carro => carro.disponivelParaAluguel).slice(0, 3);
        this.carrosAVenda = data.filter(carro => carro.disponivelParaVenda).slice(0, 3);

        console.log('Carros para Aluguel:', this.carrosDestaqueAluguel);
        console.log('Carros para Venda:', this.carrosAVenda);
      },
      error => {
        console.error('Erro ao carregar carros em destaque: ', error);
      }
    );
  }

  alugarAgora(): void {
    this.router.navigate(['/api/carros'], {queryParams: {tipo: 'Aluguel'} });
  }

  comprarAgora(): void {
    this.router.navigate(['/api/carros'], {queryParams: {tipo: 'Comprar'} });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  buscarVeiculo(): void {
    console.log('Buscar veículo:', { tipoServico: this.tipoService, marca: this.marca, categoria: this.categoria });
    this.router.navigate(['/carros'], { queryParams: { tipo: this.tipoService, marca: this.marca, categoria: this.categoria } });
  }
}
