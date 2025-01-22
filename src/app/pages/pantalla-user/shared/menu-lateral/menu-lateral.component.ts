import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileUserService } from '../../../../modules/profile-user/service/profile.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  // trae la data del user

  name_bussines:string = "";
  avatar: string = "";

  constructor(public profileClient: ProfileUserService){
    this.profileClient.showUsers().subscribe((resp:any) =>{
    this.name_bussines = resp.name_bussines
      this.avatar = resp.avatar
    })
  }

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
    if (!this.isDesktop()) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  toggleDropdownn() {
    this.isDropdownOpenn = !this.isDropdownOpenn;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

  closeMenuOnMobile() {
    if (!this.isDesktop()) {
      this.isMenuOpen = false;
    }
  }


}
