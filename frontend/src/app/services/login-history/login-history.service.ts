import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginHistoryService {
  private apiUrl = `${environment.apiUrl}/login-history`
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { 
    
  }

  getUserLoginHistory(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
