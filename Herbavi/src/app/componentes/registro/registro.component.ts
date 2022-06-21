import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  // Variables usadas para almacenar los datos de los campos de texto
  nombre: string = '';

  apellidos: string = '';

  numero_telefono: number = 0;

  correo: string = '';

  direccion_residencia: string = '';

  numero_cuenta: number = 0;

  nombre_usuario: string = '';

  regresar(){
    this.router.navigate(['/']);
  }
  
  ngOnInit(): void {
  }

}
