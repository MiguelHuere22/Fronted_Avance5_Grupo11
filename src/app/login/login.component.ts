import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  onLogin(): void {
    this.authService.loginPaciente(this.username, this.password).subscribe(response => {
      if (response.status_code === 200) {
        const userData = response.data;
        const personaData = response.data.persona;

        this.localStorageService.setItem('authToken', 'true');
        this.localStorageService.setItem('userData', JSON.stringify(userData));
        this.localStorageService.setItem('personaData', JSON.stringify(personaData));

        Swal.fire({
          icon: 'success',
          title: 'Usuario encontrado',
          text: '¡Inicio de sesión exitoso!'
        }).then(() => {
          this.router.navigate(['/menu-estudiante']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Username o contraseña incorrectos'
        });
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Username o contraseña incorrectos'
      });
    });
  }
}
