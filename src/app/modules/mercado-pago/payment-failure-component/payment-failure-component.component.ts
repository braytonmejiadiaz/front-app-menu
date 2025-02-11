import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-failure-component',
  standalone: true,
  imports: [],
  templateUrl: './payment-failure-component.component.html',
  styleUrl: './payment-failure-component.component.css'
})
export class PaymentFailureComponentComponent {
  message = "El pago no fue exitoso. Por favor, intente nuevamente.";

}
