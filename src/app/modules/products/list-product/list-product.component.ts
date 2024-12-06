import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  products:any = [];
  search:string = '';
  totalPages:number = 0;
  currentPage:number = 1;

  isLoading$:any;

  marcas:any = [];
  marca_id:string = '';
  categorie_first_id:string = '';
  categorie_second_id:string = '';
  categorie_third_id:string = '';
  categories_first:any = [];
  categories_seconds:any = [];
  categories_seconds_backups:any = [];
  categories_thirds:any = [];
  categories_thirds_backups:any = [];
  constructor(
    public productService: ProductService,

  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listProducts();
    this.isLoading$ = this.productService.isLoading$;
    this.configAll();
  }

  configAll(){
    this.productService.configAll().subscribe((resp:any) => {
      console.log(resp);
      this.marcas = resp.brands;
      this.categories_first = resp.categories_first;
      this.categories_seconds = resp.categories_seconds;
      this.categories_thirds = resp.categories_thirds;
    })
  }
  listProducts(page = 1){
    let data = {
      search: this.search,
      brand_id: this.marca_id,
      categorie_first_id: this.categorie_first_id,
      categorie_second_id: this.categorie_second_id,
      categorie_third_id: this.categorie_third_id,
    }
    this.productService.listProducts(page,data).subscribe((resp:any) => {
      console.log(resp);
      this.products = resp.products.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    },(err:any) => {
      console.log(err);
    })
  }

  changeDepartamento(){
    this.categories_seconds_backups = this.categories_seconds.filter((item:any) =>
    item.categorie_second_id == this.categorie_first_id
    )
  }
  changeCategorie(){
    this.categories_thirds_backups = this.categories_thirds.filter((item:any) =>
    item.categorie_second_id == this.categorie_second_id
    )
  }

  searchTo(){
    this.listProducts();
  }

  loadPage($event:any){
    console.log($event);
    this.listProducts($event);
  }

  deleteProduct(product:any) {
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`);
    if (confirmDelete) {
      this.productService.deleteProduct(product.id).subscribe(
        (resp: any) => {
          // Eliminar el producto de la lista
          const INDEX = this.products.findIndex((item: any) => item.id === product.id);
          if (INDEX !== -1) {
            this.products.splice(INDEX, 1);
          }
          console.log('Producto eliminado:', resp);
        },
        (err: any) => {
          console.error('Error al eliminar el producto:', err);
        }
      );
    }


  }
}
