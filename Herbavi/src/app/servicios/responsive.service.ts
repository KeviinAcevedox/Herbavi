import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Responsive } from '../modelos/responsive';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  // Instancia que establece la dimension momentanea

  responsive_flags: Responsive = new Responsive();


  constructor( private responsive: BreakpointObserver) {
    this.responsive.observe([
      Breakpoints.WebLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape
    ])
    .subscribe( result => {
      
      // Guardar el resultado encontrado
      const breakpoints = result.breakpoints;

      // Resetear los flags
      this.responsive_flags.web_landscape = false;
      this.responsive_flags.tablet_portrait = false;
      this.responsive_flags.tablet_landscape = false;
      this.responsive_flags.smartphone_portrait = false;
      this.responsive_flags.smartphone_landscape = false;
      this.responsive_flags.carta_smartphone = false;
      this.responsive_flags.carta_tablet = false;
      this.responsive_flags.carta_web = false;

      if (breakpoints[Breakpoints.HandsetPortrait]){
        this.responsive_flags.smartphone_portrait = true;
        this.responsive_flags.carta_smartphone = true;
      }

      else if (breakpoints[Breakpoints.TabletPortrait]){
        this.responsive_flags.tablet_portrait = true;
        this.responsive_flags.carta_tablet = true;
      }

      else if (breakpoints[Breakpoints.HandsetLandscape]){
        this.responsive_flags.smartphone_landscape = true;
        this.responsive_flags.carta_tablet = true;
      }

      else if (breakpoints[Breakpoints.TabletLandscape]){
        this.responsive_flags.tablet_landscape = true;
        this.responsive_flags.carta_web = true;
      }

      else if (breakpoints[Breakpoints.WebLandscape]){
        this.responsive_flags.web_landscape = true;
        this.responsive_flags.carta_web = true;
      }
    });
   }
}
