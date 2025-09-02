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
    this.carroService.getCarrosAluguel()
      .subscribe(carros => {
        this.carrosAluguel = carros;
      });
  }
}
