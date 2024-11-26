import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

  public productForm = new FormGroup({
    nombre:         new FormControl(''),
    categoria:      new FormControl(''),
    descripcion:    new FormControl(''),
    img:            new FormControl(''),
    precio:        new FormControl(''),

  })


}
