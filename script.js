import { tiposDeErro, mensagens } from './constants.js'

const camposDoFormulario = document.querySelectorAll('[required]');

const formulario = document.querySelectorAll('[data-formulario]');

// const minhStr = ''

// minhStr.replace

/**
 * Essa função valida um campo html para CPF.
 * @param {HTMLInputElement} campo - O campo de entrada do CPF.
 * @returns {boolean} - Retorna true se o CPF for válido, caso contrário, false.
 */
function validaCpf(campo) {
    //123.456.789.10
    //12345678910
    const cpf = campo.value.replace(/\D/g, "");

    // [undefined, undefined,  undefined,  undefined,  undefined,  undefined,  undefined,  undefined,  undefined,  undefined]
    const numerosRepetidos = Array.from({ length: 10 }, (_, indice) => String(indice).repeat(11));

    // [
    //     '00000000000',
    //     '11111111111',
    //     ...
    // ]

    // Tabela Verdade
    return !numerosRepetidos.includes(cpf)
}

function validaMaiorIdade(campo) {
    // Pesquisar tipo Date
    // Ele considera a localizacao do codigo
    // 18 horas e 30 minutos
    // Dever de casa: Unix Timestamp
    // Desde 1 janeiro de 1970
    const dataNascimento = new Date(campo.value);

    const hoje = new Date();

    
    const oMesAtualEhMenorQueOMesDeAniversario = hoje.getMonth() < dataNascimento.getMonth();
    
    const oMesAtualEhOMesmoDoMesDeAniversario = hoje.getMonth() === dataNascimento.getMonth();
    
    const oDiaAtualEhMenorQueODiaDoAniversario = hoje.getDate() < dataNascimento.getDate();
    
    
    const diminuoUmAnoDaIdade = oMesAtualEhMenorQueOMesDeAniversario || 
    (oMesAtualEhOMesmoDoMesDeAniversario
        && oDiaAtualEhMenorQueODiaDoAniversario);
        
    const idade = hoje.getFullYear() - dataNascimento.getFullYear() - (diminuoUmAnoDaIdade ? 1 : 0);
        
    // Ternário
    // Operadores Lógicos
    // const verifica = diminuoUmAnoDaIdade ? 1 : 0

    // if (diminuoUmAnoDaIdade) {
    //     return 1
    // } else {
    //     return 0
    // }

    return idade >= 18;
}


function verificaCampo(campo) {
    let mensagem = "";

    if (campo.name === "cpf" && campo.value.length >= 11) {
        const campoDoCpfEhValido = validaCpf(campo);

        console.debug(campoDoCpfEhValido);
    }

    if (campo.name === "aniversario" && campo.value) {
        const campoDaDataEhValida = validaMaiorIdade(campo);

        console.debug(campoDaDataEhValida);
    }

    console.debug(campo.validity);

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];

            // mensagens.aniversario.valueMissing
            // mensagens['aniversario']['valueMissing']
        }
    });

    const mensagemErro = campo.parentNode.querySelector('span');

    mensagemErro.textContent = campo.checkValidity() ? "" : mensagem;
}

camposDoFormulario.forEach((campo) => { 
    campo.addEventListener('blur', () => {
        verificaCampo(campo);
    })

    campo.addEventListener('invalid', event => event.preventDefault())
})


// Conversao de array
// const arrayDosCampos = Array.from(camposDoFormulario);

// console.debug(arrayDosCampos);

// const meyArray = ['1', '2', '3']

// console.debug(meyArray)

// const meuNovoArray1 = meyArray.forEach((item, indice) => {
//     return 'hello' + ' ' + indice;
// })

// const meuNovoArray2 = meyArray.map((item, indice) => {
//     return 'hello' + ' ' + indice;
// })

// console.debug(meuNovoArray1)
// console.debug(meuNovoArray2)