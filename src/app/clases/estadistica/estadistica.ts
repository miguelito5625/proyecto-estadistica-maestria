export class Estadistica {

    constructor() {

    }

    calcularAmplitud(rango, intervalos) {
        return rango / intervalos;
    }

    calcularTablaDeFrecuencias(arrayDatos, datoMenor, intervalos, amplitud) {
        arrayDatos = this.ordenarArrayMenorAMayor(arrayDatos);
        let arrayObjetos: any = [];
        amplitud = Math.round(amplitud);

        let limiteInferior;
        let limiteSuperior;
        let marcoDeClase;

        for (let index = 0; index < intervalos; index++) {


            if (index === 0) {
                limiteInferior = datoMenor;
                limiteSuperior = Number(limiteInferior + amplitud);
            } else {
                limiteInferior = limiteSuperior;
                limiteSuperior = Number(limiteInferior + amplitud);
            }

            let objeto = {
                li: limiteInferior,
                ls: limiteSuperior,
                x: Number((limiteInferior + limiteSuperior)/2),
                f: '',
                fr: '',
                F: ''
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
