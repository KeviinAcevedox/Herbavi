import { HttpClient,  HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  // Ruta principal de la API
  private api_url: string = 'http://127.0.0.1:4000/api/';

  constructor(private http: HttpClient) { }

  // Solicitar los nombres de las categorias
  async getCategorias(){
    return await this.http.get<any[]>(this.api_url + 'categorias').toPromise();
    }

  // Peticion para verificar los datos del login de un usuario
  async verificarLogin(usuario: string, password: string){
    let cuerpo_json = {
      "usuario": usuario,
      "password": password
    }
    return await this.http.post<string>(this.api_url + 'usuario/login',
     cuerpo_json).toPromise();
  }
  
  // Registrar un nuevo usuario en el sistema
  async registrarUsuario(nombre: string, apellidos: string, correo: string,
    direccion: string, telefono: string, usuario: string, password: string){
      let cuerpo_json = {
        "nombre": nombre,
        "apellidos": apellidos,
        "correo": correo,
        "telefono": telefono,
        "direccion": direccion,
        "usuario": usuario,
        "password": password
      }
      return await this.http.post<string>(this.api_url + 'usuario/registrar',
       cuerpo_json).toPromise();
    }

  // Solicitar todos los primeros 12 productos que se encuentren
  async getTodosProductos(pagina: number){

    let params = new HttpParams();

    params = params.append('pagina', pagina.toString());

    return await this.http.get<any[]>(this.api_url + 'TodosProductos?',
    {params: params}).toPromise();
    }

  // Solicitar todos los primeros 12 productos de una categoria y pagina especicifica
  async getProductosCategoria(categoria: string, pagina: number){
    let params = new HttpParams();

    params = params.append('nombre_categoria', categoria);
    params = params.append('pagina', pagina.toString());
    return await this.http.get<any[]>(this.api_url + 'productos?', 
    {params: params}).toPromise();
    }

  // Metodo para agregar una nueva categoria a la lista
  async agregarCategoria(nombre_categoria: string){
        let cuerpo_json = {
          "nombre_categoria": nombre_categoria,
        }

        return await this.http.post<string>(this.api_url + 'categoria',
         cuerpo_json).toPromise();
      }

  // Metodo para agregar un nuevo producto dentro de una categoria existente
  async agregarNuevoProducto(nombre: string, precio: number,
    categoria: string, imagen: string, descripcion: string, cantidad: number){
      let cuerpo_json = 
        {
          "cantidad": cantidad,
          "categoria": categoria,
          "descripcion": descripcion,
          "id": "",
          "imagen": imagen,
          "nombre": nombre,
          "precio": precio,
          "estado": "disponible"
      }
      return await this.http.post<string>(this.api_url + 'producto',
       cuerpo_json).toPromise();
    }

  // Eliminar un producto de una categoria
  async deleteProductoCategoria(categoria: string, id: string){
    let params = new HttpParams();

    params = params.append('nombre_categoria', categoria);
    params = params.append('id', id);

    return await this.http.delete<string>(this.api_url + 'producto?', 
    {params: params}).toPromise();
    }

  // Metodo usado para hacer un poco de delay
  delay(segundos: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(segundos);
      }, segundos * 1000);
    });
  }
}

