import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../../models/auth-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Verifica si existe un token en el localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Llamada HTTP real al backend
  login(email: string, password: string): Observable<boolean> {
    console.log(environment.apiUrl);
    return this.http.post<AuthResponse>(`${environment.apiUrl}/Auth/Login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.result) {
          localStorage.setItem('token', response.result.accesToken);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      map(response => response.success), // Si la petición es exitosa, devolvemos el estado success de la API
      catchError(() => of(false)) // Si falla (ej. 401 Unauthorized), devolvemos false
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
