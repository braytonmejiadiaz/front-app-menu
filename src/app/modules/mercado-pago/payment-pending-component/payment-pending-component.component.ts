import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-pending-component',
  standalone: true,
  imports: [],
  templateUrl: './payment-pending-component.component.html',
  styleUrl: './payment-pending-component.component.css'
})
export class PaymentPendingComponentComponent {
  message = "Su pago está pendiente de confirmación. Por favor, espere.";

}
