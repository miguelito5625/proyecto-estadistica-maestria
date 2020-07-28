import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

declare var Swal:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoestadistica';

  constructor(
    private router: Router
  ){

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        // console.log('inicio navegacion');

        Swal.fire({
          title: 'Cargando',
          icon: 'info',
          html: 'Por favor, espere',
          timerProgressBar: true,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        
      }

      if(event instanceof NavigationEnd) {
        // console.log('termino navegacion');
        setTimeout(() => {
          Swal.close();
        }, 500);
        
      }
    });

  }

}
