import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private responsive: BreakpointObserver, public dialog: MatDialog) { }

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive = new Responsive();

  // Metodo para regresar a la pantalla de Login
  regresar(){
    this.router.navigate(['']);
  }

  // Método para abrir el carrito de compras
  carrito(){
    this.router.navigate(['/Herbavi-Home/Carrito']);
  }

  // Método para cargar el subcomponente de productos
  productos(){
    this.router.navigate(['/Herbavi-Home/Productos']);
  }

  ngOnInit(): void {
    // Suscribirse al Observer
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
