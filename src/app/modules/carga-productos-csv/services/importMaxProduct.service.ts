import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { URL_BACKEND, URL_SERVICIOS } from '../../../config/config';
import { AuthService } from '../../../pages/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImportMaxProductService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, public authservice: AuthService) {}

  // Método para subir el archivo de Excel (con validación para CSV)
  uploadExcel(data: FormData): Observable<any> {
    const file = data.get('import_file') as File;

    // Verificar si el archivo es CSV antes de enviarlo al backend
    if (!file || file.type !== 'text/csv') {
      return new Observable(observer => {
        observer.error({ error: 'Solo se permiten archivos CSV.' });
        observer.complete();
      });
    }

    this.isLoadingSubject.next(true);
    this.progressSubject.next(0); // Reiniciar el progreso

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const URL = URL_SERVICIOS + '/admin/customer/import';

    return this.http.post(URL, data, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round((100 * event.loaded) / (event.total || 1));
          this.progressSubject.next(progress); // Actualizar el progreso
        }
        return event;
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
        this.progressSubject.next(0); // Reiniciar el progreso al finalizar
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        return new Observable(observer => {
          observer.error(error);
          observer.complete();
        });
      })
    );
  }

  // Método para obtener el estado de carga
  getLoadingStatus(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  // Método para obtener el progreso de la carga
  getProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }
}
