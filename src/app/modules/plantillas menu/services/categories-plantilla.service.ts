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

  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
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

  exportTemplate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/export-template`, data);

  }


}
