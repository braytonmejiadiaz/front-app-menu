import { Component } from '@angular/core';
import { ProfileUserService } from './service/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent {

  name:string = "";
  surname:string = "";
  email:string = "";
  phone:string = "";
  name_bussines:string = "";
  addres:string = "";
  avatar: string = "";
  fb: string = "";
  ins: string = "";
  tikTok: string = "";
  youtube: string = "";
  exported_template_url: string = ""



  constructor(public profileClient: ProfileUserService, private toast: ToastrService){
    this.profileClient.showUsers().subscribe((resp:any) =>{
      console.log(resp)
      this.name = resp.name
      this.surname = resp.surname
      this.email = resp.email
      this.phone = resp.phone
      this.name_bussines = resp.name_bussines
      this.addres = resp.addres
      this.avatar = resp.avatar
      this.fb = resp.fb
      this.ins = resp.ins
      this.tikTok = resp.tikTok
      this.youtube = resp.youtube
      this.exported_template_url = resp.exported_template_url

    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateUser();
  }
  updateUser(){
    if(!this.name || !this.email){
      console.log("es necesario tener correo crack")
      return;
    }
    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      phone: this.phone,
      name_bussines: this.name_bussines,
      addres: this.addres,
      avatar: this.avatar,
      fb: this.fb,
      ins: this.ins,
      tikTok: this.tikTok,
      youtube: this.youtube,

    }


    this.profileClient.updateProfile(data).subscribe((resp:any) =>{
      console.log(resp)
      if(resp.message ==403){
        this.toast.error("El correo ya esta en uso")
      }else{
        this.toast.success("Tu perfil se edito con éxito")
      }
      })
  }


  imagen_previsualiza:any = "https://tucartaya.com/wp-content/uploads/2024/12/upload-media.png";
  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toast.error("Validacion", "El archivo no es una imagen");
      return;
    }

    let file = $event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file); // Leer como base64
    reader.onloadend = () => {
      this.imagen_previsualiza = reader.result;  // Aquí guardamos la imagen en base64 para previsualización
      this.avatar = reader.result as string;  // Asignamos el base64 a avatar como string
    };
  }
}
