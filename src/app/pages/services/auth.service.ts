import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({ providedIn: 'root' })
export class AuthService {

  token: string = '';
  user: any;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.initAuth();
  }


  initAuth() {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");

    if (token) {
      this.token = token;
      try {
        this.user = userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error("Error al analizar JSON del usuario:", error);
        this.user = null;
      }
    }
  }


  login(email: string, password: string) {
    let URL = URL_SERVICIOS + "/auth/login";
    return this.http.post(URL, { email, password }).pipe(
      map((resp: any) => {
        console.log(resp);
        const result = this.saveSessionStorage(resp);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    );
  }

  saveSessionStorage(resp: any) {

    if (resp && resp.access_token) {
      sessionStorage.setItem("token", resp.access_token);
      sessionStorage.setItem("user", JSON.stringify(resp.user));
      return true;
    }
    return false;
  }

  register(data: any) {
    let URL = URL_SERVICIOS + "/auth/register";
    return this.http.post(URL, data);
  }

  verifiedAuth(data: any) {
    let URL = URL_SERVICIOS + "/auth/verified_auth";
    return this.http.post(URL, data);
  }

  verifiedMail(data: any) {
    let URL = URL_SERVICIOS + "/auth/verified_email";
    return this.http.post(URL, data);
  }

  verifiedCode(data: any) {
    let URL = URL_SERVICIOS + "/auth/verified_code";
    return this.http.post(URL, data);
  }

  verifiedNewPassword(data: any) {
    let URL = URL_SERVICIOS + "/auth/verified_password";
    return this.http.post(URL, data);
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.user = null;
    this.token = '';

    setTimeout(() => {

      this.router.navigateByUrl("/login");

    }, 500);
  }
}