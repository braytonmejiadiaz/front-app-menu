import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { URL_BACKEND, URL_SERVICIOS } from '../../../config/config';
import { AuthService } from '../../../pages/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ImportMaxProductService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient  ,public authservice: AuthService,) {}

  // Método para subir el archivo de Excel
  uploadExcel(data: FormData) {
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const URL = URL_SERVICIOS+'/admin/customer/import';
    return this.http.post(URL, data, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // Método para obtener el estado de carga
  getLoadingStatus() {
    return this.isLoadingSubject.asObservable();
  }
}
