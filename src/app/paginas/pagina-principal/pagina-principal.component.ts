import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Estadistica } from 'src/app/clases/estadistica/estadistica';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

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

  private estadistica = new Estadistica();

  datosOrdenados:any;
  rangoObtenido:boolean = false;

  formularioDatos = new FormGroup({
    inputDatos: new FormControl('25,65,66,65,66,65,9,69,89,9,96,13,56,4,88,52,6,54,58'),
    // inputDatos: new FormControl(''),
    inputMinimo: new FormControl(''),
    inputMaximo: new FormControl(''),
    inputRango: new FormControl(''),
    inputNumeroDatos: new FormControl(''),
    inputIntervalos: new FormControl(''),
    inputAmplitud: new FormControl('')
  })

  constructor(  ) { }

  ngOnInit(): void {

    
    

  }

 async onSubmit(){
    let datosDesordenados = this.formularioDatos.value.inputDatos.split(',');
    console.log(datosDesordenados);

    const numeroDatos = datosDesordenados.length;
    this.formularioDatos.controls.inputNumeroDatos.setValue(numeroDatos);

    const xMax = Math.max(...datosDesordenados);
    const xMin = Math.min(...datosDesordenados);

    this.formularioDatos.controls.inputMaximo.setValue(xMax);
    this.formularioDatos.controls.inputMinimo.setValue(xMin);

    const rango:Number = Number(xMax) - Number(xMin);
    this.formularioDatos.controls.inputRango.setValue(rango);

    this.datosOrdenados = this.estadistica.ordenamientoConteo(datosDesordenados);

    const intervalos = this.estadistica.intervalosReglaSturges(numeroDatos);
    this.formularioDatos.controls.inputIntervalos.setValue(intervalos);

    const amplitud = this.estadistica.calcularAmplitud(rango, intervalos);
    this.formularioDatos.controls.inputAmplitud.setValue(amplitud);

    this.rows = this.estadistica.calcularTablaDeFrecuencias(datosDesordenados, xMin, intervalos, amplitud);
    console.log(this.rows);
    
    
  }

  

}
