import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProductoCarrito } from 'src/app/modelos/producto-carrito';
import { Responsive } from 'src/app/modelos/responsive';
import { ResponsiveService } from 'src/app/servicios/responsive.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private responsive: ResponsiveService) { }

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive;

  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'subtotal', 'eliminar'];
  dataSource = [];

  @ViewChild(MatTable) table: MatTable<ProductoCarrito>;

  // Variable para actualizar el total a pagar
  total: number = 0;

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
        // Actualizar el Local Storage
        this.actualizarLocalStorage();
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

  // Metodo para copiar la lista de productos carrito que se encuentra en el localStorage
  getListaProductosCarrito(){
    let productos_carrito: ProductoCarrito[] = JSON.parse(
      localStorage.getItem('productos_carrito'));
    return productos_carrito;
  }

  // Metodo para guardar los cambios de la lista en el LocalStorage
  actualizarLocalStorage(){
    localStorage.setItem('productos_carrito', JSON.stringify(this.dataSource));
  }

  ngOnInit(): void {
    // Cargar los productos del LocalStorage
    this.dataSource = this.getListaProductosCarrito();

    // Actualizar el total del carrito de compras
    this.actualizarTotal();

    // Usar el objeto responsive del servicio Responsive
    this.responsive_flags = this.responsive.responsive_flags; 
  }


}
