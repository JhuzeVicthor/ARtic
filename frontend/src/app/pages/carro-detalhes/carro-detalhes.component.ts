import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Carro } from '../../interface/carro.model';
import { CarroService } from '../../service/carro.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './carro-detalhes.component.html',
  styleUrls: ['carro-detalhes.component.scss']
})
export class CarroDetalhesComponent implements OnInit {
  carId!: number;
  carro: Carro = this.getEmptyCarro();
  mainCarImage!: string;
  similarCars: Carro[] = [];

  currentOption: 'aluguel' | 'compra' = 'aluguel';

  rentalDates = {
    pickup: '',
    return: ''
  };
  rentalDays: number = 0;
  totalRentalPrice: number = 0;

  private previousUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carroService: CarroService
  ) { }

  ngOnInit(): void {
    this.detectPreviousPage();
    this.route.paramMap.subscribe(params => {
      this.carId = Number(params.get('id'));
      this.loadCarDetails(this.carId);
      this.loadSimilarCars();
    });
  }

  private getEmptyCarro(): Carro {
    return {
      id: 0,
      marca: '',
      modelo: '',
      ano: 0,
      cor: '',
      placa: '',
      tipoCombustivel: '',
      portas: 0,
      precoAluguelPorDia: 0,
      precoVenda: 0,
      urlImagem: '',
      disponivelParaAluguel: false,
      disponivelParaVenda: false
    };
  }

  private setDefaultOptionBasedOnCarAvailability(): void {
    // Se o carro não estiver disponível para aluguel, mostra compra por padrão
    if (!this.carro.disponivelParaAluguel && this.carro.disponivelParaVenda) {
      this.currentOption = 'compra';
    }
    // Caso contrário, mantém aluguel como padrão
  }


  private detectPreviousPage(): void {
    // Pega a URL anterior do histórico de navegação
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.previousNavigation) {
      this.previousUrl = navigation.previousNavigation.finalUrl?.toString() || '';

      // Define a aba padrão baseada na página anterior
      if (this.previousUrl.includes('/compra')) {
        this.currentOption = 'compra';
      } else if (this.previousUrl.includes('/aluguel')) {
        this.currentOption = 'aluguel';
      } else {
        // Se não veio de uma página específica, usa a disponibilidade do carro
        this.setDefaultOptionBasedOnCarAvailability();
      }
    } else {
      this.setDefaultOptionBasedOnCarAvailability();
    }
  }

  private adjustDefaultOptionAfterCarLoad(): void {
    // Se veio de uma página específica, mantém a escolha
    if (this.previousUrl.includes('/compra') || this.previousUrl.includes('/aluguel')) {
      return;
    }

    // Se não veio de página específica, ajusta baseado na disponibilidade
    if (!this.carro.disponivelParaAluguel && this.carro.disponivelParaVenda) {
      this.currentOption = 'compra';
    } else if (this.carro.disponivelParaAluguel && !this.carro.disponivelParaVenda) {
      this.currentOption = 'aluguel';
    }
    // Se estiver disponível para ambos, mantém o padrão (aluguel)
  }




  loadCarDetails(id: number): void {
    this.carroService.getCarroById(id).subscribe({
      next: (carro) => {
        this.carro = carro;
        this.mainCarImage = this.carro.urlImagem || 'assets/placeholder-carro.jpg';
        this.adjustDefaultOptionAfterCarLoad();
        console.log('Carro carregado:', this.carro);
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes do carro:', erro);
        alert('Erro ao carregar detalhes do carro. Tente novamente.');
        this.router.navigate(['/aluguel']);
      }
    });
  }


  loadSimilarCars(): void {
    this.carroService.getAllCarros(true, false).subscribe({
      next: (carros) => {
        this.similarCars = carros
          .filter(c =>
            c.id !== this.carId &&
            c.disponivelParaAluguel === true
          )
          .slice(0, 3);
        console.log('Carros similares carregados:', this.similarCars);
      },
      error: (erro) => {
        console.error('Erro ao carregar carros similares:', erro);
      }
    });
  }

  // Métodos para gerar informações adicionais baseadas nos dados reais
  getCategory(): string {
    // Baseia a categoria no tipo de carro
    if (this.carro.precoAluguelPorDia > 200) return 'SUV de luxo';
    if (this.carro.precoAluguelPorDia > 100) return 'Sedan Premium';
    return 'Compacto';
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  getPerformance(): string {
    // Baseia a performance no preço
    if (this.carro.precoAluguelPorDia > 200) return 'performance excepcional';
    if (this.carro.precoAluguelPorDia > 100) return 'conforto e tecnologia';
    return 'economia e eficiência';
  }

  getMileage(): number {
    // Quilometragem padrão baseada no ano
    const currentYear = new Date().getFullYear();
    const age = currentYear - this.carro.ano;
    return age <= 1 ? 15000 : 35000;
  }

  getTransmission(): string {
    // Assume automático para carros mais caros
    return this.carro.precoAluguelPorDia > 150 ? 'Automática' : 'Manual';
  }

  getSeats(): number {
    return this.carro.portas === 2 ? 2 : 5; // Assume 5 lugares para 4 portas
  }

  getDescription(): string {
    return `O ${this.carro.marca} ${this.carro.modelo} ${this.carro.ano} combina elegância, performance e tecnologia de ponta. Com design moderno, interior confortável e sistemas de segurança avançados, oferece uma experiência de condução incomparável na cor ${this.carro.cor}. Perfecto para quem busca qualidade e conforto.`;
  }

  calculateTotalRental(): void {
    if (this.rentalDates.pickup && this.rentalDates.return) {
      const pickup = new Date(this.rentalDates.pickup);
      const _return = new Date(this.rentalDates.return);

      if (_return <= pickup) {
        this.rentalDays = 0;
        this.totalRentalPrice = 0;
        alert('A data de devolução deve ser posterior à data de retirada.');
        return;
      }

      const diffTime = Math.abs(_return.getTime() - pickup.getTime());
      this.rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalRentalPrice = this.rentalDays * this.carro.precoAluguelPorDia;
    } else {
      this.rentalDays = 0;
      this.totalRentalPrice = 0;
    }
  }

  rentCar(): void {
    if (this.rentalDays === 0 || !this.rentalDates.pickup || !this.rentalDates.return) {
      alert('Por favor, selecione as datas de retirada e devolução válidas.');
      return;
    }

    console.log(`Alugando ${this.carro.marca} ${this.carro.modelo} de ${this.rentalDates.pickup} a ${this.rentalDates.return}. Total: R$ ${this.totalRentalPrice}`);
    alert(`Carro ${this.carro.marca} ${this.carro.modelo} alugado com sucesso!`);
  }

  buyCar(): void {
    console.log(`Interesse em comprar ${this.carro.marca} ${this.carro.modelo}.`);
    alert(`Obrigado pelo seu interesse em ${this.carro.marca} ${this.carro.modelo}! Entraremos em contato em breve.`);
  }
}
