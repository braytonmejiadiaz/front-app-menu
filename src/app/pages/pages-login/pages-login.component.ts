import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pages-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,],
  templateUrl: './pages-login.component.html',
  styleUrl: './pages-login.component.css',

})
export  class PagesLoginComponent {


  name:string = "";
  surname:string = "";
  name_bussines:string = "";
  email: string = "";
  password: string = "";
  phone: string = "";

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService ){

  }


  register(){
    if( !this.name ||
      !this.surname ||
      !this.name_bussines ||
      !this.email ||
      !this.password ||
      !this.phone){
        this.toastr.error("Necesitas ingresar todos los campos para poder registrate");
      return;
    }
    let data = {
        name  : this.name,
        surname  : this.surname,
        name_bussines  : this.name_bussines,
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

}
