import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../service/service.component';
import { Toast, ToastrService } from 'ngx-toastr';
import { ProductService } from '../../products/service/product.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';  // Importar DragDrop

@Component({
  selector: 'app-create-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './create-categorie.component.html',
  styleUrl: './create-categorie.component.css'
})
export class CreateCategorieComponent {

  // Función del modal
  closeModal() {
    this.modalSS.$modal.emit(false);
  }

  // Esta es la parte de list categoría
  categories: any = [];
  search: string = '';
  totalPages: number = 0;
  currentPage: number = 1;

  // Esta es la parte de creación de categoría
  name: string = '';

  constructor(
    public categorieService: CategoriesService,
    private toastr: ToastrService,
    private modalSS: ProductService
  ) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(page = 1) {
    this.categorieService.listCategories(page, this.search).subscribe((resp: any) => {
      this.categories = resp.categories.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  isLoadingView() {
    this.categorieService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.categorieService.isLoadingSubject.next(false);
    }, 50);
  }

  save() {
    if (!this.name) {
      this.toastr.error('Validación', 'Los campos con el * son obligatorios');
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);

    this.categorieService.createCategories(formData).subscribe((resp: any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.toastr.error('Validación', 'La categoría ya existe');
        return;
      }
      this.name = '';
      this.toastr.success('Éxito', 'La categoría se registró correctamente');
    });
  }

  deleteCategory(categorie: any) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar la categoría?');
    if (confirmDelete) {
      this.categorieService.deleteCategorie(categorie.id).subscribe(
        (resp: any) => {
          // Eliminar la categoría de la lista
          const INDEX = this.categories.findIndex((item: any) => item.id === categorie.id);
          if (INDEX !== -1) {
            this.categories.splice(INDEX, 1);
          }
          this.toastr.success('Categoría eliminada con éxito');
        },
        (err: any) => {
          this.toastr.error('Error al eliminar la categoría');
        }
      );
    }
  }

  // Función para manejar el evento de arrastre
  onDrop(event: CdkDragDrop<any[]>) {
    // Mover la categoría en el array de categorías
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);

    // Enviar el nuevo orden al backend
    this.updateCategoryOrder(this.categories);
  }

  // Función para actualizar el orden de las categorías
  updateCategoryOrder(newOrder: any[]) {
    const orderData = newOrder.map((category, index) => ({
      id: category.id,
      name: category.name, // ✅ Asegurarse de enviar 'name'
      order: index + 1      // ✅ El orden actualizado
    }));

    console.log('Enviando los siguientes datos al backend:', orderData);  // Revisa el contenido

    orderData.forEach(category => {
      this.categorieService.updateCategoriesOrder(category.id, {
        name: category.name,  // ✅ Asegurarse de enviar 'name'
        order: category.order // ✅ Enviar el nuevo orden
      }).subscribe(
        (resp: any) => {
          if (resp.success) {
            this.toastr.success('Éxito', 'El orden de las categorías se ha actualizado.');
          } else {
            this.toastr.success('Éxito', 'El orden de las categorías se ha actualizado.');
          }
        },
        (error: any) => {
          console.error('Error:', error);
          if (error.error && error.error.message) {
            this.toastr.error('Error', error.error.message);
          } else {
            this.toastr.error('Error', 'Hubo un problema al actualizar el orden.');
          }
        }
      );
    });
  }


}
