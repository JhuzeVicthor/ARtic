import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Car {
  id: number;
  name: string;
  year: number;
  category: string;
  performance: string;
  status: string;
  rentalPrice: number;
  salePrice: number;
  color: string;
  fuel: string;
  doors: number;
  mileage: number;
  transmission: string;
  seats: number;
  description: string;
  mainImage: string;
  gallery: string[];
  features: string[]; // Exemplo: Ar Condicionado, Vidros Elétricos
  isAcquired?: boolean; // Se o carro já foi alugado ou vendido
}

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,],
  templateUrl: './carro-detalhes.component.html',
  styleUrls: ['carro-detalhes.component.scss']
})
export class CarroDetalhesComponent implements OnInit {
  carId!: number;
  car!: Car;
  mainCarImage!: string;
  similarCars: Car[] = [];

  currentOption: 'aluguel' | 'compra' = 'aluguel';

  rentalDates = {
    pickup: '',
    return: ''
  };
  rentalDays: number = 0;
  totalRentalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.carId = Number(params.get('id'));
      this.loadCarDetails(this.carId);
      this.loadSimilarCars(); // Carrega carros similares
    });
  }

  loadCarDetails(id: number): void {
    // Simula a busca de detalhes do carro via API
    // Em um projeto real, você usaria um CarService para fazer uma requisição HTTP
    const allCars: Car[] = this.getMockCars(); // Pega todos os carros mock
    const foundCar = allCars.find(c => c.id === id);

    if (foundCar) {
      this.car = foundCar;
      this.mainCarImage = this.car.mainImage;
    } else {
      console.error('Carro não encontrado!');
      this.router.navigate(['/carros']); // Redireciona se o carro não for encontrado
    }
  }

  loadSimilarCars(): void {
    // Simula a busca de carros similares
    // Em um projeto real, isso seria uma chamada de API, talvez filtrando por categoria ou marca
    const allCars: Car[] = this.getMockCars();
    this.similarCars = allCars
      .filter(c => c.id !== this.carId) // Exclui o carro atual
      .slice(0, 3); // Pega os 3 primeiros como similares
  }

  changeMainImage(image: string): void {
    this.mainCarImage = image;
  }

  calculateTotalRental(): void {
    if (this.rentalDates.pickup && this.rentalDates.return) {
      const pickup = new Date(this.rentalDates.pickup);
      const _return = new Date(this.rentalDates.return);

      if (_return <= pickup) {
        this.rentalDays = 0;
        this.totalRentalPrice = 0;
        // Opcional: mostrar um erro para o usuário
        alert('A data de devolução deve ser posterior à data de retirada.');
        return;
      }

      const diffTime = Math.abs(_return.getTime() - pickup.getTime());
      this.rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalRentalPrice = this.rentalDays * this.car.rentalPrice;
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
    // Lógica para alugar o carro
    console.log(`Alugando ${this.car.name} de ${this.rentalDates.pickup} a ${this.rentalDates.return}. Total: R$ ${this.totalRentalPrice}`);
    alert(`Carro ${this.car.name} alugado com sucesso!`);
    // Redirecionar para uma página de confirmação ou dashboard do usuário
    // this.router.navigate(['/aluguel/confirmacao', this.car.id]);
  }

  buyCar(): void {
    // Lógica para manifestar interesse na compra
    console.log(`Interesse em comprar ${this.car.name}.`);
    alert(`Obrigado pelo seu interesse em ${this.car.name}! Entraremos em contato em breve.`);
    // Redirecionar para uma página de contato ou formulário específico
    // this.router.navigate(['/contato', { carId: this.car.id }]);
  }

  // Dados mock para simulação
  private getMockCars(): Car[] {
    return [
      {
        id: 1,
        name: 'BMW X3',
        year: 2021,
        category: 'SUV de luxo',
        performance: 'performance excepcional',
        status: 'Disponível',
        rentalPrice: 250.00,
        salePrice: 285000.00,
        color: 'Branco',
        fuel: 'Gasolina',
        doors: 4,
        mileage: 25000,
        transmission: 'Automática',
        seats: 5,
        description: 'O BMW X3 2021 combina elegância, performance e tecnologia de ponta. Com motor potente, interior luxuoso e sistemas de segurança avançados, oferece uma experiência de condução incomparável para quem busca qualidade e conforto.',
        mainImage: 'assets/images/car_details_main.jpg',
        gallery: [
          'assets/images/car_details_thumb1.jpg',
          'assets/images/car_details_thumb2.jpg',
          'assets/images/car_details_thumb3.jpg',
          'assets/images/car_details_thumb4.jpg',
          'assets/images/car_details_thumb5.jpg',
        ],
        features: ['Ar Condicionado', 'Direção Hidráulica', 'Vidros Elétricos', 'Airbags', 'ABS', 'Teto Solar']
      },
      {
        id: 2,
        name: 'Audi Q5',
        year: 2020,
        category: 'SUV Premium',
        performance: 'conforto e tecnologia',
        status: 'Disponível',
        rentalPrice: 230.00,
        salePrice: 265000.00,
        color: 'Prata',
        fuel: 'Gasolina',
        doors: 4,
        mileage: 30000,
        transmission: 'Automática',
        seats: 5,
        description: 'Audi Q5 2020: Um SUV que redefine luxo e performance, perfeito para a cidade ou aventuras.',
        mainImage: 'assets/images/similar_audi_q5.jpg',
        gallery: [],
        features: ['Ar Condicionado', 'Bancos de Couro', 'Sensor de Estacionamento']
      },
      {
        id: 3,
        name: 'Mercedes GLC',
        year: 2021,
        category: 'SUV de Luxo',
        performance: 'elegância e potência',
        status: 'Disponível',
        rentalPrice: 280.00,
        salePrice: 295000.00,
        color: 'Preto',
        fuel: 'Diesel',
        doors: 4,
        mileage: 20000,
        transmission: 'Automática',
        seats: 5,
        description: 'Mercedes GLC 2021: Design arrojado e tecnologia avançada para uma experiência de condução superior.',
        mainImage: 'assets/images/similar_mercedes_glc.jpg',
        gallery: [],
        features: ['Ar Condicionado', 'Teto Solar Panorâmico', 'Câmera de Ré']
      },
      {
        id: 4,
        name: 'Volvo XC60',
        year: 2020,
        category: 'SUV Compacto',
        performance: 'segurança e estilo',
        status: 'Disponível',
        rentalPrice: 240.00,
        salePrice: 275000.00,
        color: 'Azul',
        fuel: 'Híbrido',
        doors: 4,
        mileage: 28000,
        transmission: 'Automática',
        seats: 5,
        description: 'Volvo XC60 2020: Combinação perfeita de segurança escandinava, design moderno e alta performance.',
        mainImage: 'assets/images/similar_volvo_xc60.jpg',
        gallery: [],
        features: ['Ar Condicionado', 'Piloto Automático Adaptativo', 'Assistente de Faixa']
      }
    ];
  }
}
