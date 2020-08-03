import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

declare var Swal:any;

@Component({
  selector: 'app-pagina-histograma',
  templateUrl: './pagina-histograma.component.html',
  styleUrls: ['./pagina-histograma.component.css']
})
export class PaginaHistogramaComponent implements OnInit {

  constructor(
    private servicioEstadistica: EstadisticaService,
    private router: Router
  ) {

    if (!this.servicioEstadistica.datosTabla) {
      this.router.navigate(['/recoleccion-datos']);
      return;
    }

    if (this.servicioEstadistica.datosTabla) {

      this.servicioEstadistica.datosTabla.forEach((element, index) => {

        if (index < Number(this.servicioEstadistica.datosTabla.length - 1)) {

          this.limitesTabla.push(element.li);
          this.frecuenciasAbsolutas.push(element.f);

          if (Number(this.servicioEstadistica.datosTabla.length - 2) === index) {
            this.limitesTabla.push(element.ls);
          }

        }

      });


      this.barChartData = [
        {
          data: this.frecuenciasAbsolutas
        },
      ];
      this.barChartLabels = this.limitesTabla;
      console.log(this.frecuenciasAbsolutas);
      console.log(this.limitesTabla);


    }
  }

  

  frecuenciasAbsolutas = [];
  limitesTabla = [];

  public barChartOptions = {
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        ticks: {
          max: 3,
        }
      }, {
        display: true,
        ticks: {
          autoSkip: false,
          max: 4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    responsive: true
  };

  // public barChartLabels = [13, 15, 17, 19, 21, 23];
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {
      data: []
      // data: [4, 9, 3, 3, 1]
    }
  ];

  ngOnInit() {
  }

}
