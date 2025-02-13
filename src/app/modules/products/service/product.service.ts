import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';
import { AuthService } from '../../../pages/services/auth.service';
import { CategoriesServicePlantilla } from '../../plantillas menu/services/categories-plantilla.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  groupedCategories: any[] = [];
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
    public productService: CategoriesServicePlantilla,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listProducts(page:number = 1,data:any){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/index?page="+page;
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listLandingMenu(data:any){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/index";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  configAll() {
    this.productService.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS + "/admin/products/config";  // Asegúrate de que la API devuelve solo categorías del usuario autenticado

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.productService.isLoadingSubject.next(false))
    );
  }


  createProducts(data:any){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showProduct(product_id:string){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/"+product_id;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateProducts(product_id:string,data:any){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/"+product_id;
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteProduct(product_id:string){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/"+product_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  imagenAdd(data:any){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/imagens";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteImageProduct(imagen_id:string){
    this.isLoadingSubject.next(true);
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    let URL = URL_SERVICIOS+"/admin/products/imagens/"+imagen_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  $modal = new EventEmitter<any>();
  $modalProductCreate = new EventEmitter<any>();


}
