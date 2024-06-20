import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PortalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigateToMenu();
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
