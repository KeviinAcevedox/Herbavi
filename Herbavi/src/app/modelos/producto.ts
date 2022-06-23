export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public categoria: string,
        public descripcion: string,
        public estado: string,
        public cantidad: number,
        public imagen: string ,
        public precio: number
    ){

    }

}
