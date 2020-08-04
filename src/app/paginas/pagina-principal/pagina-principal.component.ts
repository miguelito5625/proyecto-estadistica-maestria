import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Estadistica } from 'src/app/clases/estadistica/estadistica';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';

declare var Swal:any;

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
    inputDatos: new FormControl('22,19,16,13,18,15,20,14,15,16,15,16,20,13,15,18,15,13,18,15'),
    // inputDatos: new FormControl('25,65,66,65,66,65,9,69,89,9,96,13,56,4,88,52,6,54,58'),
    // inputDatos: new FormControl(''),
    inputTipoDatos: new FormControl('Latencias', [Validators.required]),
    inputMinimo: new FormControl(''),
    inputMaximo: new FormControl(''),
    inputRango: new FormControl(''),
    inputNumeroDatos: new FormControl(''),
    inputIntervalos: new FormControl(''),
    inputAmplitud: new FormControl(''),
    inputMedia: new FormControl(''),
    inputMediana: new FormControl('')    
  });

  tipoDatos = "";

  constructor( 
    private servicioEstadistica: EstadisticaService
   ) {

      if (this.servicioEstadistica.datosFormulario && this.servicioEstadistica.datosTabla) {
        this.formularioDatos.patchValue(this.servicioEstadistica.datosFormulario);
        this.rows = this.servicioEstadistica.datosTabla;
        const nombreDato = this.servicioEstadistica.datosFormulario.inputTipoDatos;
        this.tipoDatos = nombreDato.charAt(0).toUpperCase() + nombreDato.slice(1);
      }
    
    }

  ngOnInit(): void {

  }

  cambioValorTipoDato(){
    const nombreDato = this.formularioDatos.controls.inputTipoDatos.value;
    this.tipoDatos = nombreDato.charAt(0).toUpperCase() + nombreDato.slice(1);
  }

 async onSubmit(){

  if (!/[a-zA-Z]/.test(this.formularioDatos.controls.inputTipoDatos.value)) {
     Swal.fire({
      title: 'Atencion!',
      text: 'No escribio el tipo de dato a procesar',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

    let datosDesordenados = this.formularioDatos.value.inputDatos.split(',');
    const numeroDatos = datosDesordenados.length;
    const xMax = Math.max(...datosDesordenados);
    const xMin = Math.min(...datosDesordenados);
    const rango:Number = Number(xMax) - Number(xMin);
    this.datosOrdenados = this.estadistica.ordenamientoConteo(datosDesordenados);
    const intervalos = this.estadistica.intervalosReglaSturges(numeroDatos);
    const amplitud = Math.ceil(this.estadistica.calcularAmplitud(rango, intervalos));
    this.rows = this.estadistica.calcularTablaDeFrecuencias(datosDesordenados, xMin, intervalos, amplitud, numeroDatos);
    
    let sumatoriaxf = 0;
    let sumatoriaFrecuenciaAbsoluta = 0;
    let sumatoriaFrecuenciaRelativa = 0;
    this.rows.forEach(element => {
      sumatoriaxf = sumatoriaxf+element.xf;
      sumatoriaFrecuenciaAbsoluta = sumatoriaFrecuenciaAbsoluta+element.f;
      sumatoriaFrecuenciaRelativa = sumatoriaFrecuenciaRelativa+element.fr;
    });
    this.rows.push({
      f: `Σ = ${sumatoriaFrecuenciaAbsoluta}`,
      xf: `Σ = ${sumatoriaxf}`,
      fr: `Σ = ${sumatoriaFrecuenciaRelativa}`
    });
    
    const mediaAritmetica = Number(sumatoriaxf/numeroDatos);
    this.formularioDatos.controls.inputMedia.setValue(mediaAritmetica);

    const mediana = this.estadistica.calcularMediana(numeroDatos, this.rows, amplitud);    

    this.formularioDatos.patchValue({
      inputNumeroDatos: numeroDatos,
      inputMaximo: xMax,
      inputMinimo: xMin,
      inputRango: rango,
      inputIntervalos: intervalos,
      inputAmplitud: amplitud,
      inputMedia: mediaAritmetica,
      inputMediana: mediana.toFixed(2)
    });
    
    this.servicioEstadistica.datosFormulario = this.formularioDatos.value;
    this.servicioEstadistica.datosTabla = this.rows;
    
  }

  

}
