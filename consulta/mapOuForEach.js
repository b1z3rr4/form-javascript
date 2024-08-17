// Conversao de array
const arrayDosCampos = Array.from(camposDoFormulario);

console.debug(arrayDosCampos);

const meyArray = ['1', '2', '3']

console.debug(meyArray)

const meuNovoArray1 = meyArray.forEach((item, indice) => {
    return 'hello' + ' ' + indice;
})

const meuNovoArray2 = meyArray.map((item, indice) => {
    return 'hello' + ' ' + indice;
})

console.debug(meuNovoArray1)
console.debug(meuNovoArray2)
