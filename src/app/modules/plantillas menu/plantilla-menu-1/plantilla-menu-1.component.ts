import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../products/service/product.service';

@Component({
  selector: 'app-plantilla-menu-1',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './plantilla-menu-1.component.html',
  styleUrl: './plantilla-menu-1.component.css'
})
export class PlantillaMenu1Component {

  products: any = [];

  constructor( private router:Router, public productService: ProductService ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listProduct();
  }

  listProduct(){
    const data = {}
    this.productService.listLandingMenu(data).subscribe({
      next: (resp:any) =>{
        this.products = resp.products.data || [];
      }
    })




  }






navigateBack(){
    this.router.navigate(['/usuario/lista-plantillas'])
  }

public isMobileMode:boolean = false;

  toggleMode() {
    this.isMobileMode = true;
  }
  toggleDesktop(){
    this.isMobileMode = false;
  }
}
