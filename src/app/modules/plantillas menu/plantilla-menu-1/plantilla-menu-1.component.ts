import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../products/service/product.service';
import { CategoriesServicePlantilla } from '../services/categories-plantilla.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUserService } from '../../profile-user/service/profile.service';
import { ModalUrlPlantillaComponent } from "../modal-url-plantilla/modal-url-plantilla.component";
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-plantilla-menu-1',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalUrlPlantillaComponent, QRCodeModule],
  templateUrl: './plantilla-menu-1.component.html',
  styleUrls: ['./plantilla-menu-1.component.css'],
})
export class PlantillaMenu1Component implements OnInit {
  avatar: string = "";
  fb: string = "";
  ins: string = "";
  tikTok: string = "";
  addres:string = "";
  name_bussines:string = "";
  phone:string = "";
  groupedCategories: any[] = [];
  exportedUrl: string = ''; // URL generada para la plantilla
  qrData: string = ''; // Datos del QR (en este caso, la URL generada)
  public isMobileMode: boolean = false;

  constructor(
    private router: Router,
    public productService: CategoriesServicePlantilla,
    private toastr: ToastrService,
    public profileUser: ProfileUserService,
    private modalS: CategoriesServicePlantilla
  ) {
    this.profileUser.showUsers().subscribe((resp:any) =>{
      this.avatar = resp.avatar
      this.fb = resp.fb
      this.ins = resp.ins
      this.tikTok = resp.tikTok
      this.addres = resp.addres
      this.name_bussines = resp.name_bussines
      this.phone = resp.phone
    })
  }

  ngOnInit(): void {
    this.listProduct(); // Llama al método para obtener productos
    this.checkMobileMode(); // Modo móvil al inicio
  }

  scrollToCategory(categoryName: string) {
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Método para obtener los productos y agruparlos por categorías
  listProduct() {
    this.productService.listProductsMenu().subscribe({
      next: (resp: any) => {
        console.log("Respuesta del servicio:", resp);

        // Accede a groupedCategories que es un arreglo dentro de la respuesta
        if (resp && Array.isArray(resp.groupedCategories)) {
          // Agrupa los productos por categoría
          this.groupedCategories = this.groupProductsByCategory(resp.groupedCategories);
          console.log("Categorías agrupadas:", this.groupedCategories);
        } else {
          console.error('La respuesta no contiene un arreglo válido en groupedCategories:', resp);
        }
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  // Agrupa los productos por categoría
  groupProductsByCategory(categoriesWithProducts: any[]): any[] {
    console.log('Antes de agrupar:', categoriesWithProducts);
    const categoryMap = new Map<string, { name: string, products: any[] }>();

    categoriesWithProducts.forEach((categoryData) => {
      if (categoryData && categoryData.name && Array.isArray(categoryData.products)) {
        const categoryName = categoryData.name;

        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            name: categoryName,
            products: categoryData.products
          });
        }
      } else {
        console.warn('Datos no válidos:', categoryData);
      }
    });

    return Array.from(categoryMap.values());
  }

  // Función para manejar la navegación hacia atrás
  navigateBack() {
    this.router.navigate(['/usuario/lista-plantillas']);
  }



  // Detecta el tamaño de la pantalla y ajusta el modo
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileMode();
  }

  // Verifica si estamos en modo móvil basándonos en el ancho de la ventana
  checkMobileMode() {
    this.isMobileMode = window.innerWidth <= 768; // Puedes ajustar el valor según tus necesidades
  }

  // Método para exportar la plantilla solo cuando se hace clic en el botón
  exportTemplate(templateName: string) {
    const data = {
      templateName: templateName,
      categories: this.groupedCategories,
      isMobileMode: this.isMobileMode,
    };

    this.productService.exportTemplate(data).subscribe({
      next: (response: any) => {
        if (response && response.url) {
          this.exportedUrl = response.url;
          this.qrData = this.exportedUrl;
          // Aquí estamos pasando la URL generada al modal
          this.modalS.setExportedUrl(response.url); // Método que definimos para emitir la URL
          this.modalS.openModal(); // Abrimos el modal automáticamente
          this.toastr.success('Tu plantilla se guardó correctamente');
        } else {
          console.error('No se pudo generar la URL');
        }
      },
      error: (error) => {
        console.error('Error al exportar la plantilla:', error);
      }
    });
  }
}
