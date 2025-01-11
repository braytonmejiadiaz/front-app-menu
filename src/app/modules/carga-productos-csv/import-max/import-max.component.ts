import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { ImportMaxProductService } from '../services/importMaxProduct.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-import-max',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-max.component.html',
  styleUrl: './import-max.component.css'
})
export class ImportMaxComponent {
  selectedFile: File | null = null;

  constructor(private productService: ImportMaxProductService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('import_file', this.selectedFile);
      this.productService.uploadExcel(formData).subscribe(
        response => {
          console.log('Importación exitosa', response);
        },
        error => {
          console.error('Error en la importación', error);
        }
      );
    }
  }
}
