import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule]  // Asegúrate de importar RouterModule aquí
})
export class AppComponent {
  title = 'BACKEND_SISVITA';
  isLoggedIn = false;

  constructor() {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    }
  }
}


