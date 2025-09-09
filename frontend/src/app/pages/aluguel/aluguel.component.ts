import {Component, OnInit} from '@angular/core';
import {Carro} from '../../interface/carro.model';
import {CarroService} from '../../service/carro.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-aluguel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.scss']
})
export class AluguelComponent implements OnInit {

  carrosAluguel: Carro[] = [];

  constructor(private carroService: CarroService) { }

  ngOnInit(): void {
    this.getCarrosAluguel();
  }

  getCarrosAluguel(): void {
    console.log('Buscando carros para aluguel...');
    this.carroService.getCarrosAluguel()
      .subscribe({
        next: (carros) => {
          this.carrosAluguel = carros.filter(carro =>
            carro.disponivelParaAluguel === true && carro.disponivelParaVenda === false
          );
          console.log('Carros recebidos para aluguel:', this.carrosAluguel);
        },
        error: (err) => {
          console.error('Erro ao buscar carros:', err);
        }
      });
  }

}
