import {Component, OnInit} from '@angular/core';
import {Carro} from '../../interface/carro.model';
import {CarroService} from '../../service/carro.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
  tipoServico: 'aluguel' | 'compra' | 'todos' = "todos";
  tituloPagina: string =  'Carros para compra'
  mensagemVazio: string = 'Nenhum carro adicionado';
  isAdminView: boolean = false;

  constructor(
    private carroService: CarroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isAdminView = url.some(segment => segment.path === 'admin');
    });

    this.route.queryParams.subscribe(params => {
      this.tipoServico = params['tipo'] || 'todos';
      this.setPageInfo(this.tipoServico);
      this.getAllCarros();
    });
  }

  setPageInfo(tipo: string): void {
    if (tipo === 'aluguel') {
      this.tituloPagina = 'Carro para Aluguel';
      this.mensagemVazio = 'Nenhum carro disponivel para aluguel';
    } else if (tipo === 'compra') {
      this.tituloPagina = 'Carro para Comprar';
      this.mensagemVazio = 'Nenhum carro disponivel para comprar';
    } else  {
      this.tituloPagina = 'Todos os carros';
      this.mensagemVazio = 'Nenhum carro disponivel';
    }
  }

  getAllCarros(): void {
    let disponivelParaAluguel: boolean | undefined;
    let disponivelParaVenda: boolean | undefined;

    if (this.tipoServico === 'aluguel') {
      disponivelParaAluguel = true;
      disponivelParaVenda = false;
    } else if (this.tipoServico === 'compra') {
      disponivelParaAluguel = false;
      disponivelParaVenda = true;
    }

    this.carroService.getAllCarros(disponivelParaAluguel, disponivelParaVenda).subscribe(
      (data: Carro[]) => {
        if (this.tipoServico === 'aluguel') {
          this.carros = data.filter(c => c.disponivelParaAluguel && !c.disponivelParaVenda);
        } else if (this.tipoServico === 'compra') {
          this.carros = data.filter(c => c.disponivelParaVenda && !c.disponivelParaAluguel);
        } else {
          this.carros = data;
        }
      },
      error => {
        console.error('Erro ao buscar carros:', error);
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
