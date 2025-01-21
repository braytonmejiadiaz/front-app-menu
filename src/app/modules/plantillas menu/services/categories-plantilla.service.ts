import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';
import { AuthService } from '../../../pages/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServicePlantilla {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  private exportedUrlSubject = new BehaviorSubject<string>('');
  private modalSwitchSubject = new BehaviorSubject<boolean>(false);

  exportedUrl$ = this.exportedUrlSubject.asObservable();
  modalSwitch$ = this.modalSwitchSubject.asObservable();

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  private urlSource = new BehaviorSubject<string>(''); // Almacena la URL generada
  url$ = this.urlSource.asObservable(); // Observable para suscribirse

  emitUrl(url: string) {
    this.urlSource.next(url); // Emitir la nueva URL
  }

  listProductsMenu(){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/categories-with-products";
    return this.http.get(URL,{ headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

    // Método para exportar la plantilla, ahora con el token en los encabezados
    exportTemplate(data: any) {
      const token = sessionStorage.getItem('token');
      let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      let URL = URL_SERVICIOS + "/admin/export-template";
      return this.http.post(URL, data, { headers: headers });
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

    setExportedUrl(url: string) {
      this.exportedUrlSubject.next(url);
    }

    openModal() {
      this.modalSwitchSubject.next(true);
    }

    closeModal() {
      this.modalSwitchSubject.next(false);
    }

}
