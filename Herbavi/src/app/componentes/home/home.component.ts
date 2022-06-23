import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private responsive: BreakpointObserver) { }

  showSidenav: boolean = false;

  // Metodo para regresar a la pantalla de Login
  regresar(){
    this.router.navigate(['']);
  }

  // Método para seleccionar el subcomponente carrito
  carrito(){
    this.router.navigate(['/Herbavi-Home/Carrito']);
  }

  // Método para cargar el subcomponente de productos
  productos(){
    this.router.navigate(['/Herbavi-Home/Productos']);
  }

  ngOnInit(): void {
  }

}
