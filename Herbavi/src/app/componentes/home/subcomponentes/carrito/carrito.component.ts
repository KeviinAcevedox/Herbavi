import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProductoCarrito } from 'src/app/modelos/producto-carrito';
import { Responsive } from 'src/app/modelos/responsive';

const ELEMENT_DATA: ProductoCarrito[] = [
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},
{id: '1A2', nombre:'Birra Imperial', cantidad: 23, precio: 1000},
{id: '1B2', nombre:'Bolsa de arroz - 2 kg', cantidad: 1, precio: 1300},

];

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private responsive: BreakpointObserver) { }

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive = new Responsive();

  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'subtotal', 'eliminar'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<ProductoCarrito>;

  // Variable para actualizar el total a pagar
  total: number = 0;

  addData() {
    this.dataSource.push(ELEMENT_DATA[0]);
    this.table.renderRows();
  }

  removeData(producto: ProductoCarrito) {
    this.dataSource.forEach( (item, index) => {
      if(item === producto){
        if (index == -1){
          this.dataSource.pop();
        }
        else{
          this.dataSource.splice(index,1);
        }
        this.actualizarTotal();
        this.table.renderRows();
      }
    });
    
  }
  
  actualizarTotal(){
    this.total = 0;
    for (let p of this.dataSource){
      this.total += p.precio * p.cantidad;
    }
  }

  ngOnInit(): void {
    // Actualizar el carrito de compras
    this.total = 0;
    for (let p of this.dataSource){
      this.total += p.precio * p.cantidad;
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
