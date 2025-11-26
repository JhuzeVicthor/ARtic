import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AuthRequest, JwtResponse } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get fLogin(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    const { email, password } = this.loginForm.value;
    const requestData: AuthRequest = { email, password };

    this.authService.login(requestData).subscribe({
      next: (response: JwtResponse) => {
        this.loading = false;
        this.authService.setToken(response.token);
        console.log('Entrada bem-sucedida!', response.token);
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Erro ao Entrar', err);
        this.errorMessage = err.error && err.error.message ? err.error.message
          : 'Credenciais inválidas. Verifique seu email e senha.';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }

}
