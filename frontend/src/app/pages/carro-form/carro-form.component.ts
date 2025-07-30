import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {CarroService} from '../../service/carro.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Carro} from '../../interface/carro.model';
import {CommonModule} from '@angular/common';



@Component({
  selector: 'app-carro-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './carro-form.component.html',
  styleUrls: ['./carro-form.component.scss'],
})
export class CarroFormComponent implements OnInit {

  carroForm: FormGroup;
  isEditMode: boolean = false;
  carroId: number | null = null;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private carroService: CarroService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.carroForm = this.fb.group({});
  }

  ngOnInit() {
    this.carroForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear + 1)]],
      cor:  ['', Validators.required],
      placa: ['', Validators.required],
      tipoCombustivel: ['', Validators.required],
      portas: ['', Validators.required, Validators.min(2)],
      precoAluguelPorDia: ['', Validators.required, Validators.min(0)],
      precoVenda: ['', Validators.required, Validators.min(0)],
      urlImagem: [''],
      disponivelParaAluguel: [true],
      disponivelParaVenda: [true],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.carroId = +id;
        this.carroService.getCarroById(this.carroId).subscribe(
          (carro: Carro) => {
            this.carroForm.patchValue(carro);
          },
          error => {
            console.error('Erro ao carregar carro para edição:', error);
            this.router.navigate(['/carros']);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.carroForm.valid) {
      const carroData: Carro = this.carroForm.value;

      if (this.isEditMode && this.carroId) {
        this.carroService.updateCarro(this.carroId, carroData).subscribe(
          response => {
            console.log('Carro atualizado com sucesso!', response);
            this.router.navigate(['/carros']);
          },
          error => {
            console.error('Erro ao atualizar carro!', error);
          }
        );
      } else {
        this.carroService.createCarro(carroData).subscribe(
          response => {
            console.log('Carro criado com sucesso!', response);
            this.router.navigate(['/carros']);
          },
          error => {
            console.error('Erro ao criar carro!', error);
          }
        );
      }
    } else {
      this.carroForm.markAllAsTouched();
      console.warn('Formulário inválido. Verifique os campos.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/carros']);
  }

  get f() { return this.carroForm.controls; }

  protected readonly Date = Date;
}
