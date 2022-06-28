import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) { }

  // Solicitar los nombres de las categorias
  async getNombreCategorias(){
    let data = await this.http.get<any[]>('http://127.0.0.1:4000/api/categorias').toPromise();
     console.log(data);
    }
}

