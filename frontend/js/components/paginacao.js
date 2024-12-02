document.addEventListener("DOMContentLoaded", () => {
  const navegacao = document.querySelectorAll(".menu-item")
  const logo_projeto = document.querySelector(".busca-elementos img")

  const usuario = JSON.parse(localStorage.getItem("usuario"))

  if (!usuario || !usuario.tipo_usuario) {
    console.error("Erro: Tipo de usuário não encontrado.")
    return
  }

  const tipo_usuario = usuario.tipo_usuario
  
  logo_projeto.addEventListener("click", () => {
    const paginaInicial = tipo_usuario === "PostoDeSaude" ? "../dashboard/tela_inicio_posto.html" : "../dashboard/tela_inicio_paciente.html"
    window.location.href = paginaInicial
  })

  navegacao.forEach((item) => {
    const pagina = item.dataset.page

    item.addEventListener("click", () => {
      if (pagina == "home") {
        window.location.href = tipo_usuario === "PostoDeSaude" ? "../dashboard/tela_inicio_posto.html" : "../dashboard/tela_inicio_paciente.html"
      }
      if(pagina == "notificacoes") {
        window.location.href = "../pages/notificacoes.html"
      }
      if(pagina == "perfil") {
        window.location.href = caminho = "../pages/perfil.html"
      }
      if(pagina == "configuracoes") {
        window.location.href = caminho = "../pages/configuracoes.html"
      }
    })
  })
})