import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  email: string = '';
  password: string = '';
  code_user: string ='';

  constructor(private toastr: ToastrService,
     private authService: AuthService,
     public router: Router,
     public activedRouter: ActivatedRoute,
    ){}


  ngOnInit(): void {
  //  this.showScuccess()
  if(this.authService.token && this.authService.user){
    setTimeout(()=>{
      this.router.navigateByUrl("/")
    },500);
      return;
  }

  this.activedRouter.queryParams.subscribe((resp:any)=>{
    this.code_user = resp.code;
  });

    if(this.code_user){
      let data = {
        code_user: this.code_user
      }
      this.authService.verifiedAuth(data).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.message == 403){
      this.toastr.error("validacion", "El codigo no pertenece a  ningun usuario");
        };

        if(resp.message == 200){
          this.toastr.success("exito", "El correo se verifico");

          setTimeout(()=>{
            this.router.navigateByUrl("/login");
          },500);

        };
      })
    }

  }


  login(){
    if(!this.email || !this.password){
      this.toastr.error("validacion", "necesitas ingresar todos los campo");
      return;
    }
    this.authService.login(this.email, this.password).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.error && resp.error.error){
         this.toastr.error("validacion", 'las credenciales son incorrectas');
         return;
      }
      if(resp == true){
        this.toastr.success("exito", 'Bienvenido a la tienda');
        this.router.navigateByUrl("/usuario")
        return;
      }
    },(error) =>{
      console.log(error);
    })
    }

  showSuccess(){
  this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
