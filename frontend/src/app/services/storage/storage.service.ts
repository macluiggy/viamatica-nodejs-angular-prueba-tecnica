import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }

  /**
   * Only save user when user is logged in, if you want to update user data, use updateUser
   * @param user
   */
  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      // save user preferred language
      this.savePreferredLanguage(user.preferredLanguage);
    }
  }

  public updateUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const oldUser = sessionStorage.getItem(USER_KEY);
      if (oldUser) {
        const newUser = { ...JSON.parse(oldUser), ...user };
        sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));
      }

      // save user preferred language
      this.savePreferredLanguage(user.preferredLanguage);
    }
  }

  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return {};
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }
    }

    return false;
  }

  public setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }

    return '';
  }

  public savePreferredLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId) && language) {
      localStorage.setItem('language', language);
    }
  }

  public getPreferredLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('language') || '';
    }

    return '';
  }
}
