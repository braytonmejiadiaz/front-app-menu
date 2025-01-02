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
      const validTypes = ['text/csv', 'application/vnd.ms-excel'];
      if (!validTypes.includes(this.file.type)) {
        alert('El archivo debe ser un CSV válido');
        return;
      }

      this.productImportService.importProducts(this.file).subscribe(
        (response) => {
          alert(response.message); // Mensaje de éxito
        },
        (error) => {
          alert('Error al importar productos'); // Mensaje de error para el usuario
          console.error('Error completo:', error); // Imprime el objeto completo del error
          if (error.error) {
            console.error('Detalles del error (backend):', error.error); // Imprime detalles específicos del backend
          }
          if (error.status === 422) {
            console.error('Error de validación:', error.error.errors); // Si hay errores de validación, imprímelos
          }
        }
      );
    } else {
      alert('No se seleccionó ningún archivo');
    }
  }
}
