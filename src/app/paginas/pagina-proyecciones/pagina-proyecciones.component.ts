import { Component, OnInit, ViewChild } from '@angular/core';
import { Estadistica } from 'src/app/clases/estadistica/estadistica';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { FormGroup, FormControl } from '@angular/forms';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

declare var Swal: any;

@Component({
  selector: 'app-pagina-proyecciones',
  templateUrl: './pagina-proyecciones.component.html',
  styleUrls: ['./pagina-proyecciones.component.css']
})
export class PaginaProyeccionesComponent implements OnInit {

  private estadistica = new Estadistica();

  numeroDePeriodos = 0;
  valorMinimo = 0;
  valorMaximo = 0;

  sumatoriaX = 0;
  sumatoriaY = 0;
  sumatoriaXCuadrada = 0;
  sumatoriaYCuadrada = 0;
  sumatoriaXY = 0;

  resultadoA = 0;
  resultadoB = 0;
  resultadoY = 0;

  formularioFormulas = new FormGroup({
    inputResultadoB: new FormControl(''),
    inputResultadoA: new FormControl(''),
    inputResultadoY: new FormControl('')
  });

  //propiedades de la grafica

  public barChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  // public barChartLabels = ['13', '15', '17', '19', '21', '23'];
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    {
      data: [],
      // data: [4, 9, 3, 3, 1],
      label: 'Proyección',
      // barPercentage: 1.25
    }

  ];


  //fin propiedades de la grafica


  // Propiedades de la tabla

  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;

  // Fin propiedades de la tabla


  constructor() { }

  ngOnInit(): void {

  }

  async calcularProyeccion() {

    this.numeroDePeriodos = Number(this.numeroDePeriodos + 1);

    this.resultadoB = Number(((this.numeroDePeriodos * this.sumatoriaXY) - (this.sumatoriaX * this.sumatoriaY)) / ((this.numeroDePeriodos * this.sumatoriaXCuadrada) - (Math.pow(this.sumatoriaX, 2))));
    this.resultadoA = Number((this.sumatoriaY - (this.resultadoB * this.sumatoriaX)) / this.numeroDePeriodos);
    this.resultadoY = Number(this.resultadoA + (this.resultadoB * this.numeroDePeriodos));

    this.formularioFormulas.patchValue({
      inputResultadoB: this.resultadoB,
      inputResultadoA: this.resultadoA,
      inputResultadoY: this.resultadoY
    });

    const objeto = {
      x: this.numeroDePeriodos,
      y: Number(this.resultadoY.toFixed(2)),
      xCuadrada: Number(Math.pow(this.numeroDePeriodos, 2).toFixed(2)),
      yCuadrada: Number(Math.pow(this.resultadoY, 2).toFixed(2)),
      xy: Number(Number(this.numeroDePeriodos * this.resultadoY).toFixed(2))
    };

    this.barChartLabels.push(objeto.x);
    this.barChartData[0].data.push(objeto.y);

    this.rows.pop();
    let temp = this.rows;

    this.rows = [];

    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      this.rows.push(element);
    }

    // this.rows = [...temp];

    this.rows.push(objeto);
    this.calcularFilaSumatorias();

  }

  async generarTablaProyecciones() {

    const swalGenerarDatos = await Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: '¿Cuantos periodos (x) generar?',
        inputValidator: (value) => {
          if (!value || Number(value) < 5 || isNaN(value)) {
            return 'Tienen que ser al menos 5 periodos'
          }
        }
      },
      {
        title: 'Valor minimo para cada periodo',
        inputValidator: (value) => {
          if (!value || Number(value) < 1 || isNaN(value)) {
            return 'Tiene que ser un valor numerico'
          }
        }
      },
      {
        title: 'Valor maximo para cada periodo',
        inputValidator: (value) => {
          if (!value || Number(value) < 1 || isNaN(value)) {
            return 'Tiene que ser un valor numerico'
          }
        }
      }
    ]);

    if (swalGenerarDatos.dismiss) {
      return;
    }
    console.log(swalGenerarDatos);

    this.numeroDePeriodos = Number(swalGenerarDatos.value[0]);
    this.valorMinimo = Number(swalGenerarDatos.value[1]);
    this.valorMaximo = Number(swalGenerarDatos.value[2]);

    console.log('periodos:', this.numeroDePeriodos);
    console.log('minimo:', this.valorMinimo);
    console.log('maximo:', this.valorMaximo);

    this.rows = this.estadistica.generarTablaProyecciones(this.numeroDePeriodos, this.valorMinimo, this.valorMaximo);

    let legends = [];
    let data = [];

    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      // legends.push(element.x);
      // data.push(element.y);
      this.barChartLabels.push(element.x);
      this.barChartData[0].data.push(element.y);
    }

    // this.barChartLabels = legends;
    // this.barChartData = [
    //   {
    //     data: data,
    //     label: 'Proyección'
    //   }  
    // ];

    this.calcularFilaSumatorias();


  }

  calcularFilaSumatorias() {

    this.sumatoriaX = 0;
    this.sumatoriaY = 0;
    this.sumatoriaXCuadrada = 0;
    this.sumatoriaYCuadrada = 0;
    this.sumatoriaXY = 0;

    // console.log('prueba');
    // console.log(this.rows);


    for (let index = 0; index < this.rows.length; index++) {

      const element = this.rows[index];
      this.sumatoriaX = this.sumatoriaX + element.x;
      this.sumatoriaY = Number(Number(this.sumatoriaY + element.y).toFixed(2));
      this.sumatoriaXCuadrada = Number(Number(this.sumatoriaXCuadrada + element.xCuadrada).toFixed(2));
      this.sumatoriaYCuadrada = Number(Number(this.sumatoriaYCuadrada + element.yCuadrada).toFixed(2));
      this.sumatoriaXY = Number(Number(this.sumatoriaXY + element.xy).toFixed(2));

      // console.log('element:', index);
      // console.log(element);


    }

    this.rows.push({
      x: `Σ = ${this.sumatoriaX}`,
      y: `Σ = ${this.sumatoriaY}`,
      xCuadrada: `Σ = ${this.sumatoriaXCuadrada}`,
      yCuadrada: `Σ = ${this.sumatoriaYCuadrada}`,
      xy: `Σ = ${this.sumatoriaXY}`,
    });

  }



}
