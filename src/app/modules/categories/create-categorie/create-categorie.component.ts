import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../service/service.component';
import { Toast, ToastrService } from 'ngx-toastr';
import { resolve } from 'node:path';
import { ProductService } from '../../products/service/product.service';

@Component({
  selector: 'app-create-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-categorie.component.html',
  styleUrl: './create-categorie.component.css'
})
export class CreateCategorieComponent {

// funcion del modal
closeModal(){
  this.modalSS.$modal.emit(false);
}

// esta es la parte de list categoria
  categories:any = [];
  search:string = '';
  totalPages:number = 0;
  currentPage:number = 1;

// esta es la parte de creacion de categoria
  name:string = '';
  constructor(
    public categorieService: CategoriesService,
    private toastr: ToastrService,
    private modalSS: ProductService,

  ) {

  }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(page = 1){
    this.categorieService.listCategories(page,this.search).subscribe((resp:any) =>{
      this.categories = resp.categories.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  isLoadingView(){
    this.categorieService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.categorieService.isLoadingSubject.next(false);
    }, 50);
  }

  save(){

    if(!this.name ){
      this.toastr.error("Validacion","Los campos con el * son obligatorio");
      return;
    }



    let formData = new FormData();
    formData.append("name",this.name);

    this.categorieService.createCategories(formData).subscribe((resp:any) => {
      console.log(resp);

      if(resp.message == 403){
        this.toastr.error("Validacion","La categoria ya existe");
        return;
      }
      this.name = '';
      this.toastr.success("Exito","La categoria se registro perfectamente");
    })
  }


  deleteCategory(categorie:any) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar la categoria?");
    if (confirmDelete) {
      this.categorieService.deleteCategorie(categorie.id).subscribe(
        (resp: any) => {
          // Eliminar la categoria de la lista
          const INDEX = this.categories.findIndex((item: any) => item.id === categorie.id);
          if (INDEX !== -1) {
            this.categories.splice(INDEX, 1);
          }
            this.toastr.success("Categoría eliminado con exito");
        },
        (err: any) => {
          this.toastr.success("Error al eliminar la categoría");
        }
      );
    }


  }

}
