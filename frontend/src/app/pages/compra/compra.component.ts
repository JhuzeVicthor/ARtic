import { Component, OnInit } from '@angular/core';
import { Carro } from '../../interface/carro.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CarroService} from '../../service/carro.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CompraComponent implements OnInit {
  carrosCompra: Carro[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private carroService: CarroService) { }

  ngOnInit(): void {
    this.getCarrosCompra();
  }

  getCarrosCompra(): void {
    this.loading = true;
    this.error = null;
    this.carroService.getAllCarros(false, true).subscribe({
      next: (carros) => {
        this.carrosCompra = carros.filter(carro =>
          carro.disponivelParaVenda === true && carro.disponivelParaAluguel !== true);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar carros para compra', err);
        this.error = 'Não foi possível carregar os carros para compra. Tente novamente mais tarde.';
        this.loading = false;
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
