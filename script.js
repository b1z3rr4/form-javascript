import { tiposDeErro, mensagens } from './constants.js'

const camposDoFormulario = document.querySelectorAll('[required]');

const formulario = document.querySelector('[data-formulario]');

/**
 * Valida o CPF.
 * @param {HTMLInputElement} campo - O campo de entrada do CPF.
 * @returns {boolean} - Retorna true se o CPF for válido, caso contrário, false.
 */
function cpfEstaValido(campo) {
    const cpf = campo.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    // [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    const numerosRepetidos = Array.from({ length: 10 }, (_, i) => String(i).repeat(11));
    return !numerosRepetidos.includes(cpf);
}

/**
 * Valida se a idade é maior de 18 anos.
 * @param {HTMLInputElement} campo - O campo de entrada da data de nascimento.
 * @returns {boolean} - Retorna true se a idade for maior ou igual a 18 anos, caso contrário, false.
 */
function maiorIdadeEstaValida(campo) {
    const dataNascimento = new Date(campo.value);
    const hoje = new Date();
    const oMesAtualEhMenorQueOMesDeAniversario = hoje.getMonth() < dataNascimento.getMonth();
    const oMesAtualEhOMesmoDoMesDeAniversario = hoje.getMonth() === dataNascimento.getMonth();
    const oDiaAtualEhMenorQueODiaDoAniversario = hoje.getDate() < dataNascimento.getDate();
    const diminuoUmAnoDaIdade = oMesAtualEhMenorQueOMesDeAniversario || 
    (oMesAtualEhOMesmoDoMesDeAniversario
        && oDiaAtualEhMenorQueODiaDoAniversario);
    const idade = hoje.getFullYear() - dataNascimento.getFullYear() - (diminuoUmAnoDaIdade ? 1 : 0);

    return idade >= 18;
}

/* Valida uma senha de acordo com os seguintes critérios:
 * - Contém pelo menos um número.
 * - Contém pelo menos uma letra maiúscula.
 * - Contém pelo menos uma letra minúscula.
 * - Contém pelo menos um caractere especial (@$!%*?&).
 * - Possui entre 8 e 20 caracteres de comprimento.
 *
 * @param {string} senha - A senha a ser validada.
 * @returns {boolean} `true` se a senha atender a todos os critérios; `false` caso contrário.
 *
 * @example
 * // Exemplo de uso:
 * validarSenha('Exemplo@123'); // Retorna true
 * validarSenha('senha123');    // Retorna false (falta de maiúsculas e caracteres especiais)
 */
function senhaEstaValida(campo) {
    const senha = campo.value;

    const criterios = [
        /[0-9]/,
        /[A-Z]/,
        /[a-z]/,
        /[@$!%*?&]/,
        /^.{8,20}$/,
    ]

    // criterios.some()
    return criterios.every((criterio) => criterio.test(senha));   
}

/**
 * Verifica e valida um campo de formulário.
 * @param {HTMLInputElement} campo - O campo de entrada a ser validado.
 */
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    const mensagemErro = campo.parentNode.querySelector('span');

    if (campo.name === "cpf" && campo.value.length >= 11) {
        const campoDoCpfEhValido = cpfEstaValido(campo);

        if (!campoDoCpfEhValido) {
            campo.setCustomValidity('Esse CPF não é válido!');
        }
    }

    if (campo.name === "aniversario" && campo.value) {
        const campoDaDataEhValida = maiorIdadeEstaValida(campo);

        if (!campoDaDataEhValida) {
            campo.setCustomValidity('Essa data não é válida!');
        }
    }

    if (campo.name === "senha" && campo.value) {
        const campoDaSenhaEhValida = senhaEstaValida(campo);

        if (!campoDaSenhaEhValida) {
            campo.setCustomValidity('A senha é não é válida!');
        }
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });

    mensagemErro.textContent = campo.checkValidity() ? "" : mensagem;

    if (!campo.checkValidity()) {
        setTimeout(() => {
            removeErro(campo);
        }, 5 * 1000)
    }
}

/**
 * Remove a mensagem de erro e o feedback visual de um campo.
 *
 * @param {HTMLInputElement} campo - O campo de entrada a ser limpo.
 */
function removeErro(campo) {
    const classeErro = 'border-red-600';

    const span = campo.parentNode.querySelector('span');

    span.textContent = '';

    campo.classList.remove(classeErro);
}

/**
 * Atualiza o feedback visual do campo com base na sua validade.
 *
 * @param {HTMLInputElement} campo - O campo de entrada a ser atualizado.
 */
function atualizaFeedbackVisual(campo) {
    const classeErro = 'border-red-600';
    const classeValido = 'border-green-600';

    if (campo.checkValidity()) {
        campo.classList.add(classeValido);
        campo.classList.remove(classeErro);
    } else {
        campo.classList.add(classeErro);
        campo.classList.remove(classeValido);
    }
}

camposDoFormulario.forEach((campo) => { 
    campo.addEventListener('blur', () => {
        verificaCampo(campo);
        atualizaFeedbackVisual(campo);
    })

    campo.addEventListener('invalid', event => event.preventDefault())
})

function enviarDados(event) {
    event.preventDefault();

    const listaDeDados = {
        nome: event.target.elements['nome'].value,
        email: event.target.elements['email'].value,
        rg: event.target.elements['rg'].value,
        cpf: event.target.elements['cpf'].value,
        aniversario: event.target.elements['aniversario'].value,
    }

    const dadosEmString = JSON.stringify(listaDeDados);

    localStorage.setItem('cadastro', dadosEmString);

    window.location.href = "./form_semd.html";
}

formulario.addEventListener('submit', enviarDados);
