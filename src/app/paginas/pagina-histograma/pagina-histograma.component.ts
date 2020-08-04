import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { FormGroup, FormControl } from '@angular/forms';



declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-pagina-histograma',
  templateUrl: './pagina-histograma.component.html',
  styleUrls: ['./pagina-histograma.component.css']
})
export class PaginaHistogramaComponent implements OnInit, OnDestroy {

  tipoDeDatos: string = "";

  formularioDatosRandom = new FormGroup({
    inputIntervalo: new FormControl(''),
    inputRangoDatos: new FormControl('')
  });


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

  ngOnDestroy() {
    clearInterval(this.funcionIntervalo);
  }

  guardarGrafica() {

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

  funcionIntervalo;

  async generarDatos() {
    const intervalo =  Number(this.formularioDatosRandom.controls.inputIntervalo.value * 1000);


    $('#modalDatosRandom').modal('hide');
    this.funcionIntervalo = setInterval(() => {
      this.datosAleatorios();
    }, 
      intervalo);
    

  }

  datosAleatorios() {

    const tamanioArray = this.frecuenciasAbsolutas.length;
    let nuevoArray = [];
    const rango = Number(this.formularioDatosRandom.controls.inputRangoDatos.value);

    for (let index = 0; index < this.frecuenciasAbsolutas.length; index++) {
      const element = this.frecuenciasAbsolutas[index];
      const min = Number(element - rango);
      const max = Number(element + rango);
      const nuevoDato = this.getRndInteger(min, max);
      nuevoArray.push(nuevoDato);
    }

    console.log(nuevoArray);
    

    // this.frecuenciasAbsolutas = nuevoArray;

    this.barChartData = [
      {
        data: nuevoArray,
        label: 'Histograma',
        barPercentage: 1.25
      },
      {
        data: nuevoArray,
        label: 'Polígono de frecuencias',
        type: 'line'
      }
    ];

  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
