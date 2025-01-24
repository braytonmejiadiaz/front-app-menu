import { Component } from '@angular/core';
import { CategoriesServicePlantilla } from '../services/categories-plantilla.service';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-modal-url-plantilla',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './modal-url-plantilla.component.html',
  styleUrl: './modal-url-plantilla.component.css'
})
export class ModalUrlPlantillaComponent {
  showModal: boolean = false;
  exportedUrl: string = '';
  qrData: string = '';

  constructor(private modalService: CategoriesServicePlantilla) {}

  ngOnInit() {
    // Suscríbete al observable para mostrar el modal y la URL cuando se emitan cambios
    this.modalService.modalSwitch$.subscribe((show: boolean) => {
      this.showModal = show;
    });

    // Suscríbete a la URL exportada
    this.modalService.exportedUrl$.subscribe((url: string) => {
      this.exportedUrl = url;
      this.qrData = url;
    });
  }

  closeModal() {
    this.modalService.closeModal(); // Cierra el modal
  }
}
