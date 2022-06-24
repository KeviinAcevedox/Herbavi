import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProductoCarrito } from 'src/app/modelos/producto-carrito';

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

];

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'subtotal', 'eliminar'];
  dataSource = [...ELEMENT_DATA];

  // Variable para actualizar el total a pagar
  total: number = 0;

  @ViewChild(MatTable) table: MatTable<ProductoCarrito>;

  addData() {
    this.dataSource.push(ELEMENT_DATA[0]);
    this.table.renderRows();
  }

  removeData(producto: ProductoCarrito) {
    this.dataSource.forEach( (item, index) => {
      if(item === producto) this.dataSource.splice(index,1);
    });
    this.table.renderRows();
  }
  
  actualizarTotal(event){
    this.total = 0;
    for (let p of this.dataSource){
      this.total += p.precio * p.cantidad;
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.total = 0;
    for (let p of this.dataSource){
      this.total += p.precio * p.cantidad;
    }
  }


}
