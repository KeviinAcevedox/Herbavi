import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

// Se exportan las rutas de todos los componentes existentes
const routes: Routes = [
  {
    path: '', redirectTo: 'Herbavi-Login',
     pathMatch: 'full'
  },
  {
    path: 'Herbavi-Login',
    component: LoginComponent
  },
  {
    path:'Herbavi-Registro',
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
