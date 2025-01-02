import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  isDropdownOpen = false;

  // Método para alternar la visibilidad del menú
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  isMenuOpen = false; // Por defecto cerrado
  isDropdownOpenn = false; // Por defecto cerrado

  ngOnInit() {
    this.updateMenuState(); // Actualiza el estado al cargar
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMenuState(); // Actualiza el estado al cambiar el tamaño
  }

  updateMenuState() {
    // Si es desktop, muestra el menú; si es mobile, ciérralo
    this.isMenuOpen = this.isDesktop();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdownn() {
    this.isDropdownOpenn = !this.isDropdownOpenn;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }
}
