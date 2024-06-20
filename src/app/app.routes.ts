import { Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { MenuComponent } from './menu/menu.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { LoginComponent } from './login/login.component';
import { LoginEspecialistaComponent } from './login-especialista/login-especialista.component';
import { MenuEstudianteComponent } from './menu-estudiante/menu-estudiante.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';


export const routes: Routes = [
  { path: '', component: PortalComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'user-selection', component: UserSelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu-estudiante', component: MenuEstudianteComponent },
  { path: 'login-especialista', component: LoginEspecialistaComponent },
  { path: 'menu-especialista', component: MenuEspecialistaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
