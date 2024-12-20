import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { ImportMaxProductService } from '../services/importMaxProduct.service';


@Component({
  selector: 'app-import-max',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-max.component.html',
  styleUrl: './import-max.component.css'
})
export class ImportMaxComponent {
  file: File | null = null;
  isLoading: boolean = false;

  constructor(private productImportService: ImportMaxProductService) {
    // Suscribirse a isLoading$ para controlar el estado de carga
    this.productImportService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (this.file) {
      this.productImportService.importProducts(this.file).subscribe(
        (response) => {
          alert(response.message); // Mensaje de éxito
        },
        (error) => {
          alert('Error al importar productos'); // Mensaje de error
        }
      );
    }
  }
}
