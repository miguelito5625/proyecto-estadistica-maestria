export class Estadistica {

    constructor() {

    }

    calcularAmplitud(rango, intervalos){
        return rango / intervalos;
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
