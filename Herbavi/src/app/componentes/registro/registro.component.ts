import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private responsive: BreakpointObserver) { }

  // Variables usadas para almacenar los datos de los campos de texto
  nombre: string = '';

  apellidos: string = '';

  numero_telefono: number = 0;

  correo: string = '';

  direccion_residencia: string = '';

  numero_cuenta: number = 0;

  nombre_usuario: string = '';

  // Instancia de la clase Responsive para controlar las dimensiones de las pantallas
  responsive_flags: Responsive = new Responsive();

  regresar(){
    this.router.navigate(['/']);
  }
  
  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.WebLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape
    ])
    .subscribe( result => {
      
      // Guardar el resultado encontrado
      const breakpoints = result.breakpoints;

      // Resetear los flags
      this.responsive_flags.web_landscape = false;
      this.responsive_flags.tablet_portrait = false;
      this.responsive_flags.tablet_landscape = false;
      this.responsive_flags.smartphone_portrait = false;
      this.responsive_flags.smartphone_landscape = false;

      if (breakpoints[Breakpoints.HandsetPortrait]){
        this.responsive_flags.smartphone_portrait = true;
      }

      else if (breakpoints[Breakpoints.TabletPortrait]){
        this.responsive_flags.tablet_portrait = true;
      }

      else if (breakpoints[Breakpoints.HandsetLandscape]){
        this.responsive_flags.smartphone_landscape = true;
      }

      else if (breakpoints[Breakpoints.TabletLandscape]){
        this.responsive_flags.tablet_landscape = true;
      }

      else if (breakpoints[Breakpoints.WebLandscape]){
        this.responsive_flags.web_landscape = true;
      }
    });
  }

}
