import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/modelos/producto';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Responsive } from 'src/app/modelos/responsive';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private responsive: BreakpointObserver) { }

  // Variables para controlar los productos por páginas
  totalProducts: number = 100;
  productsPerPage: number = 20;

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive = new Responsive();

  // Otras variables usadas para activar acciones responsive
  carta_web: boolean = false;
  carta_tablet: boolean = false;
  carta_smartphone: boolean = false;
  
  // Lista que contiene los productos a mostrar en la pantalla
  listaProductos: Producto[] = [];

  // Variable para la selección de categoría
  categoria: any;

  openDialog(nombre: string, descripcion: string) {
    this.dialog.open(InfoDialog, {
      data: {
        nombre_producto: nombre,
        descripcion_producto: descripcion
      }
    });
  }

  // Este metodo se ejecuta cuando se presiona el boton de cambiar página
  onChangedPage(pageData: PageEvent) {
    console.log(pageData.pageIndex);
  }

  // Evento para cuando se selecciona un nuevo radio button
  actualizarCategoria(nueva_categoria: string) {
    if (nueva_categoria != this.categoria){
      this.categoria = nueva_categoria;
      console.log(nueva_categoria);
    }
}

  ngOnInit(): void {
    for (let i = 0; i < 12; i++){
      const producto: Producto = {id : 'ACD', nombre: 'Bud Light', precio: 2000, 
    imagen: '', descripcion: "La mejor", cantidad: 40, estado:"disponible", categoria: "Bebidas" }
      this.listaProductos.push(producto);
    }
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

      // Resetear las banderas de las cartas
      this.carta_tablet = false;
      this.carta_web = false;
      this.carta_smartphone = false;

      if (breakpoints[Breakpoints.HandsetPortrait]){
        this.responsive_flags.smartphone_portrait = true;
        this.carta_smartphone = true;
      }

      else if (breakpoints[Breakpoints.TabletPortrait]){
        this.responsive_flags.tablet_portrait = true;
        this.carta_tablet = true;
      }

      else if (breakpoints[Breakpoints.HandsetLandscape]){
        this.responsive_flags.smartphone_landscape = true;
        this.carta_tablet = true;
      }

      else if (breakpoints[Breakpoints.TabletLandscape]){
        this.responsive_flags.tablet_landscape = true;
        this.carta_web = true;
      }

      else if (breakpoints[Breakpoints.WebLandscape]){
        this.responsive_flags.web_landscape = true;
        this.carta_web = true;
      }
    });
  
  }

}
@Component({
  selector: 'info-dialog',
  templateUrl: 'carta.info.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
