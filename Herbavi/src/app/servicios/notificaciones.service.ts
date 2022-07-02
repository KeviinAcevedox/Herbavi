import { Injectable } from '@angular/core';
import { MatSnackBar,
   MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  // Configuracion de la posicion del Snack
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snack: MatSnackBar) { }

  // Metodo para mostrar notificaciones en pantalla
  mostrarNotificacion(mensaje: string, tiempo_segundos: number) {
    this.snack.open(mensaje, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: tiempo_segundos * 1000,
    });
  }
}
