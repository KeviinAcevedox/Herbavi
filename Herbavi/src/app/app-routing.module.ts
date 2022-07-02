import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { AgregarProductoComponent } from './componentes/admin/subcomponentes/agregar-producto/agregar-producto.component';
import { MisProductosComponent } from './componentes/admin/subcomponentes/mis-productos/mis-productos.component';
import { HomeComponent } from './componentes/home/home.component';
import { CarritoComponent } from './componentes/home/subcomponentes/carrito/carrito.component';
import { ProductosComponent } from './componentes/home/subcomponentes/productos/productos.component';
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
  },
  {
    path:'Herbavi-Admin',
    component: AdminComponent,
    children: [
      {
        path:'Productos/:categoria/:pagina',
        component: MisProductosComponent
      },
      {
        path: 'NuevoProducto',
        component: AgregarProductoComponent
      }
    ]
  },
  {
    path: 'Herbavi-Home',
    component: HomeComponent,
    children: [
      {
        path: 'Productos/:categoria/:pagina',
        component: ProductosComponent
      },
      {
        path: 'Carrito',
        component: CarritoComponent
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
