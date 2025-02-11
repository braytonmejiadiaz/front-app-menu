import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileUserService } from '../../profile-user/service/profile.service';
import { CategoriesServicePlantilla } from '../services/categories-plantilla.service';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { ModalUrlPlantillaComponent } from '../modal-url-plantilla/modal-url-plantilla.component';

@Component({
  selector: 'app-plantilla-menu-6',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalUrlPlantillaComponent],
  templateUrl: './plantilla-menu-6.component.html',
  styleUrl: './plantilla-menu-6.component.css'
})
export class PlantillaMenu6Component {
  avatar: string = "";
  fb: string = "";
  ins: string = "";
  tikTok: string = "";
  addres: string = "";
  name_bussines: string = "";
  phone: string = "";
  groupedCategories: any[] = [];
  exportedUrl: string = '';
  qrData: string = '';
  public isMobileMode: boolean = false;

  constructor(
    private router: Router,
    public productService: CategoriesServicePlantilla,
    private toastr: ToastrService,
    public profileUser: ProfileUserService,
    private modalS: CategoriesServicePlantilla
  ) {
    this.profileUser.showUsers().subscribe((resp: any) => {
      this.avatar = resp.avatar;
      this.fb = resp.fb;
      this.ins = resp.ins;
      this.tikTok = resp.tikTok;
      this.addres = resp.addres;
      this.name_bussines = resp.name_bussines;
      this.phone = resp.phone;
    });
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

  // Método para obtener las categorías con productos
  listProduct() {
    this.productService.listProductsMenu().subscribe({
      next: (resp: any) => {
        if (resp && Array.isArray(resp.groupedCategories)) {
          // Asigna las categorías ordenadas
          this.groupedCategories = resp.groupedCategories.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
        }
      },
      error: (err) => {
        this.toastr.error('Error al obtener productos');
      }
    });
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
          this.modalS.setExportedUrl(response.url);
          this.modalS.openModal();
          this.toastr.success('Tu plantilla se guardó correctamente');
        }
      },
      error: (error) => {
        this.toastr.error('Error al exportar la plantilla, contacta con soporte');
      }
    });
  }
}
