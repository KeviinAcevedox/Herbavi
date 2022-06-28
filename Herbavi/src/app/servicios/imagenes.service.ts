import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  // Instancia de FileReader para convertir imagenes a base 64
  reader: FileReader = new FileReader();

  constructor() { }

  // Metodo para convertir una imagen a Base 64
  imageToFile64(imagen: File) {
    return new Promise(resolve => {
      this.reader.readAsDataURL(imagen);
      this.reader.onloadend = (e) => {
        resolve(this.reader.result);
      }
    });
  }

}
