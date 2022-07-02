import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  constructor() { }

  // Metodo para convertir una imagen a Base 64
  imageToFile64(imagen: File) {
    return new Promise(resolve => {
      let reader =  new FileReader();
      reader.readAsDataURL(imagen);
      reader.onloadend = (e) => {
        resolve(reader.result);
      }
    });
  }

}
