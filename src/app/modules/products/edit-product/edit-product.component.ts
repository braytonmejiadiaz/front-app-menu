import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCategorieComponent } from '../../categories/create-categorie/create-categorie.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {


  PRODUCT_ID : string = '';
  PRODUCT_SELECTED : any;

  config: any = {
    versionCheck: false,
}

  title:string = '';
  sku:string = '';
  price_pes:number = 0;
  description:any = "";
  imagen_previsualiza:any = "https://tucartaya.com/wp-content/uploads/2024/12/upload-media.png";
  file_imagen:any = null;
  marca_id:string = '';
  marcas:any = []

  isLoading$:any;
  categories_first:any = [];
  categorie_first_id: number | null = null;

  constructor(
    public productService: ProductService,
    public modalSS: ProductService,
    private activeRoute: ActivatedRoute,
    private toastr:ToastrService
  ) {}


  selectCategory(id: number) {
    this.categorie_first_id = id;
  }

  ngOnInit(): void {
    this.isLoading$ = this.productService.isLoading$;
    this.configAll();
    // obtenemos el id del producto y lo devolvemos como parametro
    this.activeRoute.paramMap.subscribe((resp:any) =>{
      this.PRODUCT_ID = resp.get('id');
    });

  }

  showProduct(){
    this.productService.showProduct(this.PRODUCT_ID).subscribe((resp:any) =>{
    this.PRODUCT_SELECTED = resp.product
    this.title = resp.product.title
    this.sku = resp.product.sku
    this.price_pes = resp.product.price_pes
    this.description = resp.product.description
    this.imagen_previsualiza = resp.product.imagen
    this.marca_id = resp.product.brand_id
    this.categories_first = resp.categorie.categorie_first_id
  })
  }


  configAll(){
    this.productService.configAll().subscribe((resp:any) => {
       console.log('Categories:', resp.categories_first);
      this.marcas = resp.brands;
      this.categories_first = resp.categories_first;
      this.showProduct();
    })
  }


  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      // this.toastr.error("Validacion","El archivo no es una imagen");
      return;
    }
    this.file_imagen = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_imagen);
    reader.onloadend = () => this.imagen_previsualiza = reader.result;
    this.isLoadingView();
  }

  isLoadingView(){
    this.productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.productService.isLoadingSubject.next(false);
    }, 50);
  }

  public onChange(event: any) {
    this.description = event.editor.getData();
  }

  save(){

    if(!this.title || !this.sku  || !this.price_pes || !this.marca_id
      || !this.description || !this.categorie_first_id){

      console.log(this.categorie_first_id)
      this.toastr.error('Debes seleccionar una categoría');

    }
    else{
      let formData = new FormData();
      formData.append("title",this.title);
      formData.append("sku",this.sku);
      formData.append("price_pes",this.price_pes+"");
      formData.append("brand_id",this.marca_id);
      if(this.file_imagen){
        formData.append("portada",this.file_imagen);
      }
      formData.append("categorie_first_id",this.categorie_first_id+"");

      formData.append("description",this.description);

      this.productService.updateProducts(this.PRODUCT_ID,formData).subscribe((resp:any) => {

        if(resp.message == 403){
          this.toastr.error('Error al editar tu producto');
        }else{

          this.file_imagen = null;

          this.imagen_previsualiza = "https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg";
          console.log("El product se actualizo perfectamente");
          this.toastr.success('Producto actualizado con exito');
        }


      })
    }

    }
}
