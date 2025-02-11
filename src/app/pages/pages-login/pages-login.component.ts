import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './pages-login.component.html',
  styleUrl: './pages-login.component.css',
})
export class PagesLoginComponent {
  name: string = '';
  surname: string = '';
  name_bussines: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  plan_id: number = 1; // Asegúrate de capturar el ID del plan seleccionado

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register() {
    if (
      !this.name ||
      !this.surname ||
      !this.name_bussines ||
      !this.email ||
      !this.password ||
      !this.phone
    ) {
      this.toastr.error('Todos los campos son obligatorios para registrarte.');
      return;
    }

    let data = {
      name: this.name,
      surname: this.surname,
      name_bussines: this.name_bussines,
      email: this.email,
      password: this.password,
      phone: this.phone,
      plan_id: this.plan_id,
    };

    this.authService.register(data).subscribe({
      next: (response: any) => {
        if (response && response.payment_link) {
          this.toastr.success('Registro exitoso. Redirigiendo a Mercado Pago...');
          setTimeout(() => {
            window.location.href = response.payment_link;
          }, 2000); // Agrega un pequeño retraso para que el usuario vea el mensaje
        } else {
          this.toastr.error('Error al generar el enlace de pago.');
        }
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.toastr.error('No se pudo completar el registro.');
      },
    });
  }
}
