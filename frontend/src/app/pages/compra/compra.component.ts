import { Component, OnInit } from '@angular/core';
import { Carro } from '../../interface/carro.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarroService } from '../../service/carro.service';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss'],
})
export class CompraComponent implements OnInit {
  carrosCompra: Carro[] = [];
  carregando: boolean = true;
  error: string | null = null;

  constructor(private carroService: CarroService) { }

  ngOnInit(): void {
    this.obterCarrosVenda();
  }

  obterCarrosVenda(): void {
    this.carregando = true;
    this.error = null;

    this.carroService.getAllCarros(false, true).subscribe({
      next: (carros) => {
        this.carrosCompra = carros.filter(carro =>
          carro.disponivelParaVenda === true &&
          carro.disponivelParaAluguel !== true
        );
        this.carregando = false;
        console.log('Carros para venda carregados', this.carrosCompra);
      },
      error: (error) => {
        console.error('Erro ao buscar carros para venda: ', error);
        this.error = 'Não foi possível carregar os carros para venda. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }
}

/*
  "marca": "Ford",
  "modelo": "Ranger",
  "ano": 2022,
  "cor": "Prata",
  "placa": "RGR2022",
  "tipoCombustivel": "Diesel",
  "portas": 4,
  "precoAluguelPorDia": 0.00,
  "precoVenda": 210000.00,
  "urlImagem": "assets/carros/ford_ranger.png",
  "disponivelParaAluguel": false,
  "disponivelParaVenda": true
*/
