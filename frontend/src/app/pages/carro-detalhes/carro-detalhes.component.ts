import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
    if (!this.carro.disponivelParaAluguel && this.carro.disponivelParaVenda) {
      this.currentOption = 'compra';
    }
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
        this.loadSimilarCars();
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes do carro:', erro);
        alert('Erro ao carregar detalhes do carro. Tente novamente.');
        this.router.navigate(['/aluguel']);
      }
    });
  }


  loadSimilarCars(): void {
    let disponivelParaAluguel = false;
    let disponivelParaVenda = false;
    let filterCondition: (carro: Carro) => boolean;

    if (this.currentOption === 'aluguel') {
      disponivelParaAluguel = true;
      filterCondition = (c) => c.id !== this.carId && c.disponivelParaAluguel === true;
    } else {
      disponivelParaVenda = true;
      filterCondition = (c) => c.id !== this.carId && c.disponivelParaVenda === true;
    }

    this.carroService.getAllCarros(disponivelParaAluguel, disponivelParaVenda).subscribe({
      next: (carros) => {
        this.similarCars = carros
          .filter(filterCondition)
          .slice(0, 3);
        console.log(`Carros similares para ${this.currentOption} carregados:`, this.similarCars);
      },
      error: (erro) => {
        console.error('Erro ao carregar carros similares:', erro);
      }
    });
  }

  setCurrentOption(option: 'aluguel' | 'compra'): void {
    if (this.currentOption !== option) {
      this.currentOption = option;
      this.loadSimilarCars();
    }
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
    const pickupDateString = this.rentalDates.pickup;
    const returnDateString = this.rentalDates.return;
    if (!pickupDateString || !returnDateString) {
      this.rentalDays = 0;
      this.totalRentalPrice = 0;
      return;
    }

    const pickup = new Date(pickupDateString);
    const _return = new Date(returnDateString);
    if (isNaN(pickup.getTime()) || isNaN(_return.getTime()) || _return <= pickup) {
      this.rentalDays = 0;
      this.totalRentalPrice = 0;
      if (!isNaN(pickup.getTime()) && !isNaN(_return.getTime()) && _return <= pickup) {
        alert('A data de devolução deve ser posterior à data de retirada.');
      } else if (isNaN(pickup.getTime()) || isNaN(_return.getTime())) {}
      return;
    }

    const diffTime = Math.abs(_return.getTime() - pickup.getTime());
    this.rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.totalRentalPrice = this.rentalDays * this.carro.precoAluguelPorDia;
  }

  rentCar(): void {
    if (this.rentalDays === 0 || !this.rentalDates.pickup || !this.rentalDates.return) {
      alert('Por favor, selecione as datas de retirada e devolução válidas.');
      return;
    }
    const phoneNumber = '5582999906795';
    const pickupDate = new Date(this.rentalDates.pickup).toLocaleDateString('pt-BR');
    const returnDate = new Date(this.rentalDates.return).toLocaleDateString('pt-BR');
    const formattedPrice = this.totalRentalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const message = `Olá! Tenho interesse em alugar o ${this.carro.marca} ${this.carro.modelo} (${this.carro.ano}).\n` +
      `De: ${pickupDate}\n` +
      `Até: ${returnDate}\n` +
      `Pelo valor estimado de: ${formattedPrice}\n` +
      `Por favor, me ajude a finalizar a reserva.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  buyCar(): void {
    const phoneNumber = '5582999906795';
    const formattedPrice = this.carro.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const message = `Olá! Tenho interesse em comprar o ${this.carro.marca} ${this.carro.modelo} (${this.carro.ano}).\n` +
      `Preço: ${formattedPrice}\n` +
      `Gostaria de mais informações e de agendar uma visita/test drive.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
