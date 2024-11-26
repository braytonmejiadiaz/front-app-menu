import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { URL_SERVICIOS } from '../../../../../config/config';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class CategoriesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listCategories(page:number = 1,search:string){
    this.isLoadingSubject.next(true);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    let URL = URL_SERVICIOS+"/admin/categories?page="+page+"&search="+search;
    return this.http.get(URL,{ headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  configCategories(){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/admin/categories/config";
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createCategories(data: any) {
    this.isLoadingSubject.next(true);
    // Obtén el token desde el almacenamiento local (asegúrate de que esté guardado correctamente)
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    let URL = URL_SERVICIOS + "/admin/categories";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showCategorie(categorie_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/admin/categories/"+categorie_id;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateCategories(categorie_id:string,data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/admin/categories/"+categorie_id;
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteCategorie(categorie_id:string){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/admin/categories/"+categorie_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


}
