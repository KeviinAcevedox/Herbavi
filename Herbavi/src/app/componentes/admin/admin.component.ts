import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private notificaciones: NotificacionesService,
    private peticiones: PeticionesService) { }

    // Metodo para regresar a la pantalla de Login
    regresar(){
      this.router.navigate(['']);
    }

    
  // Método para dirigirse productos admin
  productos(){
    this.router.navigate(['/Herbavi-Admin/Productos']);
  }

  ngOnInit(): void {
  }

}
