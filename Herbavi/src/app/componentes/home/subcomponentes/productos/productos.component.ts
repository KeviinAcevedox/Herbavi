import { Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/modelos/producto';
import { Responsive } from 'src/app/modelos/responsive';
import { PageEvent } from '@angular/material/paginator';
import { ResponsiveService } from 'src/app/servicios/responsive.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { ProductoCarrito } from 'src/app/modelos/producto-carrito';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  // Variable para mostrar una imagen en caso de que se esté cargando datos de la API
  mostrarLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private responsive: ResponsiveService,
    private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

  // Variables para controlar los productos por páginas
  // Variables para controlar los productos por páginas
  totalProductos = 12;
  pagina = 1;

  // Objeto usado para mantener dimensiones responsive
  responsive_flags: Responsive;

  // Otras variables usadas para activar acciones responsive
  carta_web: boolean;
  carta_tablet: boolean;
  carta_smartphone: boolean;
  
  // Lista que contiene los productos a mostrar en la pantalla
  listaProductos: Producto[] = [];

  // Lista de categorias de los productos
  listaCategorias: any[] = [];

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
    this.pagina = pageData.pageIndex + 1;
    this.router.navigate(['/Herbavi-Home/Productos', this.categoria, this.pagina]);
  }

  // Se ejecuta cuando se presiona un radioButton de categorias
  // En este caso se van a pedir los productos de la pagina 1 por defecto
  actualizarCategoria(nueva_categoria: string) {
    this.categoria = nueva_categoria;
    this.router.navigate(['/Herbavi-Home/Productos', this.categoria, 1]);
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
    this.totalProductos = response['cantidad_total'];
    this.recordarProductosCarrito();
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
    this.recordarProductosCarrito();
    await this.peticiones.delay(0.1);
    this.mostrarLoading = false;
  }


  // Metodo para copiar la lista de productos carrito que se encuentra en el localStorage
  getListaProductosCarrito(){
    let productos_carrito: ProductoCarrito[] = JSON.parse(
      localStorage.getItem('productos_carrito'));
    return productos_carrito;
  }

  // Metodo para recorrer la lista de productos en el carrito y compararla
  // con la lista de productos normal para recordar cuáles productos ya están agregados
  // Esta función se llama despues de actualizar los productos de la API
  recordarProductosCarrito(){
    let productos_carrito: ProductoCarrito[] = this.getListaProductosCarrito();
    for (let p of this.listaProductos){
      for (let pc of productos_carrito){
        if (pc.id == p.id){
          p.estado = 'carrito'
          break;
        }
      }
    }
  }

  // Metodo para agregar un producto a la lista de productos del localStorage
  agregarProductoCarrito(producto: Producto){
    const productos_carrito: ProductoCarrito[] = this.getListaProductosCarrito();
    let nuevo_producto_carrito: ProductoCarrito = {
      nombre: producto.nombre,
      id: producto.id,
      precio: producto.precio,
      cantidad: 0
    }

    // Agregar el producto a la lista del carrito
    productos_carrito.push(nuevo_producto_carrito);

    // Actualizar el local storage
    localStorage.clear();
    localStorage.setItem('productos_carrito',JSON.stringify(productos_carrito));

    // Actualizar el estado del producto
    producto.estado = 'carrito';
  }

  // Metodo para eliminar un producto del carrito
  soltarProductoCarrito(producto: Producto){
    const productos_carrito: ProductoCarrito[] = this.getListaProductosCarrito();

    // Cambiar el estado del producto a 'disponible'
    producto.estado = 'disponible';

    // Buscar el producto en la lista de carrito y eliminarlo
    productos_carrito.forEach( (item, index) => {
      if(item.id === producto.id){
        if (index == -1){
          productos_carrito.pop();
        }
        else{
          productos_carrito.splice(index,1);
        }
        // Actualizar el local storage
        localStorage.clear(); 
        localStorage.setItem('productos_carrito',JSON.stringify(productos_carrito));
      }
    });
  }


  ngOnInit(): void {
    // Usar el objeto responsive del servicio Responsive
    this.responsive_flags = this.responsive.responsive_flags;
    this.carta_smartphone = this.responsive.responsive_flags.carta_smartphone;
    this.carta_tablet = this.responsive.responsive_flags.carta_tablet;
    this.carta_web = this.responsive.responsive_flags.carta_web;
    // Suscribirse para que cada vez que se cambie la ruta se actualicen los datos
    this.route.params.subscribe(routeParams => {
      this.categoria = routeParams.categoria;
      this.pagina = routeParams.pagina;
      this.actualizarDatosAPI();
    });
  }

}

// Componente para mostrar información del producto seleccionado
@Component({
  selector: 'info-dialog',
  templateUrl: 'carta.info.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
