import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateProductModalComponent } from "../create-product-modal/create-product-modal.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, FormsModule,  CreateProductModalComponent, RouterModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  modalSwitchProduct: boolean = false;
  openModalCreate(){
    this.modalSwitchProduct = true;
  }

  products:any = [];
  search:string = '';
  totalPages:number = 0;
  currentPage:number = 1;
  isLoading$:any;
  marcas:any = [];
  marca_id:string = '';
  categorie_first_id:string = '';
  categories_first:any = [];
  constructor(
    public productService: ProductService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.$modalProductCreate.subscribe((v) => {this.modalSwitchProduct = v})
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listProducts();
    this.isLoading$ = this.productService.isLoading$;
    this.configAll();
  }

  configAll(){
    this.productService.configAll().subscribe((resp:any) => {
      this.marcas = resp.brands;
      this.categories_first = resp.categories_first;

    })
  }
  listProducts(page = 1){
    let data = {
      search: this.search,
      brand_id: this.marca_id,

    }
    this.productService.listProducts(page,data).subscribe((resp:any) => {
      this.products = resp.products.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    },(err:any) => {

    })
  }

  searchTo(){
    this.listProducts();
  }

  loadPage($event:any){
    console.log($event);
    this.listProducts($event);
  }

  deleteProduct(product: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(product.id).subscribe(
        (resp: any) => {
          const INDEX = this.products.findIndex((item: any) => item.id === product.id);
          if (INDEX !== -1) {
            this.products.splice(INDEX, 1);
          }
          this.toast.success("Producto eliminado con éxito");
        },
        (err: any) => {
          this.toast.error("Error al eliminar el producto");
        }
      );
    }
  }
}
