import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenesService } from 'src/app/servicios/imagenes.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private _imagenesService: ImagenesService) { }

  nombre_producto: string = '';
  precio: number = 0;
  cantidad: number = 0;
  descripcion: string = '';
  categoria: string = '';
  imagenFile: File;

  // Metodo para regresar al apartado de todos los productos
  productos(){
    this.router.navigate(['/Herbavi-Admin/Productos']);
  }
  
  // Metodo para recibir la imagen del input
  onFileChanged(event){
    this.imagenFile = event.target.files[0];
  }


  ngOnInit(): void {
  }

}
