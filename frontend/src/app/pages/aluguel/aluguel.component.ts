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
  carregando: boolean = true;
  erro: string | null = null;

  constructor(private carroService: CarroService) { }

  ngOnInit(): void {
    this.obterCarrosAluguel();
  }

  obterCarrosAluguel(): void {
    this.carregando = true;
    this.erro = null;

    this.carroService.getAllCarros(true, false).subscribe({
      next: (carros) => {
        this.carrosAluguel = carros.filter(carro =>
          carro.disponivelParaAluguel === true &&
          carro.disponivelParaVenda !== true
        );
        this.carregando = false;
        console.log('Carros para aluguel carregados', this.carrosAluguel);
      },
      error: (erro) => {
        console.error('Erro ao buscar carros para aluguel: ', erro);
        this.erro = 'Não foi possível carregar os carros para aluguel. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }
}
