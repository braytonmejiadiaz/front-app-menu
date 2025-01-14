import { Component } from '@angular/core';

import { ProductService } from '../service/product.service';
import { CreateCategorieComponent } from "../../categories/create-categorie/create-categorie.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



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
  // resumen:string = '';
  price_pes:number = 0;
  // price_usd:number = 0;
  description:any = "";
  imagen_previsualiza:any = "https://tucartaya.com/wp-content/uploads/2024/12/upload-media.png";
  file_imagen:any = null;
  marca_id:string = '';
  marcas:any = []

  isLoading$:any;

  //categorie_first_id:string = '';
  // categorie_second_id:string = '';
  // categorie_third_id:string = '';
  categories_first:any = [];
  // categories_seconds:any = [];
  // categories_seconds_backups:any = [];
  // categories_thirds:any = [];
  // categories_thirds_backups:any = [];

  // dropdownList:any = [];
  // selectedItems:any = [];
  // dropdownSettings:IDropdownSettings = {};
  // word:string = '';

  // isShowMultiselect:Boolean = false;
  constructor(
    public productService: ProductService,
    public modalSS: ProductService,
  ) {

  }

  categorie_first_id: number | null = null;

  selectCategory(id: number) {
    this.categorie_first_id = id;
  }

  ngOnInit(): void {

    this.modalSS.$modal.subscribe((v)=>{this.modalSwitch = v})
    this.isLoading$ = this.productService.isLoading$;
    // this.dropdownList = [
    //   { item_id: 5, item_text: 'New Delhi' },
    //   { item_id: 6, item_text: 'Laravest' }
    // ];
    // this.selectedItems = [
    //   { item_id: 6, item_text: 'Laravest' }
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
    this.configAll();
  }


  configAll(){
    this.productService.configAll().subscribe((resp:any) => {
      console.log(resp);
      this.marcas = resp.brands;
      this.categories_first = resp.categories_first;
      // this.categories_seconds = resp.categories_seconds;
      // this.categories_thirds = resp.categories_thirds;
    })
  }

  // FUNCION PARA AÑADIR UNA NUEVA ETIQUETA
  // addItems(){
  //   this.isShowMultiselect = true;
  //   let time_date = new Date().getTime();
  //   this.dropdownList.push({ item_id: time_date, item_text: this.word });
  //   this.selectedItems.push({ item_id: time_date, item_text: this.word });
  //   setTimeout(() => {
  //     this.word = '';
  //     this.isShowMultiselect = false;
  //     this.isLoadingView();
  //   }, 100);
  // }

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
// FUNCIONES DEL DROWNP DEL SELECT MULTI
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  save(){

    if(!this.title || !this.sku  || !this.price_pes || !this.marca_id
      || !this.file_imagen||  !this.description || !this.categorie_first_id){

      console.log(this.categorie_first_id)
      console.log("Los campos con el * son obligatorio");

    }
    else{
      let formData = new FormData();
      formData.append("title",this.title);
      formData.append("sku",this.sku);
      // formData.append("price_usd",this.price_usd+"");
      formData.append("price_pes",this.price_pes+"");
      formData.append("brand_id",this.marca_id);
      formData.append("portada",this.file_imagen);
      formData.append("categorie_first_id",this.categorie_first_id+"");

      formData.append("description",this.description);
      // formData.append("multiselect",JSON.stringify(this.selectedItems));

      this.productService.createProducts(formData).subscribe((resp:any) => {
        console.log(resp);

        if(resp.message == 403){
          console.log("Validación",resp.message_text);
          // this.toastr.error("Validación",resp.message_text);
        }else{
          this.title = '';
          this.file_imagen = null;
          this.sku = '';
          // this.price_usd = 0;
          this.price_pes = 0;
          this.marca_id = '';
          //this.categorie_first_id = '';
          this.categorie_first_id = 0;
          this.description = '';
          this.description = '';
          // this.selectedItems = [];

          this.imagen_previsualiza = "https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg";
          console.log("El product se registro perfectamente");
        }


      })
    }

    }
}
