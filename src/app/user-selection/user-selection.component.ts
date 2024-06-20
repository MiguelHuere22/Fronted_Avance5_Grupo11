import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class UserSelectionComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
