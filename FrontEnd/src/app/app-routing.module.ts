import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {LoginComponent} from'./login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './AdminAuthGuard';
import {DjLoginComponent} from './dj-login/dj-login.component';
import { DjComponentComponent } from './dj-component/dj-component.component';
import { DjAuthGuard } from './DjAuthGuard';
import {ProvaAdioComponent} from './prova-adio/prova-adio.component'; //DA CANCELLARE!!!

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'LoginAdmin',component: AdminLoginComponent},
  {path: 'LoginUtente',component: LoginComponent},
  {path: 'LoginDj', component: DjLoginComponent},
  {path: 'Admin',component: AdminComponent, canActivate:[AdminAuthGuard]},
  {path: 'DJ',component: DjComponentComponent,canActivate:[DjAuthGuard]}
  ,{path: 'Ute',component: ProvaAdioComponent} //DA CANCELLARE!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ComponenteRouting=[AdminLoginComponent,LoginComponent,DjLoginComponent];
