import { Component, OnInit } from '@angular/core';

declare var Swal:any;

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  mostrarIntegrantes(){
    Swal.fire({
      title: 'Integrantes',
      html: `1. Marco Antonio Villagran Sagastume <br>
              2. Oscar Giovany Reyes Muñoz <br>
              3. Miguel Angel Archila García`
    });
  }

}
