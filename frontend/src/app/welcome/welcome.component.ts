import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  user = this.storageService.getUser();
  constructor(private storageService: StorageService) {
    
  }
}
