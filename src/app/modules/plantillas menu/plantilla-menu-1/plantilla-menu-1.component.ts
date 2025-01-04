import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../products/service/product.service';
import { CategoriesServicePlantilla } from '../services/categories-plantilla.service';

@Component({
  selector: 'app-plantilla-menu-1',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './plantilla-menu-1.component.html',
  styleUrls: ['./plantilla-menu-1.component.css'],
})
export class PlantillaMenu1Component implements OnInit {
  groupedCategories: any[] = []; // Almacenará las categorías agrupadas

  public isMobileMode: boolean = false;

  constructor(
    private router: Router,
    public productService: ProductService,

  ) {}

  ngOnInit(): void {
    this.listProduct();
    this.checkMobileMode(); // Verifica si estamos en modo móvil al inicio
  }

  // Método para obtener los productos y agruparlos por categorías
  listProduct() {
    const data = {};  // Puedes agregar los parámetros necesarios aquí
    this.productService.listLandingMenu(data).subscribe({
      next: (resp: any) => {
        const products = resp.products.data || [];
        this.groupedCategories = this.groupProductsByCategory(products);
      },
    });
  }

  // Agrupa los productos por categoría
  private groupProductsByCategory(products: any[]): any[] {
    const categoryMap = new Map();

    products.forEach((product) => {
      const categoryName = product.category?.name || 'Sin categoría'; // Maneja el caso de categorías sin nombre
      console.log('Category Name:', categoryName);
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          name: categoryName,
          products: [],
        });
      }
      categoryMap.get(categoryName).products.push(product);
    });
    console.log('Grouped Categories:', Array.from(categoryMap.values()));  // Verifica el resultado final

    return Array.from(categoryMap.values());
  }

  // Función para manejar la navegación hacia atrás
  navigateBack() {
    this.router.navigate(['/usuario/lista-plantillas']);
  }

  // Cambia a modo móvil
  toggleMode() {
    this.isMobileMode = true;
  }

  // Cambia a modo escritorio
  toggleDesktop() {
    this.isMobileMode = false;
  }

  // Detecta el tamaño de la pantalla y ajusta el modo
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileMode();
  }

  // Verifica si estamos en modo móvil basándonos en el ancho de la ventana
  checkMobileMode() {
    this.isMobileMode = window.innerWidth <= 768;  // Puedes ajustar el valor según tus necesidades
  }
}
