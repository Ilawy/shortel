import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  me = signal(null);
  loading = signal(true);
  constructor(private http: HttpClient) {
    this.refresh();
  }

  private refresh() {
    this.loading.set(true);
    this.http
      .get('/api/auth/me')
      .pipe(catchError(() => of(null)))
      .subscribe((result) => {
        this.me.set(result as any);
        this.loading.set(false);
      });
  }

  login(payload: LoginInterface) {
    return this.http
      .post('/api/auth/login', payload)
      .pipe(tap(() => this.refresh()));
  }
}
