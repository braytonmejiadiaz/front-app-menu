import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../../../pages/services/auth.service';
import { URL_SERVICIOS } from '../../../config/config';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ImportMaxProductService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);  // Aquí se maneja el estado de carga

  constructor(private http: HttpClient, public authservice: AuthService,) { }

  // Método para obtener el estado de carga
  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  // Método para importar productos
  importProducts(file: File): Observable<any> {
    this.isLoadingSubject.next(true); // Inicia la carga

    const formData = new FormData();
    formData.append('file', file);
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS + "/admin/product/import";

    return this.http.post<any>(URL, formData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)), // Finaliza la carga
      catchError((error) => {
        this.isLoadingSubject.next(false); // En caso de error, también se detiene la carga
        throw error;  // Propaga el error
      })
    );
  }

}
