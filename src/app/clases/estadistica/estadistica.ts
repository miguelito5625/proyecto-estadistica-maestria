export class Estadistica {

    constructor() {

    }

    calcularMediana(numeroDatos, tablaFrecuencia, amplitud) {
        let mediana = 0;
        let posicion = 0;

        let intervaloSeleccionado;
        let intervaloAnterior;
        let intervaloSiguiente;

        if (numeroDatos % 2 === 0) {
            posicion = Number(numeroDatos / 2);
        } else {
            posicion = Number((numeroDatos + 1) / 2);
        }

        // console.log('la posicion es:', posicion);
        // console.log('el tamanio de la tabla es:', tablaFrecuencia.length);


        for (let index = 0; index < tablaFrecuencia.length; index++) {

            if (index === Number(tablaFrecuencia.length - 1)) {
                break;
            }

            //Si el resultado de dividir el numero de datos entre 2 se encuentra en F la mediana sera el ls de ese intervalo
            if (posicion === tablaFrecuencia[index].F) {
                mediana = tablaFrecuencia[index].ls;
                return mediana;
            }

            if (tablaFrecuencia[index].F > posicion) {
                intervaloSeleccionado = tablaFrecuencia[index];
                intervaloAnterior = tablaFrecuencia[index-1];
                intervaloSiguiente = tablaFrecuencia[index+1];
                break;
            }
            
        }       

        // console.log('intervalo seleccionado: ', intervaloSeleccionado);
        // console.log('intervalo anterior: ', intervaloAnterior);
        // console.log('intervalo siguiente: ', intervaloSiguiente);

        mediana = Number(intervaloSeleccionado.li + (((posicion-intervaloAnterior.F)/intervaloSeleccionado.f)*(intervaloSeleccionado.ls - intervaloSeleccionado.li)));
        
                

        return mediana;
    }

    calcularAmplitud(rango, intervalos) {
        return rango / intervalos;
    }

    calcularTablaDeFrecuencias(arrayDatos, datoMenor, intervalos, amplitud, numeroDatos) {
        arrayDatos = this.ordenarArrayMenorAMayor(arrayDatos);
        let arrayObjetos: any = [];
        amplitud = Math.ceil(amplitud);

        let limiteInferior;
        let limiteSuperior;
        let marcaDeClase;
        let frecuenciaAbsoluta = 0;
        let frecuenciaRelativa = 0;
        let frecuenciaAbsolutaAcumulada = 0;

        for (let index = 0; index < intervalos; index++) {
            frecuenciaAbsoluta = 0;
            frecuenciaRelativa = 0;

            if (index === 0) {
                limiteInferior = datoMenor;
                limiteSuperior = Number(limiteInferior + amplitud);
            } else {
                limiteInferior = limiteSuperior;
                limiteSuperior = Number(limiteInferior + amplitud);
            }

            arrayDatos.forEach((element) => {
                if (index === Number(intervalos - 1)) {
                    if (element >= limiteInferior && element <= limiteSuperior) {
                        frecuenciaAbsoluta++;
                    }
                } else {
                    if (element >= limiteInferior && element < limiteSuperior) {
                        frecuenciaAbsoluta++;
                    }
                }

            });

            if (index === 0) {
                frecuenciaAbsolutaAcumulada = frecuenciaAbsoluta;
            } else {
                frecuenciaAbsolutaAcumulada = Number(frecuenciaAbsolutaAcumulada + frecuenciaAbsoluta)
            }

            marcaDeClase = Number((limiteInferior + limiteSuperior) / 2);
            frecuenciaRelativa = Number((frecuenciaAbsoluta / numeroDatos).toFixed(3));

            const xf = Number(marcaDeClase * frecuenciaAbsoluta);

            let objeto = {
                li: limiteInferior,
                ls: limiteSuperior,
                x: marcaDeClase,
                f: frecuenciaAbsoluta,
                fr: frecuenciaRelativa,
                F: frecuenciaAbsolutaAcumulada,
                xf: xf
            }

            arrayObjetos.push(objeto);


        }

        return arrayObjetos;

    }

    intervalosReglaSturges(numeroDatos) {

        let resultado = Number(1 + (3.322 * (Math.log10(numeroDatos))));

        if (Math.floor(resultado) % 2 === 0) {
            resultado += 1;
        }

        resultado = Math.floor(resultado);
        return resultado
    }


    ordenarArrayMenorAMayor(array_elements) {

        return array_elements.sort(function (a, b) {
            return a - b;
        });

    }

    ordenamientoConteo(array_elements) {

        array_elements = this.ordenarArrayMenorAMayor(array_elements);

        let arrayObjetos: any = [];

        var current = null;
        var cnt = 0;
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    // document.write(current + ' comes --> ' + cnt + ' times<br>');
                    arrayObjetos.push({
                        current,
                        cnt
                    });
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            // document.write(current + ' comes --> ' + cnt + ' times');
            arrayObjetos.push({
                current,
                cnt
            });
        }

        // console.log(arrayObjetos);
        return arrayObjetos;

    }
}
