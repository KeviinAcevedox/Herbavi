import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private peticiones: PeticionesService) { }

  // Variables para controlar los productos por páginas
  totalProducts: number = 100;
  productsPerPage: number = 20;

   // Lista que contiene los productos a mostrar en la pantalla
   listaProductos: Producto[] = [];

  // Variable para la selección de categoría
  categoria: any;

  // Metodo para dirigirse al apartado de agregar nuevo producto
  agregarProducto(){
    this.router.navigate(['/Herbavi-Admin/NuevoProducto']);
  }

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
    this.peticiones.getNombreCategorias();
  }

}
@Component({
  selector: 'info-dialog-admin',
  templateUrl: 'carta-info-admin.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
