import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';
import { ResponsiveService } from 'src/app/servicios/responsive.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private peticiones: PeticionesService,
    private notificaciones: NotificacionesService,
    private responsive: ResponsiveService ) { }

  // Estas variables se usan para almacenar los campos de texto del Login
  nombre_usuario: string  = '';
  contrasena: string = '';

  // Variable para mostrar una imagen en caso de que se esté cargando datos de la API
  mostrarLoading: boolean = false;

  // Variables para identificar las dimensiones de los dispositivos
  responsive_flags: Responsive;

  // Metodo para validar el Login
  async login(){
    this.mostrarLoading = true;
    const response = await this.peticiones.verificarLogin(this.nombre_usuario, this.contrasena);
    await this.peticiones.delay(0.2);
    this.mostrarLoading = false;

    let estatus = response['estatus'];
    let mensaje = response['mensaje'];

    this.notificaciones.mostrarNotificacion(mensaje, 2);
    if (!estatus){
      this.resetear();
      return;
    }

    // Si no hay ningun problema
    this.resetear();

    // Guardar una lista vacía de los productos del carrito en LocalStorage
    localStorage.setItem('productos_carrito', JSON.stringify([]));
    
    let ruta = response['ruta']
    this.router.navigate([ruta, 'Todas', 1]);
  }

  // Metodo para resetear las variables de entrada
  resetear(){
    this.nombre_usuario = '';
    this.contrasena = '';
  }

  // Metodo para dirigirse al componente de Registro
  registrarse(){
    this.router.navigate(['/Herbavi-Registro']);
  }
  ngOnInit(): void {
    // Usar el objeto responsive del servicio Responsive
    this.responsive_flags = this.responsive.responsive_flags;
  }


}
