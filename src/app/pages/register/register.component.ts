import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  mostrarContrasena: boolean = false;
  formulario: FormGroup;
  code_user: string = '';

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
    });
  }

  alternarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  ngOnInit(): void {
    if (this.authService.token && this.authService.user) {
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 500);
      return;
    }

    // Obtener el código de usuario desde los parámetros de consulta
    this.activedRouter.queryParams.subscribe((params: any) => {
      this.code_user = params.code;
    });

    if (this.code_user) {
      const data = { code_user: this.code_user };
      this.authService.verifiedAuth(data).subscribe(
        (resp: any) => {
          if (resp.message === 403) {
            this.toastr.error(
              'Validación',
              'El código no pertenece a ningún usuario'
            );
          }

          if (resp.message === 200) {
            this.toastr.success('Éxito', 'El correo se verificó');

            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 500);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  login() {
    if (this.formulario.invalid) {
      this.toastr.error('Validación', 'Necesitas ingresar todos los campos');
      return;
    }

    const { email, password } = this.formulario.value;
    this.authService.login(email, password).subscribe(
      (resp: any) => {
        if (resp.error?.error) {
          this.toastr.error('Validación', 'Las credenciales son incorrectas');
          return;
        }
        if (resp === true) {
          this.toastr.success('Bienvenido a FoodLogic');
          this.router.navigateByUrl('/usuario/lista-plantillas');
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error', 'Ocurrió un problema al iniciar sesión');
      }
    );
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
