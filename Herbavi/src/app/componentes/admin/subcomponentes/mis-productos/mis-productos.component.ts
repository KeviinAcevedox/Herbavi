import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  // Variable para mostrar una imagen en caso de que se esté cargando datos de la API
  mostrarLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) {}

  // Variables para controlar los productos por páginas
  totalProductos = 12;
  pagina = 1;

  // Lista de categorias de los productos
  listaCategorias: any[] = [];

  // Variable para cuando se quiera agregar una nueva categoria
  nombreNuevaCategoria: string = '';

  // Lista que contiene los productos a mostrar en la pantalla
  listaProductos: Producto[] = [];

  // Variable para la selección de categoría
  categoria: any;

  // Metodo para dirigirse al apartado de agregar nuevo producto
  agregarProducto(){
    this.router.navigate(['/Herbavi-Admin/NuevoProducto']);
  }

  openDialogInfo(nombre: string, descripcion: string) {
    this.dialog.open(InfoDialog, {
      data: {
        nombre_producto: nombre,
        descripcion_producto: descripcion
      }
    });
  }
  openDialogNuevaCategoria(): void {
    const dialogRef = this.dialog.open(DialogNuevaCategoria, {
      width: '300px',
      data: {categoria: this.nombreNuevaCategoria},
    });

    dialogRef.afterClosed().subscribe(result => {
      // Verificar que el usuario haya escrito un nombre de categoria
      if (result == ''){
        this.notificaciones.mostrarNotificacion(
          'No se ha proporcionado ningún nombre de categoría.',
          2
        );
        return;
      }

      if (result == undefined){
        return;
      }

      // Si hay un nombre de categoria entonces se debe realizar la peticion
      this.nombreNuevaCategoria = result;
      this.agregarNuevaCategoria();
    });
  }
  openDialogEliminar(nombre_producto: string, categoria: string, id: string): void {
    const dialogRef = this.dialog.open(DialogEliminarProducto, {
      width: '300px',
      data: {nombre: nombre_producto, categoria: categoria, id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // Una vez confirmado se llama a eliminar
      this.eliminarProducto(result[0], result[1]);
    });
  }
  // Metodo para hacer un post de una nueva categoria
  async agregarNuevaCategoria(){
    this.mostrarLoading = true;
    const response = await this.peticiones.agregarCategoria(this.nombreNuevaCategoria);
    this.mostrarLoading = false;

    // Mostrar el mensaje del servidor por medio de una notificacion
    let mensaje = response['mensaje'];
    this.notificaciones.mostrarNotificacion(
      mensaje, 2);
    // Limpiar el input de nueva categoria
    this.nombreNuevaCategoria = '';
    // Actualizar los datos
    this.actualizarDatosAPI();
    
  }

  // Este metodo se ejecuta cuando se presiona el boton de cambiar página
  onChangedPage(pageData: PageEvent) {
    console.log(pageData.pageIndex);
    this.pagina = pageData.pageIndex + 1;
    this.router.navigate(['/Herbavi-Admin/Productos', this.categoria, this.pagina]);
  }

  // Se ejecuta cuando se presiona un radioButton de categorias
  // En este caso se van a pedir los productos de la pagina 1 por defecto
  actualizarCategoria(nueva_categoria: string) {
    this.categoria = nueva_categoria;
    this.router.navigate(['/Herbavi-Admin/Productos', this.categoria, 1]);
  }

  // Metodo para pedir los datos de la API
  async actualizarDatosAPI(){
    if (this.categoria == 'Todas'){
      this.solicitarTodosProductos();
      return;
    }
    this.mostrarLoading = true;
    this.listaCategorias = await this.peticiones.getCategorias();
    const response = await this.peticiones.getProductosCategoria(this.categoria, this.pagina);
    this.listaProductos = response['lista_productos'];
    this.totalProductos = response['cantidad_total']
    await this.peticiones.delay(0.1);
    this.mostrarLoading = false;
  }

  // Este metodo se ejecuta cuando el usuario acaba de entrar en la vista de admin
  // Se piden todos los productos pero por defecto en la primera pagina
  async solicitarTodosProductos(){
    this.mostrarLoading = true;
    this.listaCategorias = await this.peticiones.getCategorias();
    const response = await this.peticiones.getTodosProductos(this.pagina);
    this.listaProductos = response['lista_productos'];
    this.totalProductos = response['cantidad_total']
    await this.peticiones.delay(0.1);
    this.mostrarLoading = false;
  }

  // Metodo para solicitar la eliminacion de un producto en su categoria
  async eliminarProducto(categoria: string, id: string){
    this.mostrarLoading = true;
    const response = await this.peticiones.deleteProductoCategoria(
      categoria, id);
    this.mostrarLoading = false;
    // Validar la respuesta del servidor
    let estatus = response['estatus'];
    let mensaje = response['mensaje'];

    this.notificaciones.mostrarNotificacion(mensaje, 2);
    if (!estatus){
      return;
    }
    this.actualizarDatosAPI();
  }

  ngOnInit(): void {
    // Suscribirse para que cada vez que se cambie la ruta se actualicen los datos
    this.route.params.subscribe(routeParams => {
      this.categoria = routeParams.categoria;
      this.pagina = routeParams.pagina;
      this.actualizarDatosAPI();
    });
  }

}
// Definicion del componente Info Dialog
@Component({
  selector: 'info-dialog-admin',
  templateUrl: 'carta-info-admin.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

// Definicion del componente DialogCategoria
@Component({
  selector: 'dialog-categorias',
  templateUrl: 'dialog-categorias.html',
})
export class DialogNuevaCategoria {
  constructor(
    public dialogRef: MatDialogRef<DialogNuevaCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Componente para eliminar productos
@Component({
  selector: 'dialog-eliminar-productos',
  templateUrl: 'carta-eliminar-producto.html',
})
export class DialogEliminarProducto {
  constructor(
    public dialogRef: MatDialogRef<DialogEliminarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


