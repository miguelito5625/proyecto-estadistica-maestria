import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';


declare var Swal: any;

@Component({
  selector: 'app-pagina-histograma',
  templateUrl: './pagina-histograma.component.html',
  styleUrls: ['./pagina-histograma.component.css']
})
export class PaginaHistogramaComponent implements OnInit {

  tipoDeDatos:string="";


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

          this.limitesTabla.push(`${element.li} - ${element.ls}`);
          this.frecuenciasAbsolutas.push(element.f);
          this.marcasDeClase.push(element.x);

        }


      });

      this.tipoDeDatos = this.servicioEstadistica.datosFormulario.inputTipoDatos;

      this.barChartData = [
        {
          data: this.frecuenciasAbsolutas,
          label: 'Histograma',
          barPercentage: 1.25
        },
        {
          data: this.frecuenciasAbsolutas,
          label: 'Polígono de frecuencias',
          type: 'line'
        }
      ];
      this.barChartLabels = this.limitesTabla;
      console.log(this.frecuenciasAbsolutas);
      console.log(this.limitesTabla);

      console.log('marcas de clase');
      console.log(this.marcasDeClase);



    }
  }

  frecuenciasAbsolutas = [];
  limitesTabla = [];
  marcasDeClase = [];

  public barChartOptions = {
    responsive: true,
    scales: { 
      xAxes: [{}], 
      yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }] 
    }
  };

  public barChartLabels: Label[] = ['13', '15', '17', '19', '21', '23'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    // {
    //   // data: []
    //   data: [4, 9, 3, 3, 1],
    //   label: 'Histograma',
    //   barPercentage: 1.25
    // },
    // {
    //   data: [4, 9, 3, 3, 1],
    //   label: 'Polígono de frecuencias',
    //   type: 'line'
    // }
  ];

  ngOnInit() {

  }

  guardarGrafica(){

    Swal.fire({
      title: 'Procesando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    htmlToImage.toBlob(document.getElementById('idGrafica'))
      .then(function (blob) {
        saveAs.saveAs(blob, `${new Date}.png`);
        Swal.close();
      });

  }

  async generarDatos(){
    console.log('hola');
    

  }

}
