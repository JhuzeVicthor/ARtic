import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  contatoForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.contatoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.contatoForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter para facilitar o acesso aos controles do formulário
  get f() {
    return this.contatoForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Limpar mensagens anteriores
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contatoForm.valid) {
      try {
        // Simular envio do formulário
        if (Math.random() < 0.2) {
          throw new Error('Erro simulado no envio');
        }

        // Simular sucesso
        this.successMessage = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';

        // Resetar formulário
        this.contatoForm.reset();
        this.submitted = false;

      } catch (error) {
        this.errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
      }
    }
  }
}
