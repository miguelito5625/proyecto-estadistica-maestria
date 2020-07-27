import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';
import { element } from 'protractor';

@Component({
  selector: 'app-pagina-histograma',
  templateUrl: './pagina-histograma.component.html',
  styleUrls: ['./pagina-histograma.component.css']
})
export class PaginaHistogramaComponent implements OnInit {

  constructor(
    private servicioEstadistica: EstadisticaService
  ) {
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
          data: this.frecuenciasAbsolutas, backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)'
        },
      ];
      this.barChartLabels = this.limitesTabla;
    }
  }

  frecuenciasAbsolutas = [];
  limitesTabla = [];

  public barChartOptions = {
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 1.3,
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
          beginAtZero: true
        }
      }]
    },
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {
      data: [], backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)'
    },
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  ngOnInit() {
  }

}
