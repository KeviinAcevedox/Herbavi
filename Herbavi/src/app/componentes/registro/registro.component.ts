import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';
import { ResponsiveService } from 'src/app/servicios/responsive.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Variable para mostrar una imagen en caso de que se esté cargando datos de la API
  mostrarLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private responsive: ResponsiveService,
    private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

  // Variables usadas para almacenar los datos de los campos de texto
  nombre: string = '';
  primer_apellido: string = '';
  segundo_apellido: string = '';
  numero_telefono: number = 0;
  correo: string = '';
  direccion_residencia: string = '';
  numero_cuenta: number = 0;
  nombre_usuario: string = '';
  password: string = '';
  confirm_password: string = '';

  // Instancia de la clase Responsive para controlar las dimensiones de las pantallas
  responsive_flags: Responsive;

  regresar(){
    this.router.navigate(['/']);
  }

  // Método para verificar que las dos contraseñas sean iguales
  passwordsCoinciden(p1: string, p2: string){
    if (p1 == p2){
      return true;
    }
    else{
      return false;
    }
  }

  // Metodo para limpiar todos los campos de entrada
  resetear(){
    this.nombre = '';
    this.primer_apellido = '';
    this.segundo_apellido = '';
    this.direccion_residencia = '';
    this.correo = '';
    this.password = '';
    this.confirm_password = '';
    this.nombre_usuario = '';
  }

  // Metodo para tomar los datos de los input y enviarlos a la API por medio del servicio
  async registrarUsuario(){
    // Verificar si las contraseñas coinciden
    if (!this.passwordsCoinciden(this.password, this.confirm_password)){
      this.notificaciones.mostrarNotificacion(
        'Las contraseñas deben ser las mismas...', 2);
        
        this.password = '';
        this.confirm_password = '';
        return;
    }

    // Mostrar el loading desde que inicia el Fetch + 1 segundo mas
    this.mostrarLoading = true;
    let apellidos: string = this.primer_apellido.concat(' ', this.segundo_apellido);

    const response = await this.peticiones.registrarUsuario(
      this.nombre, apellidos, this.correo,
      this.direccion_residencia, this.numero_telefono.toString(),
      this.nombre_usuario, this.password);

    await this.peticiones.delay(1);
    this.mostrarLoading = false;

    // Recibir los datos del response
    let estatus = response['estatus'];
    let mensaje = response['mensaje'];

    // En caso de que la API no haya aceptado la solicitud de registrar
    if (!estatus){
      this.notificaciones.mostrarNotificacion(mensaje, 2);
      return;
    }
    
    // En caso de que no haya ningun problema
    this.resetear();
    this.notificaciones.mostrarNotificacion(mensaje, 2);
    // Volver a Login
    this.regresar();
  }
  
  ngOnInit(): void {
    // Usar el objeto responsive del servicio Responsive
    this.responsive_flags = this.responsive.responsive_flags;
  }

}
