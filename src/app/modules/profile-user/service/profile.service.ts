import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';
import { AuthService } from '../../../pages/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {   }

  updateProfile(data:any){
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/profile_client/";
    return this.http.put(URL,data,{headers: headers})
  }

  getInfoProfile(){
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/profile_client/";
    return this.http.get(URL,{headers: headers})
  }

  showUsers(){
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/profile_client/me";
    return this.http.get(URL,{headers: headers})
  }

}
