document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item")
  const currentPage = document.body.getAttribute("data-page")

  menuItems.forEach((item) => {
    const page = item.getAttribute("data-page")
    if (page === currentPage) {
      item.classList.add("active")
    }
  })
})

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
    <h3>Nome do usuario</h3>
    <p>${usuario.nome}</p>
    <h3>Data de Nascimento</h3>
    <p>${usuario.dataNascimento}</p>
    <h3>Localização</h3>
    <p>${usuario.localizacao}</p>
    <h3>Tipo Sanguíneo</h3>
    <p>${usuario.tipoSanguineo}</p>
  `
})

document.addEventListener("DOMContentLoaded", () => {
  const menuTrigger = document.getElementById("configuracoes");
  const submenu = document.getElementById("submenu");
  const imagemMenu = document.querySelector("#configuracoes > div > img")
  const textoMenu = document.querySelector("#configuracoes > div > p")

  menuTrigger.addEventListener("click", (e) => {
    e.preventDefault()
    const visivel = submenu.style.display === "block"
    submenu.style.display = visivel ? "none" : "block" // se ta visivel coloca invisivel
  })

  document.addEventListener("click", (e) => {
    if (!menuTrigger.contains(e.target) && !submenu.contains(e.target)) {
      submenu.style.display = "none" // uma vez mostrado o menu, caso o usuario clique em algum item ele some novamente
    }
  })

  document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "index.html"
  })

  document.getElementById("update").addEventListener("click", () => {
    // window.location.href = "personalizar.html"
    alert("clicou em personalizar")
  })
});

