import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImportMaxProductService } from '../services/importMaxProduct.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-import-max',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-max.component.html',
  styleUrl: './import-max.component.css'
})
export class ImportMaxComponent {
  selectedFile: File | null = null;
  isLoading: boolean = false;
  progress: number = 0; // Variable para almacenar el progreso

  constructor(
    private productService: ImportMaxProductService,
    private toastr: ToastrService
  ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      // Verificar si el archivo es CSV
      if (this.selectedFile.type !== 'text/csv') {
        this.toastr.error('Solo se permiten archivos CSV.');
        return;
      }

      this.isLoading = true;
      this.progress = 0; // Reiniciar el progreso
      const formData = new FormData();
      formData.append('import_file', this.selectedFile);

      this.productService.uploadExcel(formData).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / (event.total || 1)); // Actualizar el progreso
          } else if (event.type === HttpEventType.Response) {
            this.toastr.success('Importación exitosa');
          }
        },
        error => {
          // Si el error es del tipo CSV no válido, ya lo manejamos, así que solo mostramos el error genérico
          if (error.error && error.error === 'Solo se permiten archivos CSV.') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error('Error en la importación');
          }
        }
      );
    }
  }
}
