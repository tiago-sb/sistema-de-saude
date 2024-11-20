document.addEventListener("DOMContentLoaded", () => {
  const btnTudo = document.getElementById("btn-tudo")
  const btnNaoLidas = document.getElementById("btn-nao-lidas")
  const conteudoNotificacoes = document.getElementById("conteudo-notificacoes")
  
  function exibirConteudo(tipo) {
    if (tipo === "tudo") {
      conteudoNotificacoes.innerHTML = `
        <h3>Todas as Notificações</h3>
        <p>Todas as notificações do sistema.</p>
      `
    } else if (tipo === "nao-lidas") {
      conteudoNotificacoes.innerHTML = `
        <h3>Notificações Não Lidas</h3>
        <p>Suas notificações que ainda não foram lidas.</p>
      `
    }
  }

  btnTudo.addEventListener("click", () => {
    exibirConteudo("tudo")
    btnTudo.classList.add("ativo")
    btnNaoLidas.classList.remove("ativo")
  });

  btnNaoLidas.addEventListener("click", () => {
    exibirConteudo("nao-lidas")
    btnNaoLidas.classList.add("ativo")
    btnTudo.classList.remove("ativo")
  });

  exibirConteudo("tudo");
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = {
    nome: "Nome do usuario",
    dataNascimento: "00/00/0000",
    localizacao: "Xxxxxxx, Xxxxxxx, Xxxxx",
    tipoSanguineo: "X+",
    foto: ""
  }

  const container = document.getElementById("informacoes-paciente");
  const foto_padrao = "../images/user.png"
  
  container.innerHTML = `
    <img src="${usuario.foto || foto_padrao}" alt="Imagem de perfil">
    <h3>${usuario.nome}</h3>
    <p>${usuario.localizacao}</p>
    <p>Data de Nascimento: ${usuario.dataNascimento}</p>
  `
})
