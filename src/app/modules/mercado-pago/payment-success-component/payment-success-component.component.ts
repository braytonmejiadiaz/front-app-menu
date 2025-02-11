import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success-component.component.html',
  styleUrl: './payment-success-component.component.css'
})
export class PaymentSuccessComponent implements OnInit {
  userId: string | null = '';
  planId: string | null = '';
  paymentId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'] || null;
      this.planId = params['plan_id'] || null;
      this.paymentId = params['payment_id'] || null;

      if (this.userId && this.planId && this.paymentId) {
        this.verifySubscription();
      } else {
        this.toastr.error("Faltan datos en la confirmación del pago.");
        this.router.navigate(['/']); // Redirigir a home si faltan datos
      }
    });
  }

  verifySubscription(): void {
    const apiUrl = `/api/payment-success?user_id=${this.userId}&plan_id=${this.planId}&payment_id=${this.paymentId}`;

    this.http.get(apiUrl).subscribe({
      next: (response) => {
        console.log("Suscripción activada:", response);
        this.toastr.success("¡Pago confirmado! Tu suscripción ha sido activada.");
      },
      error: (error) => {
        console.error("Error activando la suscripción:", error);
        this.toastr.error("Hubo un problema activando tu suscripción.");
      }
    });
  }
}
