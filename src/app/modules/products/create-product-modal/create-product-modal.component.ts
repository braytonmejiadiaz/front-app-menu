import { Component } from '@angular/core';

import { ProductService } from '../service/product.service';
import { CreateCategorieComponent } from "../../categories/create-categorie/create-categorie.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [CreateCategorieComponent, CommonModule, FormsModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent {
  modalSwitch: boolean = false;
  openModal(){
    this.modalSwitch = true;
  }
  closeModal(){
    this.modalSS.$modalProductCreate.emit(false)
  }
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
  constructor(
    public productService: ProductService,
    public modalSS: ProductService,
    private toastr:ToastrService
  ) {

  }

  categorie_first_id: number | null = null;

  selectCategory(id: number) {
    this.categorie_first_id = id;
  }

  ngOnInit(): void {

    this.modalSS.$modal.subscribe((v)=>{this.modalSwitch = v})
    this.isLoading$ = this.productService.isLoading$;
    this.configAll();
  }


  configAll(){
    this.productService.configAll().subscribe((resp:any) => {
      console.log(resp);
      this.marcas = resp.brands;
      this.categories_first = resp.categories_first;
    })
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
       this.toastr.error("Validacion","El archivo no es una imagen");
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
      || !this.file_imagen||  !this.description || !this.categorie_first_id){
        this.toastr.error("Debes rellenar todos los campos para crear un producto")
    }
    else{
      let formData = new FormData();
      formData.append("title",this.title);
      formData.append("sku",this.sku);
      formData.append("price_pes",this.price_pes+"");
      formData.append("brand_id",this.marca_id);
      formData.append("portada",this.file_imagen);
      formData.append("categorie_first_id",this.categorie_first_id+"");
      formData.append("description",this.description);

      this.productService.createProducts(formData).subscribe((resp:any) => {


        if(resp.message == 403){
          this.toastr.error("Validación",resp.message_text);
        }else{
          this.title = '';
          this.file_imagen = null;
          this.sku = '';
          this.price_pes = 0;
          this.marca_id = '';
          this.categorie_first_id = 0;
          this.description = '';
          this.description = '';
          this.imagen_previsualiza = "https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg";
          this.toastr.success("El producto se creo con exito");
        }
      })
    }

    }
}
