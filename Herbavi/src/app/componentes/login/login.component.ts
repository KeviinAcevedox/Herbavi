import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  // Estas variables se usan para almacenar los campos de texto del Login
  nombre_usuario: string  = '';
  contrasena: string = '';

  // Metodo para validar el Login
  login(){
    console.log(this.nombre_usuario);
    console.log(this.contrasena);
  }

  // Metodo para dirigirse al componente de Registro
  registrarse(){
    this.router.navigate(['/Herbavi-Registro']);
  }
  ngOnInit(): void {
  }

}
