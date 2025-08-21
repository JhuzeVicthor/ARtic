import {Component, OnInit} from '@angular/core';
import {Carro} from '../../interface/carro.model';
import {HttpClient} from '@angular/common/http';
import {CarroService} from '../../service/carro.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, CurrencyPipe, NgFor, NgIf} from '@angular/common';


@Component({
  selector: 'app-carro-lista',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './carro-lista.component.html',
  styleUrls: ['./carro-lista.component.scss']
})
export class CarroListaComponent implements OnInit {

  carros: Carro[] = [];

  constructor(private carroService: CarroService, private router: Router) { }

  ngOnInit() {
    this.getAllCarros();
  }

  getAllCarros(): void {
    this.carroService.getAllCarros().subscribe(
      data => {
        this.carros = data;
        console.log('Carros carregados:', this.carros);
      },
      error => {
        console.log('Erro ao carregar carros:', error);
      }
    );
  }

  deleteCarro(id: number | undefined): void {
    if (id !== undefined) {
      if (confirm('Tem certeza que deseja deletar este carro?')) {
        this.carroService.deleteCarro(id).subscribe(
          () => {
            console.log('Carro deletado com sucesso!');
            this.getAllCarros();
          },
          error => {
            console.error('Erro ao deletar carro:', error);
          }
        );
      }
    }
  }

  addNewCarro(): void {
    this.router.navigate(['/carro/novo']);
  }
}
