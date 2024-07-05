import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  signUp(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signup`, credentials);
  }

  signIn(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  userIsLoggedIn() {
    return this.storageService.isLoggedIn();
  }
}
