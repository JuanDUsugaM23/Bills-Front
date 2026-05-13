import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    // Llamamos al servicio para cerrar sesión
    if (this.authService.logout) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }
}