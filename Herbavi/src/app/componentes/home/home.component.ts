import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsive } from 'src/app/modelos/responsive';
import {MatDialog} from '@angular/material/dialog';
import { ResponsiveService } from 'src/app/servicios/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private responsive: ResponsiveService,
    public dialog: MatDialog) { }

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive;

  // Metodo para regresar a la pantalla de Login
  regresar(){
    // Limpiar el LocalStorage
    localStorage.clear();
    this.router.navigate(['']);
  }

  // Método para abrir el carrito de compras
  carrito(){
    this.router.navigate(['/Herbavi-Home/Carrito']);
  }

  // Método para cargar el subcomponente de productos
  productos(){
    this.router.navigate(['/Herbavi-Home/Productos',
  'Todas', 1]);
  }

  ngOnInit(): void {
    // Usar el objeto responsive del servicio Responsive
    this.responsive_flags = this.responsive.responsive_flags;  
  }

}
