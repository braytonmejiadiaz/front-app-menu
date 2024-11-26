import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-menu-1',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './plantilla-menu-1.component.html',
  styleUrl: './plantilla-menu-1.component.css'
})
export class PlantillaMenu1Component {

  constructor( private router:Router){}

  navigateBack(){
    this.router.navigate(['/usuario/lista-plantillas'])
  }

public isMobileMode:boolean = false;

  toggleMode() {
    this.isMobileMode = true;
  }
  togleDesktop(){
    this.isMobileMode = false;
  }
}
