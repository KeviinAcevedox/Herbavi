import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private responsive: BreakpointObserver) { }

  // Estas variables se usan para almacenar los campos de texto del Login
  nombre_usuario: string  = '';
  contrasena: string = '';

  // Variables para identificar las dimensiones de los dispositivos
  responsive_flags: Responsive = new Responsive();

  // Metodo para validar el Login
  login(){
    console.log(this.nombre_usuario);
    console.log(this.contrasena);
    this.router.navigate(['/Herbavi-Home/Productos']);
  }

  // Metodo para dirigirse al componente de Registro
  registrarse(){
    this.router.navigate(['/Herbavi-Registro']);
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
        console.log('Matches');
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
