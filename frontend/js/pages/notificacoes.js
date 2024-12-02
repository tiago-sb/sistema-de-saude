document.addEventListener("DOMContentLoaded", () => {
  const botao_todas_notificacoes = document.getElementById("btn-tudo")
  const botao_mensagens_recentes = document.getElementById("btn-nao-lidas")
  const conteudo_notificacoes = document.getElementById("conteudo-notificacoes")
  
  function exibirConteudo(tipo) {
    if (tipo === "tudo") {
      conteudo_notificacoes.innerHTML = `
        <h3>Todas as Notificações</h3>
        <p>Todas as notificações do sistema.</p>
      `
    } else if (tipo === "nao-lidas") {
      conteudo_notificacoes.innerHTML = `
        <h3>Notificações Não Lidas</h3>
        <p>Suas notificações que ainda não foram lidas.</p>
      `
    }
  }

  botao_todas_notificacoes.addEventListener("click", () => {
    exibirConteudo("tudo")
    botao_todas_notificacoes.classList.add("ativo")
    botao_mensagens_recentes.classList.remove("ativo")
  })

  botao_mensagens_recentes.addEventListener("click", () => {
    exibirConteudo("nao-lidas")
    botao_mensagens_recentes.classList.add("ativo")
    botao_todas_notificacoes.classList.remove("ativo")
  })

  exibirConteudo("tudo")
})