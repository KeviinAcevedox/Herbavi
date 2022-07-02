import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  // Variable para mostrar una imagen en caso de que se esté cargando datos de la API
  mostrarLoading: boolean = false;

  // Lista de categorias de los productos
  listaCategorias: any[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _imagenesService: ImagenesService,
    private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

  nombre_producto: string = '';
  precio: number = 0;
  cantidad: number = 0;
  descripcion: string = '';
  categoria: string = '';
  imagenFile: File;

  // Metodo para resetear el valor de todos los imputs del componente
  resetear(){
    this.nombre_producto = '';
    this.precio = 0;
    this.cantidad = 0;
    this.descripcion = '';
    this.categoria = '';
  }

  // Metodo para regresar al apartado de todos los productos
  productos(){
    this.router.navigate(['/Herbavi-Admin/Productos',
  'Todas', 1]);
  }
  
  // Metodo para recibir la imagen del input
  onFileChanged(event){
    this.imagenFile = event.target.files[0];
  }

  // Metodo para actualizar la lista de categorias del Select
  async actualizarCategorias(){
    this.mostrarLoading = true;
    this.listaCategorias = await this.peticiones.getCategorias();
    await this.peticiones.delay(0.5);
    this.mostrarLoading = false;
  }

  // Metodo para enviar una solicitud de agregar producto en el servidor
  async agregarProducto(){
    this.mostrarLoading = true;
    // Primero convertir la imagen a base 64
    let img = await this._imagenesService.imageToFile64(this.imagenFile);
    // Luego llamar al método POST con los datos del nuevo producto
    const response = await this.peticiones.agregarNuevoProducto(
      this.nombre_producto, this.precio, this.categoria, img.toString(),
      this.descripcion, this.cantidad);
      await this.peticiones.delay(0.3);
    this.mostrarLoading = false;
    // Validar la respuesta del servidor
    let estatus = response['estatus'];
    let mensaje = response['mensaje'];

    this.notificaciones.mostrarNotificacion(mensaje, 2);
    if (!estatus){
        return;
    }
    // Si la respuesta es true
    this.resetear();
  }
  
  

  ngOnInit(): void {
    // Siempre que se reinicie el componente se debe actualizar la lista de categorias
    this.actualizarCategorias();
  }

}
