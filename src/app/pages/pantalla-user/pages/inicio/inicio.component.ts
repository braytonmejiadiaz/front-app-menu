import { Component, HostListener } from '@angular/core';

import { MenuLateralComponent } from '../../shared/menu-lateral/menu-lateral.component';
import { MenuComponent_user } from '../../shared/menu/menu.component';
import { AppComponent } from "../../../../app.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ MenuLateralComponent,RouterOutlet, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  isMenuOpen = false;

  // Detectar si es un dispositivo de escritorio
  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Actualizar estado del menú cuando se redimensiona la ventana
  @HostListener('window:resize', [])
  onResize() {
    if (this.isDesktop()) {
      this.isMenuOpen = false; // Asegurar que el menú lateral no interfiere en desktop
    }
  }
}
