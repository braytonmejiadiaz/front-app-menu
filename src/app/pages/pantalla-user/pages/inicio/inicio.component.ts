import { Component } from '@angular/core';

import { MenuLateralComponent } from '../../shared/menu-lateral/menu-lateral.component';
import { MenuComponent_user } from '../../shared/menu/menu.component';
import { AppComponent } from "../../../../app.component";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MenuComponent_user, MenuLateralComponent, AppComponent,RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
