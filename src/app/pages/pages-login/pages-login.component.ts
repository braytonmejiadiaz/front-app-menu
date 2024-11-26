import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pages-login',
  standalone: true,
  imports: [ReactiveFormsModule, MenuComponent, FormsModule, ToastrModule, ],
  templateUrl: './pages-login.component.html',
  styleUrl: './pages-login.component.css'
})
export default class PagesLoginComponent {


  name:string = "";
  surname:string = "";
  email: string = "";
  password: string = "";
  phone: string = "";

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService ){

  }


  register(){
    if( !this.name ||
      !this.surname ||
      !this.email ||
      !this.password ||
      !this.phone){
        this.toastr.error("validacion","necesitas ingresar todos los campos");
      return;
    }
    let data = {
        name  : this.name,
        surname  : this.surname,
        email  : this.email,
        password   : this.password,
        phone   : this.phone,
    }
      this.authService.register(data).subscribe((resp:any) =>{
        console.log(resp);
        this.toastr.success("exito","Ingresa a tu correo para completar tu registro");
        setTimeout(() =>{
          this.router.navigateByUrl("/login")
        }, 100)
      })
  }




  // public userForm = new FormGroup({
  //   nombre:        new FormControl(''),
  //   telefono:      new FormControl(''),
  //   correo:        new FormControl(''),
  // })




  // aqui va le carourel

  public images = [
    'https://img.freepik.com/vector-gratis/vector-diseno-logotipo-tienda-bicicletas_53876-40626.jpg',
    'https://img.freepik.com/vector-gratis/plantilla-logotipo-barbacoa-creativa_23-2149017951.jpg',
    'https://img.freepik.com/vector-gratis/vector-diseno-logotipo-tienda-bicicletas_53876-40626.jpg',
  ];
  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

}
