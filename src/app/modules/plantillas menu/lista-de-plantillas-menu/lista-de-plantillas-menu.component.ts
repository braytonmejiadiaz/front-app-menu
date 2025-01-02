import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-de-plantillas-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './lista-de-plantillas-menu.component.html',
  styleUrl: './lista-de-plantillas-menu.component.css'
})
export class ListaDePlantillasMenuComponent {

  constructor( public router:Router){}



}
