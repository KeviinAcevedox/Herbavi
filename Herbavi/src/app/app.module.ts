import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './componentes/home/home.component';
import { ProductosComponent } from './componentes/home/subcomponentes/productos/productos.component';
import { CarritoComponent } from './componentes/home/subcomponentes/carrito/carrito.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { MisProductosComponent } from './componentes/admin/subcomponentes/mis-productos/mis-productos.component';
import { AgregarProductoComponent } from './componentes/admin/subcomponentes/agregar-producto/agregar-producto.component';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { PeticionesService } from './servicios/peticiones.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ProductosComponent,
    CarritoComponent,
    AdminComponent,
    MisProductosComponent,
    AgregarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [ImagenesService, PeticionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
