import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  submitted = false;
  loading = true;
  error: string | null = null;

  get fCadastro(): {[key: string]: AbstractControl} {
    return this.cadastroForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      termsAccept: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmpassword = form.get('confirmPassword')?.value;
    return password && confirmpassword && password === confirmpassword ? null : {mismatch: true};
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    this.error = null;

    if (this.cadastroForm.invalid) {
      this.loading = false;
      return;
    }
    const { fullName, email, password } = this.cadastroForm.value;
    console.log('Dados de Cadastro:', { fullName, email, password });

    setTimeout(() => {
      this.loading = false;
      this.error = 'Cadastro realizado com sucesso! Redirecionando para o login...';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }, 1500);
  }
}
