
const paragrafo = document.getElementById('nome-do-cadastro');

const mensagemSucesso = "agradecemos pelo seu envio. Em breve, entraremos em contato com mais informações. Caso tenha dúvidas, não hesite em nos procurar.";

function exibirNome() {
    const formularioCadastradoString = localStorage.getItem('cadastro');

    const formularioCadastrado = JSON.parse(formularioCadastradoString);

    return `${formularioCadastrado.nome}, ${mensagemSucesso}`;
}

paragrafo.textContent = exibirNome();