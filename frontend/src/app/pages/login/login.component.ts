import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // Certifique-se de que ReactiveFormsModule e RouterLink estão aqui
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Formulário de login
  submitted = false; // Flag para rastrear se o formulário foi submetido
  loading = false;   // Flag para indicar estado de carregamento
  errorMessage: string | null = null; // Mensagem de erro para exibir

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get fLogin(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true; // Marca o formulário como submetido
    this.loading = true;   // Ativa o estado de carregamento
    this.errorMessage = null; // Limpa qualquer mensagem de erro anterior

    // Para a execução se o formulário for inválido
    if (this.loginForm.invalid) {
      this.loading = false; // Desativa o carregamento se houver erros de validação
      return;
    }

    // Obtenha os valores do formulário
    const { email, password, rememberMe } = this.loginForm.value;
    console.log('Dados de Login:', { email, password, rememberMe });

    // Simulação de chamada de API para login (substitua isso pela sua lógica de autenticação real)
    setTimeout(() => {
      this.loading = false; // Desativa o carregamento

      // Lógica de simulação:
      if (email === 'teste@artic.com' && password === '123456') { // Exemplo de credenciais válidas
        console.log('Login bem-sucedido!');
        this.router.navigate(['/']); // Redireciona para a home ou dashboard após o login
      } else {
        this.errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
      }
    }, 1500);
  }

  // Método para navegar para a página de cadastro (se você tiver uma rota /cadastro)
  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }
}
