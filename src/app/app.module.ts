import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { MenuComponent } from './menu/menu.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { LoginComponent } from './login/login.component';
import { LoginEspecialistaComponent } from './login-especialista/login-especialista.component';
import { MenuEstudianteComponent } from './menu-estudiante/menu-estudiante.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';
import { LocalStorageService } from './service/local-storage.service';
import { PreguntasService } from './service/preguntas.service';

const routes: Routes = [
  { path: '', component: PortalComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'user-selection', component: UserSelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu-estudiante', component: MenuEstudianteComponent },
  { path: 'login-especialista', component: LoginEspecialistaComponent  },
  { path: 'menu-especialista', component: MenuEspecialistaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    MenuComponent,
    UserSelectionComponent,
    LoginComponent,
    MenuEstudianteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [LocalStorageService, PreguntasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
